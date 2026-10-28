"""Generates app/project-themes.css from the accents in lib/data.ts.

Run it with `npm run theme`. It re-runs palette.py first, so the CSS can never
lag the palette, and palette.py aborts if any pair misses its AAA target.
"""

import importlib.util
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))

spec = importlib.util.spec_from_file_location("p", os.path.join(HERE, "palette.py"))
p = importlib.util.module_from_spec(spec)
spec.loader.exec_module(p)

# Always re-solve before emitting, so the CSS cannot lag lib/data.ts.
subprocess.run([sys.executable, os.path.join(HERE, "palette.py")],
               check=True, stdout=subprocess.DEVNULL)

MARGIN = p.MARGIN_BODY
# The home page keeps the original neutral gradient; its worst-case composite is
# what the Work-index accents actually sit on.
SITE_BG = {
    'dark': p.mix(p.mix(p.BASE_DARK, '#d8c7b6', 0.13), '#a99a8a', 0.08),
    'light': p.mix(p.mix(p.BASE_LIGHT, '#4a433d', 0.11), '#7a7067', 0.08),
}
pal = json.load(open(os.path.join(HERE, 'palettes.json')))
site = json.load(open(os.path.join(HERE, 'site-palette.json')))

FONT_VAR = {
    '01': '--font-anton', '02': '--font-barlow', '03': '--font-outfit',
    '04': '--font-mincho', '05': '--font-fraunces', '06': '--font-baloo',
    '07': '--font-archivo', '08': '--font-jetbrains',
}
# Optical corrections. One font-size and one tracking value cannot serve eight
# faces: Anton's letters collide at the -0.08em the site uses, and Barlow
# Condensed at the same size reads a fifth smaller than everything else.
FONT_METRICS = {
    #      display tracking, heading tracking, display size scale
    '01': ('-0.005em', '0em',      1.00),  # Anton — very tight sidebearings already
    '02': ('-0.02em',  '-0.02em',  1.20),  # Barlow Condensed — narrow, needs size
    '03': ('-0.06em',  '-0.05em',  1.00),  # Outfit — geometric, takes tight tracking
    '04': ('-0.025em', '-0.02em',  1.02),  # Shippori Mincho — serif, needs air
    '05': ('-0.03em',  '-0.03em',  1.00),  # Fraunces
    '06': ('-0.025em', '-0.025em', 1.00),  # Baloo 2 — rounded terminals need air
    '07': ('-0.055em', '-0.05em',  1.00),  # Archivo
    '08': ('-0.04em',  '-0.04em',  1.00),  # JetBrains Mono
}

FONT_FALLBACK = {
    '01': 'Impact, sans-serif', '02': "'Arial Narrow', sans-serif",
    '03': 'system-ui, sans-serif', '04': 'Georgia, serif',
    '05': 'Georgia, serif', '06': 'system-ui, sans-serif',
    '07': 'system-ui, sans-serif', '08': 'ui-monospace, monospace',
}


def rgba(hexcolor, a):
    r, g, b = p.hex_to_rgb(hexcolor)
    return f'rgba({r}, {g}, {b}, {a})'


def gradient(m):
    surface, brand = m['surface'], m['decor']
    lift = p.mix(surface, brand, p.LIFT)
    # Alphas match GLOW_A1/GLOW_A2 in palette.py — the palette is solved against
    # the composite these produce, so changing one without the other breaks AAA.
    return (
        f"\n    radial-gradient(circle at 12% 8%, {rgba(brand, p.GLOW_A1)}, transparent 34%),"
        f"\n    radial-gradient(circle at 92% 18%, {rgba(brand, p.GLOW_A2)}, transparent 30%),"
        f"\n    linear-gradient(135deg, {surface} 0%, {lift} 48%, {surface} 100%)"
    )


def block(selector, e, mode, with_font):
    m = e[mode]
    lines = [f'{selector} {{']
    if with_font:
        fv, fb = FONT_VAR[e['id']], FONT_FALLBACK[e['id']]
        disp_tr, head_tr, scale = FONT_METRICS[e['id']]
        lines.append(f'  --project-font: var({fv}), {fb};')
        lines.append(f'  --project-display-tracking: {disp_tr};')
        lines.append(f'  --project-heading-tracking: {head_tr};')
        lines.append(f'  --project-display-scale: {scale};')
    lines += [
        f"  --site-primary: {m['surface']};",
        f"  --site-text-primary: {m['text']};",
        f"  --site-text-muted: {m['textMuted']};",
        f"  --site-text-faint: {m['textFaint']};",
        # accent-dark / accent-bright are existing token names used for TEXT in
        # several places, so both point at the 7:1-solved accent.
        f"  --site-accent-dark: {m['accentText']};",
        f"  --site-accent-bright: {m['accentText']};",
        f"  --site-accent-display: {m['accentDisplay']};",
        f"  --site-pill-bg: {m['pillBg']};",
        f"  --site-pill-text: {m['pillText']};",
        f"  --site-hover: {m['accentText']};",
        f"  --site-highlight: {m['border']};",
        f"  --site-decor: {m['decor']};",
        f"  --site-surface-gradient:{gradient(m)};",
        '}',
    ]
    return '\n'.join(lines)


out = ['/* ------------------------------------------------------------------\n'
       '   Per-project identity\n'
       '\n'
       '   Every project page carries data-project="NN", which re-points the same\n'
       '   site tokens the rest of the app already consumes. No component needs to\n'
       '   know a colour — it keeps using text-text-primary / bg-primary and simply\n'
       '   inherits the project it is inside.\n'
       '\n'
       '   Every value below is generated and contrast-audited: small text clears\n'
       '   7:1 and large display text clears 4.5:1 against its own surface, in both\n'
       '   themes. Regenerate with scripts/palette.py rather than hand-editing.\n'
       '\n'
       '   Note: in this codebase `.dark` is the CREAM/light theme (see Navbar).\n'
       '   ------------------------------------------------------------------ */\n']

for e in pal:
    out.append(f"/* {e['id']} — {e['name']} · {e['brand']} */")
    out.append(block(f"[data-project='{e['id']}']", e, 'dark', True))
    out.append(block(f".dark [data-project='{e['id']}']", e, 'light', False))
    out.append('')

# The Work index on the home page shows every project's accent against the
# SITE surface, not that project's own surface, so those need their own solve.
out.append('/* ------------------------------------------------------------------\n'
           '   Project accents rendered on the SITE surface (the Work index).\n'
           '   Solved against #222222 / #f1e2d1 rather than the project surface.\n'
           '   ------------------------------------------------------------------ */\n')
for e in pal:
    for mode, base, direction, sel in (
        ('dark', p.BASE_DARK, +1, f"[data-project-accent='{e['id']}']"),
        ('light', p.BASE_LIGHT, -1, f".dark [data-project-accent='{e['id']}']"),
    ):
        acc = p.solve_lightness(e['brand'], SITE_BG[mode], MARGIN, direction)
        out.append(f"{sel} {{\n"
                   f"  --site-accent-bright: {acc};\n"
                   f"  --site-highlight: {p.mix(base, e['brand'], 0.30)};\n"
                   f"}}")
out.append('')

OUT = os.path.join(HERE, '..', 'app', 'project-themes.css')
open(OUT, 'w').write('\n'.join(out))

print('--- shared token additions ---')
for mode, sel in (('dark', ':root'), ('light', '.dark')):
    s = site[mode]
    print(f"{sel}  --site-text-muted: {s['textMuted']};  --site-text-faint: {s['textFaint']};")
print()
print('wrote app/project-themes.css')
