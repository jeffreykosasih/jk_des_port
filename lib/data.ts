export type Stage = 'Problem' | 'Constraint' | 'Decision' | 'Outcome';

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  /** What it is and how far it went (concept, redesign, built), shown with the title. */
  kind: string;
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
    kind: 'Delivery app · Self-initiated redesign',
    blurb:
      'Newspaper delivery, redesigned so drivers start a run in two steps — with the map, the list, and proof-of-delivery on the right stop.',
    outcome: 'Login-to-route is 2 steps instead of 4.',
    workImage: '/pj_02/pj_01_test_02.png',
    stages: {
      Problem: {
        content: `Drivers lost time to an old app. Every login hit a compliance check, suburb lists were buried, and delivery photos weren't tied to an address.`,
        image: '/pj_02/pj_02_test_01.png',
      },
      Constraint: {
        content: `Drivers use the map on new suburbs and the list on familiar ones. The app had to serve both without a new mode, from the driver's seat.`,
        image: '/pj_02/pj_02_empathize.png',
      },
      Decision: {
        content: `I rebuilt the flow around the run. The login check came out, map and list sit together, and each photo is taken on its own stop.`,
      },
      Outcome: {
        content: `Testers understood the flow from the first screen and could see yesterday's results before leaving the depot.`,
        image: '/pj_02/pj_02_test_01.png',
        images: ['/pj_02/pj_02_test_01.png', '/pj_02/pj_01_test_02.png'],
      },
    },
  },
  {
    id: '02',
    slug: 'port-jeffrey',
    title: 'Port Jeffrey',
    kind: '3D portfolio · Designed and built',
    blurb:
      'A Three.js island where every project is labelled in the scene — visitors know what they are looking at without opening a menu.',
    outcome: '4 labelled landmarks. One look, no extra click.',
    externalUrl: 'https://portjeffrey.vercel.app/',
    workImage: '/pj_03/pj_03_island.jpg',
    stages: {
      Problem: {
        content: `Recruiters decide in seconds. A grid of student projects gets scanned and skipped.`,
        image: '/pj_03/pj_03_profile.png',
        video: '/pj_03/rec_jefri.mp4',
      },
      Constraint: {
        content: `It had to stay a portfolio, not a game. If visitors can't tell what an object is, the 3D hides the work.`,
      },
      Decision: {
        content: `I built it in Three.js and put a project name on every object. Exploring is optional; knowing what you're looking at isn't.`,
      },
      Outcome: {
        content: `People remembered the island, and the labels did the work: point at a landmark, know the project.`,
      },
    },
  },
  {
    id: '03',
    slug: 'peter-parking',
    title: 'Peter Parking',
    kind: 'Parking app · Concept',
    blurb:
      'One app that pays every street-parking operator, so drivers stop installing a new parking app for every street.',
    outcome: 'Setup once. Paying is 3 taps — not a fifth app.',
    workImage: '/pj_07/card.png',
    stages: {
      Problem: {
        content: `Street parking in Melbourne means one app per operator. Drivers keep four or five, re-enter the same plate and card, and still get fined.`,
        image: '/pj_07/pj_07_1.png',
      },
      Constraint: {
        content: `Drivers should never need to know who owns the street. Setup asks for a plate and a card, nothing more.`,
        image: '/pj_07/pj_07_3.png',
      },
      Decision: {
        content: `Peter pays every operator. GPS suggests the zone, the driver confirms the number on the pole, and the timer wears that operator's colour.`,
        image: '/pj_07/pj_07_2.png',
      },
      Outcome: {
        content: `Daily drivers set up in a minute and trusted matching the pole over GPS alone.`,
        image: '/pj_07/pj_07_4.png',
      },
    },
  },
  {
    id: '04',
    slug: 'sigma',
    title: 'Sigma',
    kind: 'Finance app · Concept',
    blurb:
      'Most finance apps tell you what you spent. Sigma tells you what you can spend — before you spend it.',
    outcome: 'Every payment is 1 tap to approve or reject.',
    workImage: '/pj_08/pj_08_4.jpg',
    credit: 'Mockup by Mockuuups Studio',
    stages: {
      Problem: {
        content: `Finance apps report what you already spent. Budgets think in months; people spend in seconds at a terminal.`,
        image: '/pj_08/pj_08_3.jpg',
      },
      Constraint: {
        content: `It has to work at the moment of payment, in one decision, without opening another app.`,
        image: '/pj_08/pj_08_1.png',
        images: ['/pj_08/pj_08_1.png', '/pj_08/pj_08_2.png'],
        imageFit: 'contain',
      },
      Decision: {
        content: `Each phone payment pauses for one tap. Sigma shows the purchase in hours worked and goals delayed, then asks yes or no.`,
        image: '/pj_08/pj_08_4.jpg',
      },
      Outcome: {
        content: `The spending decision moves from a monthly review to the lock screen.`,
        image: '/pj_08/pj_08_6.jpg',
      },
    },
  },

  {
    id: '05',
    slug: 'revo-fitness',
    title: 'Revo Fitness',
    kind: 'Gym app · Self-initiated redesign',
    blurb:
      'Restructured the member app so plan perks and public info are no longer on the same screen.',
    outcome: 'Perks and public info split into separate screens.',
    workImage: '/pj_01/pj_01_test_01.png',
    stages: {
      Problem: {
        content: `Revo is my gym. Its app mixed member perks with public news and shop updates, and five members told me they couldn't tell what their plan included.`,
        image: '/pj_01/pj_01_overview.png',
      },
      Constraint: {
        content: `Keep Revo's look and energy, make access levels clear, and add pages without adding scrolling.`,
        image: '/pj_01/pj_01_define.png',
      },
      Decision: {
        content: `I grouped features by access level, then built it in Figma: Home for what anyone can see, Workout and Member for plan perks.`,
        image: '/pj_01/pj_01_prototype.png',
      },
      Outcome: {
        content: `The same members read the split correctly and said it still felt like Revo. Next step: more depth per section, not more sections.`,
        image: '/pj_01/pj_01_test_01.png',
        images: ['/pj_01/pj_01_test_01.png', '/pj_01/pj_01_test_02.png'],
      },
    },
  },
  {
    id: '06',
    slug: 'rooted',
    title: 'Rooted',
    kind: 'Habit app · Concept',
    blurb:
      'A habit app that splits what you grow from what you uproot, with a plant metaphor instead of a streak counter.',
    outcome: '5 testers, 4 positive — 2 asked for a widget.',
    workImage: '/pj_05/pj_05_1.png',
    stages: {
      Problem: {
        content: `Habit apps feel overwhelming and vague. A streak counts days; it doesn't say what you're building or why.`,
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
        content: `Some habits last, some only need a set run. A short habit had to be able to finish cleanly.`,
      },
      Decision: {
        content: `I framed it as a garden: grow a habit or uproot one. Each habit has a lifespan, so finishing is something the app understands.`,
        image: '/pj_05/pj_05_6.png',
      },
      Outcome: {
        content: `Four of five testers liked the framing. Two wanted a widget for a quicker daily check.`,
      },
    },
  },
  {
    id: '07',
    slug: 'katsu-seiba',
    title: 'Katsu Seiba',
    kind: 'Restaurant website · Concept',
    blurb: 'A restaurant site built around booking, not atmosphere for its own sake.',
    outcome: 'Booking stays one action away from every section.',
    externalUrl: 'https://katsuseiba.vercel.app',
    workImage: '/pj_04/pj_04_home_01.png',
    stages: {
      Problem: {
        content: `Restaurant sites pick a side: pretty but vague, or useful but flat. Visitors want food, mood, location and booking, fast.`,
        image: '/pj_04/pj_04_home_01.png',
      },
      Constraint: {
        content: `Minimal couldn't mean empty. A Japanese-inspired look still had to read clearly and point to the next step.`,
        image: '/pj_04/pj_04_home_02.png',
      },
      Decision: {
        content: `One hero photo, a three-dish menu with prices and tags, and a "Book a table" button that follows you. The form picks location, date and time, checks each field and confirms on the spot.`,
        image: '/pj_04/pj_04_home_03.png',
      },
      Outcome: {
        content: `The rebuild removed the old blank sections and doubled hero photo. Every location now has directions and tap-to-call.`,
      },
    },
  },
  {
    id: '08',
    slug: 'fruitea',
    title: 'Fruitea',
    kind: 'Food reference website',
    blurb:
      'A produce reference that answers what something does to you and what to make with it, in one read.',
    outcome: 'One page per item: benefits, risks, and what to cook.',
    externalUrl: 'https://fruitea.vercel.app',
    workImage: '/pj_06/pj_06_1.png',
    stages: {
      Problem: {
        content: `Checking if produce is good for you means one tab for nutrition, one for warnings, one for recipes.`,
        image: '/pj_06/pj_06_1.png',
        video: '/pj_06/rec_fruitea.mp4',
      },
      Decision: {
        content: `One page per item: benefits, risks and what to cook, built to scan while you're already in the kitchen.`,
      },
    },
  },
];

/** The four that lead the Work section. */
export const FEATURED_PROJECTS = PROJECTS.slice(0, 4);
/** The rest, behind the "more" disclosure — same shape, own pages. */
export const SECONDARY_PROJECTS = PROJECTS.slice(4);
