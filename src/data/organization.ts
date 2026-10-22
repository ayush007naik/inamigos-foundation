// ---------------------------------------------------------------------------
// Verified organisational details.
// Source: https://www.inamigosfoundation.org.in/  (About Us, Contact, footer)
// ---------------------------------------------------------------------------

export const ORG = {
  name: 'InAmigos Foundation',
  shortName: 'InAmigos',
  legalName: 'InAmigos Foundation',
  tagline: 'Friends who turn compassion into action.',
  foundedOn: '23 September 2020',
  foundedIso: '2020-09-23',
  founder: 'Mr. Govind Shukla',
  founderRole: 'Founder & CEO',
  base: 'Chhattisgarh, India',
  registration: 'Section 8 registered non-profit organisation, licensed by the Central Government',
  website: 'https://www.inamigosfoundation.org.in/',
  email: 'support@inamigosfoundation.org.in',
  emailAlternate: 'inamigosfoundation@gmail.com',
  hrEmail: 'Hr@inamigosfoundation.org.in',
  phone: '+91 626 730 9902',
  phoneRaw: '+916267309902',
  address: {
    line1: 'Ward No. 5, Gram Post, Sipat Ujwal Nagar',
    line2: 'Bilaspur, Chhattisgarh',
    pin: '495555',
    country: 'India',
  },
  donateUrl: 'https://rzp.io/l/kWQ87HP',
  volunteerFormUrl: 'https://forms.gle/AB4c1hLaDDmtrKGU7',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/inamigos/', icon: 'instagram' },
    { label: 'Facebook', href: 'https://www.facebook.com/inamigos.inamigos', icon: 'facebook' },
    { label: 'X', href: 'https://twitter.com', icon: 'twitter' },
    { label: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
  ],
  credits: { label: 'Developed by Visho Infotech', href: 'https://vishoinfotech.com' },
} as const

export interface Credential {
  id: string
  title: string
  detail: string
  authority: string
}

export const CREDENTIALS: Credential[] = [
  {
    id: 'section-8',
    title: 'Registered under Section 8',
    detail:
      'Licensed by the Central Government as a non-profit organisation, giving the foundation a formal legal framework to operate across India.',
    authority: 'Central Government',
  },
  {
    id: '80g-12a',
    title: '80G & 12A Certified',
    detail:
      'Ensures transparency, accountability and tax-exempt benefits for donors, with a 12A registration that allows the foundation to receive tax-exempt funds and grants.',
    authority: 'Government of India',
  },
  {
    id: 'csr-1',
    title: 'CSR-1 Registered',
    detail:
      'Eligible for corporate CSR partnerships, allowing us to collaborate with corporate partners on impactful Corporate Social Responsibility initiatives.',
    authority: 'Ministry of Corporate Affairs',
  },
  {
    id: 'niti-aayog',
    title: 'NITI Aayog Registered',
    detail:
      'Aligning our work with national development goals and recognised on the NITI Aayog NGO list.',
    authority: 'NITI Aayog',
  },
  {
    id: 'iso-9001',
    title: 'IAF ISO 9001:2015 Certified',
    detail:
      'Signifies our commitment to maintaining high-quality standards in operations and service delivery.',
    authority: 'IAF accredited certification',
  },
]

export interface Stat {
  value: number
  suffix: string
  label: string
  detail: string
}

export const STATS: Stat[] = [
  {
    value: 200,
    suffix: '+',
    label: 'Our Volunteers',
    detail: 'A nationwide network of professionals, students and ground volunteers.',
  },
  {
    value: 28,
    suffix: '',
    label: 'States',
    detail: 'Active programmes and volunteer chapters across the length of India.',
  },
  {
    value: 6,
    suffix: '',
    label: 'Our Causes',
    detail: 'Six flagship initiatives, each with its own measurable commitment.',
  },
  {
    value: 50000,
    suffix: '+',
    label: 'Beneficiaries',
    detail: 'People reached through food, education, care, skills and greening work.',
  },
]

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Causes', href: '/causes' },
  { label: 'About', href: '/about' },
  { label: 'Volunteers', href: '/volunteers' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Journal', href: '/blog' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
] as const
