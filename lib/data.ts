export type Stage = 'Problem' | 'Constraint' | 'Decision' | 'Outcome';

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  /** One interview-defensible number, shown under the title. */
  outcome: string;
  externalUrl?: string;
  workImage?: string;
  credit?: string;
  /** Thin entries render only the stages they have. */
  stages: Partial<
    Record<
      Stage,
      {
        content: string;
        image?: string;
        images?: string[];
        video?: string;
        imageFit?: 'contain';
      }
    >
  >;
}

export const STAGES: Stage[] = [
  'Problem',
  'Constraint',
  'Decision',
  'Outcome',
];

export const PROJECTS: ProjectData[] = [
  {
    id: '01',
    slug: 'idriver',
    title: 'iDriver',
    blurb:
      'Newspaper delivery, rebuilt so drivers start a run in two steps — with the map, the list, and proof-of-delivery on the right stop.',
    outcome: 'Login-to-route is 2 steps instead of 4.',
    workImage: '/pj_02/pj_01_test_02.png',
    stages: {
      Problem: {
        content: `Newspaper drivers were losing time to an app that felt older than the vans. Suburb lists were buried, a compliance check gated every login, and proof-of-delivery photos were not clearly tied to the address they belonged to. On a run, that uncertainty is not a UX nit — it is a delayed street and a photo that might not stand up if a customer complains.`,
        image: '/pj_02/pj_02_test_01.png',
      },
      Constraint: {
        content: `Drivers change how they navigate as a run gets familiar: map when the suburb is new, list when they already know the streets. The app had to support both without adding a mode to learn. Delivery happens from the driver's seat, so every extra tap is time the paper is still in the van.`,
        image: '/pj_02/pj_02_empathize.png',
      },
      Decision: {
        content: `I rebuilt the flow around the run, not the menu. The per-login compliance gate came out. Map and list sit together, with package counts and delivered status on every stop, so a photo is taken against the address it belongs to. Drivers who already know the area can stay in the list; drivers who don't can stay on the map.`,
      },
      Outcome: {
        content: `Drivers who walked the prototype understood the flow from the first screen. They no longer repeat a compliance check to start work, and they can see yesterday's performance before they leave the depot. Login-to-route is 2 steps instead of 4.`,
        image: '/pj_02/pj_02_test_01.png',
        images: ['/pj_02/pj_02_test_01.png', '/pj_02/pj_01_test_02.png'],
      },
    },
  },
  {
    id: '02',
    slug: 'port-jeffrey',
    title: 'Port Jeffrey',
    blurb:
      'A Three.js island where every project is labelled in the scene — visitors know what they are looking at without opening a menu.',
    outcome: '4 labelled landmarks. One look, no extra click.',
    externalUrl: 'https://portjeffrey.vercel.app/',
    workImage: '/pj_03/pj_03_profile.png',
    stages: {
      Problem: {
        content: `A grid of IT projects gets scanned and skipped. Recruiters decide in seconds whether a portfolio is worth opening, and a list that looks like every other student site does not get that second.`,
        image: '/pj_03/pj_03_profile.png',
        video: '/pj_03/rec_jefri.mp4',
      },
      Constraint: {
        content: `The island had to stay readable as a portfolio, not a game. If a visitor could not tell what an object was, the 3D idea would hide the work it was meant to show.`,
      },
      Decision: {
        content: `I built the portfolio in Three.js and put the project name on every object. The camera, spacing, and labels do the explaining. Exploration is optional; identification is not.`,
      },
      Outcome: {
        content: `People who tried it remembered the island. They also needed the labels — without names, the objects were decoration. With names, a visitor can point at a landmark and know which project it is. 4 labelled landmarks. One look, no extra click.`,
      },
    },
  },
  {
    id: '03',
    slug: 'peter-parking',
    title: 'Peter Parking',
    blurb:
      'One app that pays every street-parking operator, so drivers stop installing a new parking app for every street.',
    outcome: 'Setup once. Paying is 3 taps — not a fifth app.',
    workImage: '/pj_07/card.png',
    stages: {
      Problem: {
        content: `Paying for street parking in Melbourne means installing whichever app that street's operator uses. CarePark, EasyPark, PayStay, Secure Parking, Wilson — each wants its own account, card, and interface. Drivers keep four or five of them, re-enter the same plate and card, and still get fined for paying the wrong zone.`,
        image: '/pj_07/pj_07_1.png',
      },
      Constraint: {
        content: `The driver should never have to know which operator owns the street. Any screen that makes them think about the operator fails the brief. Setup cannot ask for more than a plate and a card.`,
        image: '/pj_07/pj_07_3.png',
      },
      Decision: {
        content: `Peter sits on top of every operator. GPS suggests nearby zones; the driver confirms against the number printed on the pole. The saved card carries through, so starting a session is confirm zone, confirm card, pick duration. The live timer takes that operator's colour — Wilson red, EasyPark purple, PayStay green — so they can see who is being paid without opening another app.`,
        image: '/pj_07/pj_07_2.png',
      },
      Outcome: {
        content: `Friends who drive daily could set up in a minute and felt safer matching the pole than picking from GPS alone. The operator-coloured session screen was the detail they trusted. Setup is once (plate + card). Paying is 3 taps — not a fifth app.`,
        image: '/pj_07/pj_07_4.png',
      },
    },
  },
  {
    id: '04',
    slug: 'sigma',
    title: 'Sigma',
    blurb:
      'Most finance apps tell you what you spent. Sigma tells you what you can spend — before you spend it.',
    outcome: 'Every payment is 1 tap to approve or reject.',
    workImage: '/pj_08/pj_08_4.jpg',
    credit: 'Mockup by Mockuuups Studio',
    stages: {
      Problem: {
        content: `Finance apps report what you already spent. By then the money is gone. Budgets think in months; people spend in days, at a terminal, with a lock screen in the way.`,
        image: '/pj_08/pj_08_3.jpg',
      },
      Constraint: {
        content: `The intervention has to happen at the moment of payment, on the phone, in one decision. Anything longer and it gets dismissed. Sigma cannot ask people to open another finance app while the tap-and-go is waiting.`,
        image: '/pj_08/pj_08_1.png',
        images: ['/pj_08/pj_08_1.png', '/pj_08/pj_08_2.png'],
        imageFit: 'contain',
      },
      Decision: {
        content: `Every phone payment pauses for one tap. Sigma pre-fills merchant, amount, and category, then prices the purchase in hours worked and goals delayed. Yes or no — the decision lands while the money can still stay put.`,
        image: '/pj_08/pj_08_4.jpg',
      },
      Outcome: {
        content: `The spend decision moves from a monthly review to the lock screen. Goals stay live against actual behaviour, not a number set in January. Every payment is 1 tap to approve or reject.`,
        image: '/pj_08/pj_08_6.jpg',
      },
    },
  },

  {
    id: '05',
    slug: 'revo-fitness',
    title: 'Revo Fitness',
    blurb:
      'Restructured the member app so plan perks and public info are no longer on the same screen.',
    outcome: 'Perks and public info split into separate screens.',
    workImage: '/pj_01/pj_01_test_01.png',
    stages: {
      Problem: {
        content: `Revo is the gym I actually train at, and the app never matched the energy of the brand. It leaned on a single-page approach, so membership perks and general information — news, shop, updates — sat together with nothing to separate them. I spoke with five members and they raised the same two things: the visual style felt inconsistent, and it was not obvious what their plan actually included.`,
        image: '/pj_01/pj_01_overview.png',
      },
      Constraint: {
        content: `The problem was structural, not only visual. Anything I changed had to keep the Revo look and energy intact while making access levels legible: what belongs to a member, and what is open to everyone. Adding pages could not mean adding scrolling — the app had to feel more complete without feeling more crowded.`,
        image: '/pj_01/pj_01_define.png',
      },
      Decision: {
        content: `I used Affinity to group features by access level, then built the pages out in Figma from the loading screen through to the profile. Home carries what anyone can reach and treats it as information rather than an exclusive perk. Workout and Member sections hold the plan-specific benefits. Button sizing and spacing were tuned so each screen stays scannable at a glance.`,
        image: '/pj_01/pj_01_prototype.png',
      },
      Outcome: {
        content: `I took the screens back to the same members between sets. They read the split between information and perks correctly, and said the structure was a stronger starting point than the current app while still looking like Revo. The feedback pointed at depth as the next step — more features per section rather than more sections.`,
        image: '/pj_01/pj_01_test_01.png',
        images: ['/pj_01/pj_01_test_01.png', '/pj_01/pj_01_test_02.png'],
      },
    },
  },
  {
    id: '06',
    slug: 'rooted',
    title: 'Rooted',
    blurb:
      'A habit app that splits what you grow from what you uproot, with a plant metaphor instead of a streak counter.',
    outcome: '5 testers, 4 positive — 2 asked for a widget.',
    workImage: '/pj_05/pj_05_1.png',
    stages: {
      Problem: {
        content: `Most habit apps I looked at feel overwhelming and stay too general about what a habit actually is. Discipline matters, but so does clarity — without a clear sense of what they are working on, people stop being consistent. A streak counter tells you how long you have kept going; it does not tell you what you are building or why.`,
        image: '/pj_05/pj_05_1.png',
        images: [
          '/pj_05/pj_05_1.png',
          '/pj_05/pj_05_2.png',
          '/pj_05/pj_05_3.png',
          '/pj_05/pj_05_4.png',
          '/pj_05/pj_05_5.png',
        ],
      },
      Constraint: {
        content: `Habits are not one shape. Some are meant to last; some only need to run for a set period. The app had to let a short-term habit finish and leave cleanly, so users get a mental reset instead of an entry they feel obliged to keep forever.`,
      },
      Decision: {
        content: `I framed the whole system as a garden. "Grow" and "Uproot" do the job of "build" and "break", but the gardening language gives each action an image to hold onto — planting and nurturing a seed, or pulling a weed that has already taken hold. Habits split by intended lifespan, so finishing is a state the app understands. I rebuilt the Figma file around a clearer naming system and structure so each path stayed easy to review.`,
        image: '/pj_05/pj_05_6.png',
      },
      Outcome: {
        content: `I tested the concept with five college friends. Four responded positively to the grow/uproot framing. Two asked for a widget or notifications to make checking the habit list quicker — the metaphor landed, but the daily loop still needed a shortcut outside the app.`,
      },
    },
  },
  {
    id: '07',
    slug: 'katsu-seiba',
    title: 'Katsu Seiba',
    blurb: 'A restaurant site built around booking, not atmosphere for its own sake.',
    outcome: 'Booking stays one action away from every section.',
    externalUrl: 'https://katsuseiba.vercel.app',
    workImage: '/pj_04/pj_04_home_01.png',
    stages: {
      Problem: {
        content: `People land on a restaurant site to work out the food, the atmosphere, the location, and how to book — usually in that order, usually fast. The sites I looked at picked one side: attractive but hiding the practical information, or informative with no mood at all. Colour choices between type and background quietly decide whether a place reads premium, calm, or just hard to read.`,
        image: '/pj_04/pj_04_home_01.png',
        video: '/pj_04/rec_katsu.mp4',
      },
      Constraint: {
        content: `Minimal could not mean empty. The site had to carry a Japanese-inspired identity and stay legible, which made contrast between font colour and background a hard requirement rather than a styling preference. Every section still had to leave the next action obvious.`,
        image: '/pj_04/pj_04_home_02.png',
      },
      Decision: {
        content: `I used fewer elements with more intention — spacing, imagery, and simple navigation doing the work instead of decoration. Booking is never more than one action away, so the path from first impression to reservation has no detour. Type, background, and image placement were tuned together so no section creates visual noise.`,
        image: '/pj_04/pj_04_home_03.png',
      },
      Outcome: {
        content: `Feedback focused on hierarchy, spacing, and text-on-background contrast, and the design got cleaner in response without losing the practical information. The result reads as a calm introduction to the restaurant that still tells you where to go next.`,
      },
    },
  },
  {
    id: '08',
    slug: 'fruitea',
    title: 'Fruitea',
    blurb:
      'A produce reference that answers what something does to you and what to make with it, in one read.',
    outcome: 'One page per item: benefits, risks, and what to cook.',
    externalUrl: 'https://fruitea.vercel.app',
    workImage: '/pj_06/pj_06_1.png',
    stages: {
      Problem: {
        content: `Looking up whether a fruit or vegetable is good for you turns into a tab-sorting exercise — nutrition on one site, warnings on another, recipes somewhere else. There is no single place that answers "what does this do to me, and what do I make with it" in one read.`,
        image: '/pj_06/pj_06_1.png',
        video: '/pj_06/rec_fruitea.mp4',
      },
      Decision: {
        content: `Fruitea is a streamlined reference: one page per item covering the benefits, the risks, and what you can cook with it. It is built to be scanned rather than read end to end, so it works as a lookup while you are already in the kitchen.`,
      },
    },
  },
];

/** The four that lead the Work section. */
export const FEATURED_PROJECTS = PROJECTS.slice(0, 4);
/** The four behind the "more" disclosure — same shape, own pages. */
export const SECONDARY_PROJECTS = PROJECTS.slice(4);
