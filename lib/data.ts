export type Stage = 'Problem' | 'Constraint' | 'Decision' | 'Outcome';

export type Category = 'App' | 'Website';

export interface ProjectData {
  id: string;
  slug: string;
  /** Groups the projects under the featured four on the home page. */
  category: Category;
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
    category: 'App',
    title: 'iDriver',
    kind: 'Delivery app · Redesign',
    blurb:
      'Newspaper delivery, redesigned so drivers start a run in two steps — with the map, the list, and proof-of-delivery on the right stop.',
    outcome: 'A simpler, clearer delivery app for every driver, new or experienced.',
    workImage: '/pj_02/idriver_card.aa6009ef.png',
    stages: {
      Problem: {
        content: `Drivers lost time to an old app. Every login hit a compliance check, suburb lists were buried, and delivery photos weren't tied to an address.`,
        image: '/pj_02/pj_02_empathize.png',
      },
      Constraint: {
        content: `Drivers learn a new run on the map, then switch to a simple list once they know it. The old app only had the list.`,
      },
      Decision: {
        content: `I built one smooth flow, so drivers can easily find their run, their next stop and its delivery details.`,
      },
      Outcome: {
        content: `Testers understood how it works from the first screen, got through a run smoothly, and were happy with the details at each stop.`,
        image: '/pj_02/idriver_before_the_run.71046541.png',
        images: ['/pj_02/idriver_before_the_run.71046541.png', '/pj_02/idriver_during_the_run.9827f84a.png'],
      },
    },
  },
  {
    id: '02',
    slug: 'peter-parking',
    category: 'App',
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
    id: '03',
    slug: 'sigma',
    category: 'App',
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
    id: '04',
    slug: 'port-jeffrey',
    category: 'Website',
    title: 'Port Jeffrey',
    kind: '3D portfolio website',
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
    id: '05',
    slug: 'revo-fitness',
    category: 'App',
    title: 'Revo Fitness',
    kind: 'Gym app · Redesign',
    blurb:
      'Redesigned the member app around what members do every visit: scan in, train, and use their perks.',
    outcome: 'Scan to enter and today’s workout sit one tap from Home.',
    workImage: '/pj_01/revo_card.189de419.png',
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
        content: `Home now leads with Scan to enter, the one thing members do every visit, and shows occupancy, streak and today's workout as real numbers. Workout logs sets, reps and weight. Perks sit in one list under a member card. A floating, icon-only tab bar keeps the screens clean.`,
      },
      Outcome: {
        content: `The same members read the split correctly and said it still felt like Revo. They asked for more depth, not more sections, so this version follows one visit end to end: scan in, log each set, see the summary.`,
        image: '/pj_01/revo_main_screens.c7c490db.png',
        images: ['/pj_01/revo_main_screens.c7c490db.png', '/pj_01/revo_one_visit.0f7dffd9.png'],
      },
    },
  },
  {
    id: '06',
    slug: 'rooted',
    category: 'App',
    title: 'Rooted',
    kind: 'Habit app · Concept',
    blurb:
      'A habit app that splits what you grow from what you uproot, with a plant metaphor instead of a streak counter.',
    outcome: '5 testers, 4 positive — 2 asked for a widget.',
    workImage: '/pj_05/rooted_card.7cb24616.png',
    stages: {
      Problem: {
        content: `Habit apps feel overwhelming and vague. A streak counts days; it doesn't say what you're building or why.`,
      },
      Constraint: {
        content: `Some habits last, some only need a set run. A short habit had to be able to finish cleanly.`,
      },
      Decision: {
        content: `I framed it as a garden: grow a habit or uproot one, and each habit has a lifespan. The redesign gives it a palette to match: warm paper, forest green, one bright sprout for progress, soft clay for slips. Today is one list with a ring to tap, and a missed day is clay, not alarm red.`,
      },
      Outcome: {
        content: `Four of five testers liked the framing. Two wanted a widget for a quicker daily check.`,
        image: '/pj_05/rooted_main_screens.b5bbb155.png',
        images: ['/pj_05/rooted_main_screens.b5bbb155.png', '/pj_05/rooted_tend_or_uproot.bd681fb4.png'],
      },
    },
  },
  {
    id: '07',
    slug: 'katsu-seiba',
    category: 'Website',
    title: 'Katsu Seiba',
    kind: 'Japanese restaurant website',
    blurb: 'A restaurant site built around booking, not atmosphere for its own sake.',
    outcome: 'Booking stays one action away from every section.',
    externalUrl: 'https://katsuseiba.vercel.app',
    workImage: '/pj_04/pj_04_home_01.png',
    stages: {
      Problem: {
        content: `Restaurant sites pick a side: pretty but vague, or useful but flat. Visitors want food, mood, location and booking, fast.`,
      },
      Decision: {
        content: `One hero photo, a three-dish menu with prices and tags, and a "Book a table" button that follows you. The form picks location, date and time, checks each field and confirms on the spot.`,
        image: '/pj_04/pj_04_home_01.png',
        images: ['/pj_04/pj_04_home_01.png', '/pj_04/pj_04_home_02.png', '/pj_04/pj_04_home_03.png'],
      },
    },
  },
  {
    id: '08',
    slug: 'fruitea',
    category: 'Website',
    title: 'Fruitea',
    kind: 'Fruit and veg info site',
    blurb:
      'A produce reference that answers what something does to you and what to make with it, in one read.',
    outcome: 'One page per item: benefits, risks, and what to cook.',
    externalUrl: 'https://fruitea.vercel.app',
    workImage: '/pj_06/pj_06_1.png',
    stages: {
      Problem: {
        content: `Checking if produce is good for you means one tab for nutrition, one for warnings, one for recipes.`,
      },
      Decision: {
        content: `One page per item: benefits, risks and what to cook, built to scan while you're already in the kitchen.`,
        image: '/pj_06/pj_06_1.png',
        video: '/pj_06/rec_fruitea.mp4',
      },
    },
  },
  {
    id: '09',
    slug: 'muscle-memory',
    category: 'Website',
    title: 'Muscle Memory',
    kind: 'Workout website',
    blurb:
      'A workout web app for when you can’t decide what to train: open it, pick a muscle group, follow the moves.',
    outcome: '42 exercises. 25 need no equipment.',
    externalUrl: 'https://musclememo.vercel.app',
    workImage: '/pj_09/pj_09_1.png',
    stages: {
      Problem: {
        content: `Many people stall at the start of a session because they can't decide what to train. Workout apps add more steps first: download, sign up, then a wall of options.`,
      },
      Decision: {
        content: `I made it a website, not an app: it opens in seconds with nothing to install, so it reaches more people. Seven muscle groups, six moves each, every move with sets, reps, equipment and numbered steps. Search and an equipment filter get you to one move fast, and you tick moves off as you go.`,
        image: '/pj_09/pj_09_1.png',
        images: ['/pj_09/pj_09_1.png', '/pj_09/pj_09_2.png', '/pj_09/pj_09_3.png'],
      },
    },
  },
];

/** The four strongest case studies, which lead the Work section. */
export const FEATURED_PROJECTS = PROJECTS.slice(0, 4);

/** Everything else, grouped by what it is, listed under the featured four. */
export const MORE_PROJECTS: { category: Category; label: string; projects: ProjectData[] }[] = [
  { category: 'App', label: 'Apps', projects: PROJECTS.slice(4).filter((p) => p.category === 'App') },
  { category: 'Website', label: 'Websites', projects: PROJECTS.slice(4).filter((p) => p.category === 'Website') },
];
