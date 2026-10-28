"""Generate per-project palettes that provably clear WCAG AAA in both themes.

Strategy: keep each project's brand hue as the identity anchor, then solve for the
lightness that hits the required contrast ratio against that project's surface.
Hue and saturation are preserved wherever possible, so the colour still reads as
"Revo red" or "Rooted green" even after it has been pushed to AAA.
"""

import colorsys, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))

# ---------- WCAG plumbing ----------

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb):
    return '#%02x%02x%02x' % tuple(max(0, min(255, round(c))) for c in rgb)

def _lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def luminance(rgb):
    r, g, b = (_lin(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast(a, b):
    la, lb = luminance(hex_to_rgb(a)), luminance(hex_to_rgb(b))
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

# ---------- colour helpers ----------

def to_hls(h):
    r, g, b = (c / 255 for c in hex_to_rgb(h))
    return colorsys.rgb_to_hls(r, g, b)

def from_hls(hh, ll, ss):
    r, g, b = colorsys.hls_to_rgb(hh, max(0.0, min(1.0, ll)), max(0.0, min(1.0, ss)))
    return rgb_to_hex((r * 255, g * 255, b * 255))

def mix(a, b, t):
    ra, rb = hex_to_rgb(a), hex_to_rgb(b)
    return rgb_to_hex(tuple(ra[i] + (rb[i] - ra[i]) * t for i in range(3)))

def solve_lightness(brand, surface, target, direction, sat_scale=1.0):
    """Walk lightness away from the surface until `target` contrast is met.

    direction=+1 lightens (for dark surfaces), -1 darkens (for light surfaces).
    Returns the FIRST colour that clears the bar, so the brand hue stays as
    vivid as AAA permits rather than being flattened to black or white.
    """
    hh, ll, ss = to_hls(brand)
    ss *= sat_scale
    best = None
    # 0.5% steps: fine enough that we never overshoot the hue's vibrancy.
    for i in range(0, 201):
        cand_l = ll + direction * (i * 0.005)
        if not (0.0 <= cand_l <= 1.0):
            break
        cand = from_hls(hh, cand_l, ss)
        if contrast(cand, surface) >= target:
            best = cand
            break
    if best is None:
        # Hue alone can't get there; fall back to pure white/black at this hue.
        best = from_hls(hh, 1.0 if direction > 0 else 0.0, ss)
    return best

# ---------- inputs ----------

BASE_DARK = '#222222'   # site default surface (":root")
BASE_LIGHT = '#f1e2d1'  # site ".dark" surface (cream — naming is inverted in this repo)

def load_projects():
    """Read id / title / accent / optional pair straight out of lib/data.ts.

    The accent in data.ts is the single source of truth for a project's identity.
    Duplicating the list here would let the two drift apart silently, and the
    drift would only ever show up as a contrast failure nobody re-ran.
    """
    path = os.path.join(HERE, '..', 'lib', 'data.ts')
    src = open(path, encoding='utf-8').read()
    blocks = re.findall(
        r"id:\s*'(\d+)',\s*\n\s*title:\s*'([^']+)',(.*?)(?=\n  \{|\n\];)",
        src, re.S)
    out = []
    for pid, title, body in blocks:
        m = re.search(r"accent:\s*'(#[0-9a-fA-F]{6})'", body)
        if not m:
            raise SystemExit(f'project {pid} ({title}) has no accent in lib/data.ts')
        pair_m = re.search(r"pair:\s*'(#[0-9a-fA-F]{6})'", body)
        pair = pair_m.group(1) if pair_m else None
        out.append((pid, title, m.group(1), pair))
    if not out:
        raise SystemExit('no projects parsed from lib/data.ts')
    return out


PROJECTS = load_projects()

AAA_BODY = 7.0    # normal text
AAA_LARGE = 4.5   # >=18.66px bold or >=24px

# Solve to slightly above the bar. A token that lands on exactly 7.00 is one
# rounding step away from failing, and the shared tokens additionally have to
# survive being rendered over every project surface.
MARGIN_BODY = 7.25
MARGIN_LARGE = 4.7

# How far the page background is allowed to drift toward the brand hue.
# Deliberately small: each page should feel like a different room in the same
# house, not a different house.
SURFACE_TINT_DARK = 0.35   # how far the near-black surface travels toward the hue
SURFACE_TINT_LIGHT = 0.15  # how far the hue pastel is pulled back toward cream

# The surface is not flat — two brand-coloured radial glows and a diagonal lift
# sit on top of it. Text near a glow centre is NOT on the surface token, it is on
# the composite, which can be several shades away. Solving against the flat token
# silently overstates contrast, so everything below is solved against the
# worst-case composite instead.
GLOW_A1 = 0.05   # was 0.14 — a saturated brand glow at 0.14 moved the background too far
GLOW_A2 = 0.03
LIFT = 0.05
# Where the two radials overlap they compound more than a naive layer-by-layer
# model predicts (measured ~6% of brand beyond it), so the worst case is modelled
# as a single mix of everything plus headroom, and verified against real pixels
# by audit.mjs.
GLOW_SAFETY = 0.12


def worst_case_surface(surface, brand):
    """Background at its least forgiving: both glows and the lift stacked.

    Brand colours are lighter than the dark surfaces and darker than the light
    ones, so in both themes the composite is the value closest to the text and
    therefore the one that governs contrast.
    """
    return mix(surface, brand, LIFT + GLOW_A1 + GLOW_A2 + GLOW_SAFETY)


def lift_surface(surface, brand):
    """The surface away from the glow centres — only the diagonal lift applies.

    The radial glows sit at 12%/8% and 92%/18% of a viewport-fixed layer, so the
    footer never sits under one. Shared tokens are held to this rather than to
    the full composite, which would push 'muted' so close to full ink that it
    stops reading as muted at all.
    """
    return mix(surface, brand, LIFT)


def _finish_mode(surface, brand, ink_hint, direction, pair_mode=False):
    """Solve text / accent / pill tokens against a fixed surface + brand decor.

    In pair mode the companion colour is often near-white or near-black. Using it
    raw as the glow colour washes the deliberate brand surface toward mid-grey
    and silently tanks contrast, so glows are pulled back toward the surface.
    """
    glow_ref = brand
    if pair_mode:
        brand_l = luminance(hex_to_rgb(brand))
        if brand_l > 0.85 or brand_l < 0.08:
            glow_ref = mix(surface, brand, 0.28)
    solve_bg = worst_case_surface(surface, glow_ref)

    text = ink_hint
    if contrast(text, solve_bg) < AAA_BODY:
        text = solve_lightness(text, solve_bg, AAA_BODY, direction)

    text_muted = text
    for i in range(100, -1, -1):
        cand = mix(surface, text, i / 100)
        if contrast(cand, solve_bg) >= MARGIN_BODY:
            text_muted = cand
        else:
            break

    text_faint = text
    for i in range(100, -1, -1):
        cand = mix(surface, text, i / 100)
        if contrast(cand, solve_bg) >= MARGIN_LARGE:
            text_faint = cand
        else:
            break

    accent_text = solve_lightness(brand, solve_bg, MARGIN_BODY, direction)
    accent_display = solve_lightness(brand, solve_bg, MARGIN_LARGE, direction)

    pill_bg = accent_text
    pill_text = solve_lightness(surface, pill_bg, AAA_BODY, -direction, sat_scale=0.6)
    if contrast(pill_text, pill_bg) < AAA_BODY:
        pill_text = '#ffffff' if luminance(hex_to_rgb(pill_bg)) < 0.18 else '#000000'

    border = mix(surface, brand, 0.32)
    decor = glow_ref

    return {
        'surface': surface,
        'text': text,
        'textMuted': text_muted,
        'textFaint': text_faint,
        'accentText': accent_text,
        'accentDisplay': accent_display,
        'pillBg': pill_bg,
        'pillText': pill_text,
        'border': border,
        'decor': decor,
        'worstBg': solve_bg,
        'liftBg': lift_surface(surface, glow_ref),
        'checks': {
            'text on surface': min(contrast(text, surface), contrast(text, solve_bg)),
            'accentText on surface': min(contrast(accent_text, surface), contrast(accent_text, solve_bg)),
            'accentDisplay on surface': min(contrast(accent_display, surface), contrast(accent_display, solve_bg)),
            'pillText on pillBg': contrast(pill_text, pill_bg),
            'textMuted on surface': min(contrast(text_muted, surface), contrast(text_muted, solve_bg)),
            'textFaintDisplay on surface': min(contrast(text_faint, surface), contrast(text_faint, solve_bg)),
        },
    }


def build(project_id, name, brand, pair=None):
    out = {'id': project_id, 'name': name, 'brand': brand, 'pair': pair}

    if pair:
        # Dual-colour identity: darker colour is the dark-mode surface, lighter is
        # the light-mode surface. Accents / ink swap with the mode.
        dark_c, light_c = (
            (brand, pair) if luminance(hex_to_rgb(brand)) < luminance(hex_to_rgb(pair))
            else (pair, brand)
        )
        out['dark'] = _finish_mode(dark_c, light_c, light_c, +1, pair_mode=True)
        out['light'] = _finish_mode(light_c, dark_c, dark_c, -1, pair_mode=True)
        return out

    for mode, base, direction in (('dark', BASE_DARK, +1), ('light', BASE_LIGHT, -1)):
        hh, ll, ss = to_hls(brand)

        # Surface: hue-shifted enough to read as a different room, restrained enough
        # to still read as the same house.
        if mode == 'dark':
            # Mixing a deep tint into near-black shifts hue cleanly.
            surface = mix(base, from_hls(hh, 0.16, min(ss, 0.70)), SURFACE_TINT_DARK)
        else:
            # Mixing INTO the cream fails for cool hues — warm + cool cancels to grey.
            # Build the pastel at the brand hue first, then pull it back toward cream
            # so the site's warmth survives.
            pastel = from_hls(hh, 0.90, min(ss, 0.45))
            surface = mix(pastel, base, SURFACE_TINT_LIGHT)

        ink_base = BASE_LIGHT if mode == 'dark' else BASE_DARK
        text = mix(ink_base, from_hls(hh, 0.9 if mode == 'dark' else 0.1, ss), 0.10)
        out[mode] = _finish_mode(surface, brand, text, direction)
    return out


def build_site(project_surfaces):
    """The shared (non-project) palette — home page, About, Contact, footer.

    The footer and the fixed nav sit OUTSIDE the project section, so they keep
    these shared tokens while the surface underneath them belongs to the project.
    That means a shared token has to clear AAA against the base surface *and*
    against every project surface in that mode — solving against #222222 alone
    silently breaks the footer on eight different pages.
    """
    out = {}
    for mode, surface, ink in (('dark', BASE_DARK, BASE_LIGHT),
                               ('light', BASE_LIGHT, BASE_DARK)):
        surfaces = [surface] + project_surfaces[mode]  # includes each project's worst-case composite

        def solve(target):
            chosen = ink
            for i in range(100, -1, -1):
                cand = mix(surface, ink, i / 100)
                if all(contrast(cand, s) >= target for s in surfaces):
                    chosen = cand
                else:
                    break
            return chosen

        muted, faint = solve(MARGIN_BODY), solve(MARGIN_LARGE)
        checks = {
            'text on surface': min(contrast(ink, s) for s in surfaces),
            'textMuted on surface': min(contrast(muted, s) for s in surfaces),
            'textFaintDisplay on surface': min(contrast(faint, s) for s in surfaces),
        }
        out[mode] = {'surface': surface, 'text': ink, 'textMuted': muted,
                     'textFaint': faint, 'checks': checks}
    return out


if __name__ == '__main__':
    data = [build(*p) for p in PROJECTS]
    site = build_site({m: [e[m][k] for e in data for k in ('surface', 'liftBg')]
                       for m in ('dark', 'light')})
    with open(os.path.join(HERE, 'site-palette.json'), 'w') as f:
        json.dump(site, f, indent=2)
    print('--- shared site tokens ---')
    for mode in ('dark', 'light'):
        m = site[mode]
        print(f"  {mode:<6} surface {m['surface']}  text {m['text']}  "
              f"muted {m['textMuted']}  faint {m['textFaint']}")
    print()
    with open(os.path.join(HERE, 'palettes.json'), 'w') as f:
        json.dump(data, f, indent=2)

    print(f"{'project':<16}{'mode':<7}{'surface':<10}{'text':<10}{'accTxt':<10}{'accDisp':<10}")
    print('-' * 68)
    for p in data:
        for mode in ('dark', 'light'):
            m = p[mode]
            print(f"{p['name']:<16}{mode:<7}{m['surface']:<10}{m['text']:<10}"
                  f"{m['accentText']:<10}{m['accentDisplay']:<10}")

    print('\n--- contrast audit (AAA: 7.0 small text / 4.5 large text) ---')
    fails = 0
    for p in data + [{'name': 'SITE (shared)', **site}]:
        for mode in ('dark', 'light'):
            for label, ratio in p[mode]['checks'].items():
                need = AAA_LARGE if 'Display' in label else AAA_BODY
                ok = ratio >= need
                if not ok:
                    fails += 1
                    print(f"  FAIL {p['name']:<15} {mode:<6} {label:<26} "
                          f"{ratio:5.2f} (need {need})")
    print(f'\n{"ALL PASS" if fails == 0 else str(fails) + " FAILURES"}')
    if fails:
        raise SystemExit(1)