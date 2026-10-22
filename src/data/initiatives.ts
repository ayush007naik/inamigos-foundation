// ---------------------------------------------------------------------------
// The six official initiatives of InAmigos Foundation.
// Source: https://www.inamigosfoundation.org.in/page/About-Us ("Our Key
// Initiatives & Impact") cross-checked against the homepage carousel and the
// foundation's own blog articles. Figures are quoted from the official site.
// ---------------------------------------------------------------------------

export type InitiativeKey = 'seva' | 'bachpanshala' | 'jeev' | 'udaan' | 'prakriti' | 'vikas'

export interface Initiative {
  key: InitiativeKey
  name: string
  project: string
  tagline: string
  summary: string
  detail: string
  highlights: string[]
  metric: { value: string; label: string }
  accent: 'ember' | 'moss' | 'clay'
  image: string
  imageAlt: string
  relatedPosts: string[]
}

export const INITIATIVES: Initiative[] = [
  {
    key: 'seva',
    name: 'Seva',
    project: 'Project SEVA',
    tagline: 'Serving Humanity with Compassion',
    summary:
      'Nutritious meals and essential clothing for the underprivileged — dignity restored, not just dependency relieved.',
    detail:
      'Project Seva exists so that no family in our care goes to bed hungry or suffers through extreme weather without cover. We distribute nutritious meals and essential clothing to underprivileged families, and in doing so we restore a basic dignity: a family that can feed itself and dress its children is a family that can begin to plan. The programme also raises awareness around food security, because relief that lasts is only possible when the systems around it begin to change.',
    highlights: [
      'Nutritious meal distribution to underprivileged families',
      'Essential clothing support through every season',
      'Food-security awareness alongside direct relief',
      'Volunteer-led distribution with dignity-first practice',
    ],
    metric: { value: '50,000+', label: 'meals & clothing distributed' },
    accent: 'ember',
    image: '/img/feature-donate.webp',
    imageAlt: 'Hands of a volunteer preparing a care package',
    relatedPosts: ['inamigos-foundation-transforming-lives'],
  },
  {
    key: 'bachpanshala',
    name: 'BachpanShala',
    project: 'Project BACHPANSHALA',
    tagline: 'Nurturing Young Minds, Building Bright Futures',
    summary:
      'Bridging the educational gap for underprivileged children through digital literacy, life skills and school support.',
    detail:
      'BachpanShala bridges educational gaps by training underprivileged children in basic digital literacy and life skills, and by supporting their schooling directly. Education is the single most reliable route out of poverty, so we treat access to it as infrastructure rather than charity: learning sessions, school supplies, mentorship, and safe spaces where a child can ask questions without shrinking. The aim is a childhood that is genuinely enriching rather than merely survivable.',
    highlights: [
      'Basic digital literacy and life-skills training',
      'School education support and learning materials',
      'Mentorship from trained volunteers',
      'Health, arts and safe-space programmes',
    ],
    metric: { value: '1:1', label: 'mentored learning' },
    accent: 'moss',
    image: '/img/post-bachpanshala.webp',
    imageAlt: 'Children learning together in a BachpanShala session',
    relatedPosts: ['bachpanshala-shaping-dreams-with-inamigos'],
  },
  {
    key: 'jeev',
    name: 'Jeev',
    project: 'Project JEEV',
    tagline: 'Empowering Lives, Spreading Compassion',
    summary:
      'Animal welfare through rescue, protection and daily feeding of stray animals across our volunteer network.',
    detail:
      'Jeev means animals in Hindi, and the project began with a simple conviction: animals that cannot speak still have the right to be fed, sheltered and protected. Through our volunteer network we feed 50+ stray animals daily, build makeshift shelters, provide medical care where we can, and rehome animals whenever it is in their interest. Just as material aid matters, so does company — our volunteers sit with the animals, because being cared for is part of being alive.',
    highlights: [
      'Daily feeding of 50+ stray animals',
      'Makeshift shelters and protection from adverse weather',
      'Rescue, medical care and rehoming',
      'Volunteer companionship and emotional support',
    ],
    metric: { value: '50+', label: 'animals fed every day' },
    accent: 'clay',
    image: '/img/post-jeev.webp',
    imageAlt: 'Volunteers caring for a stray animal',
    relatedPosts: ['project-jeev-in-this-life-save-a-life', 'Protect-Wildlife-Protect-Ourselves-A-Harmonious-Future-'],
  },
  {
    key: 'udaan',
    name: 'Udaan',
    project: 'Project UDAAN',
    tagline: 'Soaring Towards a Brighter Future',
    summary:
      'Women empowered through self-help groups, skill development, financial independence and menstrual hygiene awareness.',
    detail:
      'Udaan works with self-help groups in rural areas so that empowerment is collective, not individual. Women are equipped with marketable skills — from tailoring and handicrafts to digital literacy and entrepreneurship — and are supported in starting and sustaining small businesses with links to local markets and access to microfinance. Alongside this we run workshops on leadership, women’s rights, health and menstrual hygiene awareness. Udaan has already transformed the lives of over 900 women, and the ripple effect reaches families and whole communities.',
    highlights: [
      'Skill training from tailoring and handicrafts to digital literacy',
      'Support for women entrepreneurs and microfinance access',
      'Workshops on leadership, rights, health and menstrual hygiene',
      'A sisterhood of self-help groups across rural areas',
    ],
    metric: { value: '900+', label: 'women empowered' },
    accent: 'ember',
    image: '/img/post-udaan.webp',
    imageAlt: 'Women in a Udaan self-help group workshop',
    relatedPosts: ['udaan-women-rise-dreams-soar-change-begins'],
  },
  {
    key: 'prakriti',
    name: 'Prakriti',
    project: 'Project PRAKRITI',
    tagline: 'Plant for a Better Tomorrow',
    summary:
      'Environmental conservation and sustainability through 20,000+ saplings planted and eco-friendly agriculture support.',
    detail:
      'Prakriti advocates for sustainability and environmental conservation by planting more than 20,000 saplings and supporting eco-friendly agriculture. Tree-planting drives are paired with clean-up campaigns and conservation workshops, because planting without teaching people to value what they have planted simply moves the problem. We involve local communities so that responsibility for the environment is felt locally and carried forward long after the drive ends.',
    highlights: [
      '20,000+ saplings planted across drives',
      'Clean-up campaigns and conservation workshops',
      'Support for eco-friendly agriculture',
      'Community-led ownership of green spaces',
    ],
    metric: { value: '20,000+', label: 'saplings planted' },
    accent: 'moss',
    image: '/img/post-mission-life.webp',
    imageAlt: 'Volunteers planting saplings during a Prakriti drive',
    relatedPosts: [
      'mission-life-sustainable-future-inamigos-foundation',
      'embracing-life-sustainable-living-with-inamigos-foundation',
      'save-water-save-life',
    ],
  },
  {
    key: 'vikas',
    name: 'Vikas',
    project: 'Project VIKAS',
    tagline: 'Enhancing Employability, Creating Room to Grow',
    summary:
      'Employment and skill development through large-scale internships in data operations, finance, research, writing and more.',
    detail:
      'Vikas facilitates employment and skill development through internships in a wide range of fields. Over the past four years we have trained 30,000+ interns in data operations, finance, research, content writing, digital marketing, social work and more — engaging 100,000+ interns and providing 1,000+ internship opportunities along the way. Alongside placements we run webinars, seminars and live shows with industry experts, talent shows, resume-building and interview-preparation sessions, so that employability is built deliberately rather than stumbled into.',
    highlights: [
      'Internships in data ops, finance, research, writing and digital marketing',
      '30,000+ interns trained over the last four years',
      'Webinars, seminars, talent shows and live sessions with industry experts',
      'Resume building and interview preparation',
    ],
    metric: { value: '30,000+', label: 'interns trained in four years' },
    accent: 'clay',
    image: '/img/post-vikas.webp',
    imageAlt: 'Interns at a Project Vikas workshop',
    relatedPosts: ['Project-Vikas-Transforming-Careers-One-Internship-at-a-Time'],
  },
]

export function getInitiative(key: string): Initiative | undefined {
  return INITIATIVES.find((i) => i.key === key)
}
