// ---------------------------------------------------------------------------
// Events — verified against the official site's Events listing and each
// event detail page (https://www.inamigosfoundation.org.in/events).
// ---------------------------------------------------------------------------

export interface FoundationEvent {
  slug: string
  title: string
  category: 'Community' | 'Education'
  date: string
  isoDate: string
  startTime: string
  endDate: string
  endTime: string
  location: string
  image: string
  imageAlt: string
  summary: string
  body: string[]
  highlights: string[]
  organiser: { email: string; phone: string }
}

export const EVENTS: FoundationEvent[] = [
  {
    slug: 'world-water-day-2025',
    title: 'World Water Day 2025',
    category: 'Community',
    date: '22 March 2025',
    isoDate: '2025-03-22',
    startTime: '06:00 pm',
    endDate: '23 March 2025',
    endTime: '12:00 am',
    location: 'Online',
    image: '/img/event-water-day.webp',
    imageAlt: 'World Water Day 2025 session',
    summary:
      'This event highlights the importance of water conservation and collective action to ensure clean water for all.',
    body: [
      'Water is essential for life, yet millions worldwide face water scarcity and pollution. World Water Day is a global initiative to raise awareness about water conservation and responsible usage. InAmigos Foundation is organizing an interactive event to educate and inspire individuals to take meaningful action toward a water-secure future.',
      'Let’s come together to protect and preserve our most precious resource—water.',
    ],
    highlights: [
      'Awareness sessions on water conservation and sustainability',
      'Expert talks on global water challenges and solutions',
      'Workshops on rainwater harvesting and water-efficient practices',
      'Community engagement activities to promote clean water initiatives',
    ],
    organiser: { email: 'Hr@inamigosfoundation.org.in', phone: '+91 6267 309 902' },
  },
  {
    slug: 'international-day-of-happiness-2025',
    title: 'International Day of Happiness 2025',
    category: 'Community',
    date: '20 March 2025',
    isoDate: '2025-03-20',
    startTime: '06:00 pm',
    endDate: '21 March 2025',
    endTime: '12:00 am',
    location: 'Online',
    image: '/img/event-happiness.webp',
    imageAlt: 'International Day of Happiness 2025 session',
    summary:
      'Join us in spreading joy, positivity, and well-being through engaging activities and inspiring discussions.',
    body: [
      'Happiness is not just a feeling; it’s a way of life. The International Day of Happiness is dedicated to promoting global well-being, kindness, and positive change. InAmigos Foundation invites you to be part of this celebration, where we explore the science of happiness and how small actions can make a big impact on our lives and society.',
      'Let’s come together to create a happier, more compassionate world—one smile at a time.',
    ],
    highlights: [
      'Interactive sessions on mindfulness and well-being',
      'Fun activities promoting happiness and positivity',
      'Discussions on mental health awareness and self-care',
      'Spreading kindness through community engagement',
    ],
    organiser: { email: 'Hr@inamigosfoundation.org.in', phone: '+91 6267 309 902' },
  },
  {
    slug: 'international-day-women-girls-science-2025',
    title: 'International Day of Women and Girls in Science 2025',
    category: 'Education',
    date: '11 February 2025',
    isoDate: '2025-02-11',
    startTime: '12:30 pm',
    endDate: '12 February 2025',
    endTime: '12:00 am',
    location: 'Rohtak, Haryana',
    image: '/img/event-women-science.webp',
    imageAlt: 'International Day of Women and Girls in Science 2025',
    summary:
      'Join us on February 11, 2025, to celebrate the International Day of Women and Girls in Science.',
    body: [
      'The International Day of Women and Girls in Science is a global initiative that highlights the crucial role women play in scientific advancements and innovation. InAmigos Foundation is hosting a special event to honor the achievements of women in STEM, encourage young girls to pursue careers in science, and foster an inclusive environment for future innovators.',
      'Together, let’s break barriers and create a future where women and girls thrive in science and technology.',
    ],
    highlights: [
      'Honouring the achievements of women in STEM',
      'Encouraging young girls to pursue science careers',
      'Fostering an inclusive environment for future innovators',
      'Breaking barriers in science and technology',
    ],
    organiser: { email: 'Hr@inamigosfoundation.org.in', phone: '+91 6267 309 902' },
  },
]

export const EVENT_CATEGORIES = Array.from(new Set(EVENTS.map((e) => e.category)))

export function getEvent(slug: string): FoundationEvent | undefined {
  return EVENTS.find((e) => e.slug === slug)
}
