export type Category =
  | 'Design'
  | 'Technology'
  | 'Culture'
  | 'Business'
  | 'Lifestyle'
  | 'Travel';

export const CATEGORIES: Category[] = [
  'Design',
  'Technology',
  'Culture',
  'Business',
  'Lifestyle',
  'Travel',
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  authorRole: string;
  date: string;
  readTime: number;
  coverImage: string;
  featured: boolean;
}

export const SAMPLE_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Quiet Power of Whitespace in Interface Design',
    excerpt:
      'What we leave out matters as much as what we put in. A deep dive into how negative space shapes the way users think, feel, and act.',
    content: `Whitespace is not empty space. It is a design element in its own right — one that carries meaning, creates rhythm, and guides the eye.

## The Anatomy of Space

In interface design, whitespace (or negative space) refers to the areas between elements — the margins, the padding, the gaps between lines of text, and the breathing room around images. It is the invisible scaffolding that holds a layout together.

Consider the difference between a cluttered dashboard and a serene one. The information might be identical, but the experience is worlds apart. Whitespace gives each element room to be understood on its own terms.

## Cognitive Load and Breathing Room

Research in cognitive psychology tells us that the human brain can hold about four to seven pieces of information at once. When we flood a screen with elements, we exceed that capacity. Whitespace acts as a cognitive buffer — it lets the eye rest and the mind process.

- **Macro whitespace** controls the overall layout structure
- **Micro whitespace** governs the space within elements (line height, letter spacing, padding)
- **Visual hierarchy** emerges from the interplay between the two

## Practical Guidelines

A good rule of thumb: when you think you have enough whitespace, add a little more. Designers consistently underestimate how much space elements need to feel comfortable.

> Design is as much about what you leave out as what you put in.

Start with generous padding. Use a consistent spacing scale (like the 8px system). And remember that whitespace is not laziness — it is intention.

## The Future of Space

As screens get denser and devices get smaller, the discipline of whitespace becomes more critical, not less. The best interfaces of tomorrow will be the ones that know when to step back and let the user breathe.`,
    category: 'Design',
    author: 'Maya Chen',
    authorRole: 'Principal Designer',
    date: '2026-09-18',
    readTime: 6,
    coverImage:
      'https://images.pexels.com/photos/1964451/pexels-photo-1964451.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: true,
  },
  {
    id: '2',
    title: 'Why Slow Software Is Winning',
    excerpt:
      'In a world obsessed with speed, a counter-movement is emerging. The best software is being built with patience, care, and a radical commitment to craft.',
    content: `For two decades, the tech industry worshipped at the altar of speed. Ship fast, break things, iterate. But something is changing.

## The Cult of Velocity

Move fast and break things was not just a slogan — it was an entire philosophy. It produced incredible products, but it also produced burnout, technical debt, and a generation of software that felt disposable.

## The Counter-Movement

A new generation of makers is rejecting the velocity-at-all-costs mindset. They are building software the way a luthier builds a guitar — with patience, attention to materials, and a deep respect for the person who will use it.

These products share certain qualities:

1. They are **opinionated** rather than feature-bloated
2. They are **durable** rather than trendy
3. They respect the user's **attention** rather than demanding it
4. They are **profitable** rather than growth-obsessed

## What Slow Means

Slow does not mean lazy. It means deliberate. It means writing code you are proud of, designing interfaces you would show your friends, and shipping when something is actually ready — not when a sprint ends.

> Craft is not about perfection. It is about care.

## The Economics of Patience

Counter-intuitively, slow software can be more profitable. When you build something people truly love, they pay for it, they tell their friends, and they stick around. You do not need to spend millions on acquisition when your product is the marketing.

The future belongs to makers who care.`,
    category: 'Technology',
    author: 'James Okonkwo',
    authorRole: 'Engineering Lead',
    date: '2026-09-15',
    readTime: 8,
    coverImage:
      'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: true,
  },
  {
    id: '3',
    title: 'The Return of the Handwritten Letter',
    excerpt:
      'In an age of instant messages and AI-generated emails, putting pen to paper has become a radical act of presence.',
    content: `There is something irreducible about a handwritten letter. It cannot be copy-pasted. It cannot be batched. It demands the one thing we have least of: time.

## The Medium Is the Message

When you write a letter by hand, you slow down. You choose your words more carefully because you cannot backspace. The physical act of writing engages different cognitive processes than typing — studies show it improves memory, comprehension, and emotional connection.

## A Radical Act

In a world where communication is frictionless, friction becomes meaningful. A letter says: *I stopped everything else. I sat down. I thought about you.*

> The deepest form of luxury is not speed — it is attention.

## Starting Again

You do not need fancy stationery. A piece of paper and a pen will do. What matters is the act itself — the willingness to be slow in a world that rewards speed.

Write to someone today. Not an email. Not a text. A letter. You will be surprised by what comes back.`,
    category: 'Culture',
    author: 'Sofia Reyes',
    authorRole: 'Culture Editor',
    date: '2026-09-12',
    readTime: 5,
    coverImage:
      'https://images.pexels.com/photos/261907/pexels-photo-261907.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: false,
  },
  {
    id: '4',
    title: 'Building a Business Around Your Values, Not Your Valuation',
    excerpt:
      'The bootstrapped revolution is here. More founders are choosing independence over venture capital — and building better companies for it.',
    content: `The default path for a startup founder used to be clear: raise money, grow fast, raise more money, exit. But an increasing number of founders are asking: what if I just build a good business?

## The Bootstrap Alternative

Bootstrapping forces discipline. When every dollar matters, you learn what truly matters. You talk to customers instead of chasing metrics. You build features that solve real problems instead of features that look good in a pitch deck.

## The Freedom of Constraint

Constraints breed creativity. Without a war chest of venture capital, you cannot buy your way out of bad product decisions. You have to build something people will pay for — and that is a remarkably clarifying constraint.

- You own your time
- You own your decisions
- You own your upside
- You define success on your own terms

> A business is not a sprint to an exit. It is a craft you practice for years.

## The New Playbook

The internet has made it cheaper than ever to start a business and easier than ever to reach customers. You do not need permission. You do not need a board. You need a problem worth solving and the persistence to solve it well.

The best businesses of the next decade will not be the ones that raise the most money. They will be the ones that care the most about the people they serve.`,
    category: 'Business',
    author: 'David Park',
    authorRole: 'Founder & CEO',
    date: '2026-09-10',
    readTime: 7,
    coverImage:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: false,
  },
  {
    id: '5',
    title: 'The Art of the Morning Walk: Finding Clarity One Step at a Time',
    excerpt:
      'It is the simplest habit in the world, and it might be the most transformative. A case for walking as a daily practice.',
    content: `Every morning, before the world wakes up, I walk. Not to get anywhere. Not to burn calories. Just to think.

## The Walking Tradition

Some of history's greatest thinkers were walkers. Kant walked every afternoon at precisely the same time. Nietzsche claimed that only thoughts conceived while walking have any value. Steve Jobs was famous for his walking meetings.

There is something about the rhythm of walking that unlocks the mind. The gentle motion, the fresh air, the changing scenery — it creates a state of relaxed alertness that is perfect for thinking.

## The Science

Research shows that walking increases creativity by an average of 60%. It improves mood, reduces stress, and enhances problem-solving. The benefits are not tied to speed or distance — they come from the act itself.

> All truly great thoughts are conceived while walking.

## How to Start

1. Leave your phone at home (or put it on airplane mode)
2. Pick a route you can walk without thinking about directions
3. Walk for at least 20 minutes
4. Do not try to think — just let your mind wander

The magic is not in any single walk. It is in the accumulation. After a month of daily walks, you will think differently. After a year, you will be a different person.

Walk tomorrow morning. See what comes to you.`,
    category: 'Lifestyle',
    author: 'Olivia Brennan',
    authorRole: 'Wellness Writer',
    date: '2026-09-08',
    readTime: 4,
    coverImage:
      'https://images.pexels.com/photos/2591247/pexels-photo-2591247.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: false,
  },
  {
    id: '6',
    title: 'Lisbon: The City That Lives in the In-Between',
    excerpt:
      'A travel essay about a city that defies categorization — part old world, part new world, entirely itself.',
    content: `Lisbon does not announce itself. It does not have the grand boulevards of Paris or the imperial swagger of Rome. It whispers. And if you listen, it will change you.

## The Light

They say Lisbon has the best light in Europe. It is a particular kind of light — warm, golden, and slightly melancholic, as if the sun itself remembers the age of exploration. The light makes the pastel buildings glow and the azulejo tiles shimmer.

## The In-Between

Lisbon exists in the spaces between things. Between the old world and the new. Between the Atlantic and the Mediterranean. Between the grandeur of its past and the creative energy of its present.

You feel it in the cafes, where a 300-year-old building houses a specialty coffee roaster. You feel it in the music — fado, with its roots in the sea and its heart in the modern. You feel it in the streets, where cobblestones worn smooth by centuries lead to coworking spaces full of remote workers from Berlin and São Paulo.

> A city is not its monuments. It is its rhythm.

## What to Do

Skip the guidebook. Wander. Get lost in Alfama. Eat pastéis de nata at 8am. Ride Tram 28 not as a tourist but as a passenger. Sit by the river at sunset and do nothing.

Lisbon rewards those who do not try to conquer it. It is a city for the slow, the curious, and the patient. It will not give you a checklist of sights. It will give you a feeling that stays.

Go. Stay longer than you planned. You will understand.`,
    category: 'Travel',
    author: 'Marco Silva',
    authorRole: 'Travel Correspondent',
    date: '2026-09-05',
    readTime: 6,
    coverImage:
      'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: false,
  },
  {
    id: '7',
    title: 'Designing for the Edges: Why Accessibility Makes Everything Better',
    excerpt:
      'The curb cut effect shows that designing for the margins improves the experience for everyone. Here is how to apply it to digital products.',
    content: `The curb cut was invented for wheelchair users. But everyone benefits — parents with strollers, delivery workers with carts, travelers with luggage. This is the curb cut effect: designing for the edges improves the center.

## What Accessibility Really Means

Accessibility is not a checklist. It is not a compliance exercise. It is a design philosophy that asks: who is excluded by our current choices, and how might we include them?

When you design for someone with a permanent disability, you often solve problems for people with temporary impairments too. Closed captions help deaf users, but they also help someone watching a video on mute. High contrast helps low-vision users, but it also helps someone reading in bright sunlight.

## The Business Case

- **Inclusive design reaches more people**: Over 1 billion people live with some form of disability
- **It improves SEO**: Semantic HTML and alt text are accessibility features that also boost search rankings
- **It reduces legal risk**: Accessibility lawsuits are rising year over year
- **It builds brand trust**: Users notice when you care

> When you design for the edges, you design for everyone.

## Practical Steps

1. Start with semantic HTML — it is the foundation of accessibility
2. Test with a keyboard only — can you navigate your entire product without a mouse?
3. Check color contrast — aim for WCAG AA (4.5:1 for normal text)
4. Add alt text to images — describe the purpose, not the pixels
5. Label form fields clearly — do not rely on placeholders alone

Accessibility is not a feature you add at the end. It is a practice you build into every decision.`,
    category: 'Design',
    author: 'Maya Chen',
    authorRole: 'Principal Designer',
    date: '2026-09-02',
    readTime: 7,
    coverImage:
      'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: false,
  },
  {
    id: '8',
    title: 'The End of the App Store Era',
    excerpt:
      'The app economy is fragmenting. AI agents, progressive web apps, and open protocols are reshaping how software reaches users.',
    content: `For fifteen years, the app store was the gateway to mobile. If you wanted to reach users, you played by Apple and Google's rules. That era is ending.

## The Cracks in the Wall

The 30% tax. The arbitrary rejections. The opaque review process. For years, developers accepted these as the cost of distribution. But the ground is shifting.

The EU's Digital Markets Act has forced Apple to allow alternative app stores. Web technologies have advanced to the point where progressive web apps can do almost everything native apps can. And AI agents are beginning to bypass apps entirely — users ask, and the agent acts.

## What Comes Next

The future of software distribution is not a single gatekeeper. It is a constellation of channels:

- **Progressive web apps** for frictionless access
- **AI agents** as a new interface layer
- **Open protocols** for interoperability
- **Direct distribution** via the web

> The best distribution strategy is to not need a gatekeeper at all.

## The Opportunity

For makers, this is liberating. You can build once and reach everyone. You do not need to learn Swift and Kotlin and React Native. You do not need to wait weeks for review. You ship, you iterate, you learn.

The app store era built enormous companies. The post-app-store era will build even more — but they will look different. They will be leaner, faster, and more independent.

The gate is opening. Walk through it.`,
    category: 'Technology',
    author: 'James Okonkwo',
    authorRole: 'Engineering Lead',
    date: '2026-08-28',
    readTime: 6,
    coverImage:
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: false,
  },
];
