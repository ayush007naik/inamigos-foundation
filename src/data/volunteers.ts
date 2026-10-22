// ---------------------------------------------------------------------------
// Volunteer directory — verified against
// https://www.inamigosfoundation.org.in/volunteers (listing + profile pages).
// ---------------------------------------------------------------------------

export interface Volunteer {
  name: string
  role: string
  email: string
  linkedin?: string
  /** Group used for filtering in the directory. */
  team: string
}

export const TEAM_GROUPS = [
  'All',
  'Leadership',
  'Operations',
  'Human Resources',
  'Field & Programme',
] as const

export const VOLUNTEERS: Volunteer[] = [
  {
    name: 'Govind Shukla',
    role: 'Founder and CEO',
    email: 'govind.shukla@inamigosfoundation.org.in',
    linkedin: 'https://www.linkedin.com/in/govind-shukla-7500631a0/',
    team: 'Leadership',
  },
  {
    name: 'Sagarika Jaiswal',
    role: 'Head of core member',
    email: 'adilali@gmail.com',
    team: 'Leadership',
  },
  {
    name: 'Khush Gupta',
    role: 'Deputy Head of Core member',
    email: 'hgsv@gmail.com',
    team: 'Leadership',
  },
  {
    name: 'Iniya Radhakrishnan',
    role: 'Head of Internship department',
    email: 'gdfjdhk@gmail.com',
    team: 'Operations',
  },
  {
    name: 'Shiwani',
    role: 'Team leader of core member',
    email: 'htydghdcuyj@gmail.com',
    team: 'Operations',
  },
  {
    name: 'Shaik Shahira Bhanu',
    role: 'Senior Core Member',
    email: 'shahirabanushaik.s@gmail.com',
    linkedin: 'https://www.linkedin.com/in/shaik-shahirabhanu-641599185',
    team: 'Operations',
  },
  {
    name: 'Vignesh N',
    role: 'Senior core member',
    email: 'mechv2433@gmail.com',
    team: 'Operations',
  },
  {
    name: 'Padmasri',
    role: 'Junior core member',
    email: 'hsvbjlkdvh@gmail.com',
    team: 'Operations',
  },
  {
    name: 'Anusha',
    role: 'Junior core member',
    email: 'jksbhl@gmail.com',
    team: 'Operations',
  },
  {
    name: 'Madhusoodan M',
    role: 'CSR lead',
    email: 'madhusoodanm@inamigosfoundation.org.in',
    linkedin: 'https://www.linkedin.com/in/madhusoodanmurali',
    team: 'Operations',
  },
  {
    name: 'Raman Swarnakar',
    role: 'Back-end operation support',
    email: 'ghfxd@gmail.com',
    team: 'Operations',
  },
  {
    name: 'Anam Fatima',
    role: 'HR executive',
    email: 'anamf5415@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anam-fatima-31501331a',
    team: 'Human Resources',
  },
  {
    name: 'Vedanshi Chaudhari',
    role: 'HR executive',
    email: 'vedanshichahdhary584@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Riddhima Barthwal',
    role: 'HR executive',
    email: 'ridhs2925@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Roshi',
    role: 'HR executive',
    email: 'jhfgiysg@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Tannu Sharma',
    role: 'HR executive',
    email: 'Tannusharma022001@gmail.com',
    linkedin: 'https://www.linkedin.com/in/tanu-sharma-a24660320',
    team: 'Human Resources',
  },
  {
    name: 'Anchal',
    role: 'HR executive',
    email: 'anchalsharma1890@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Jai Chandela',
    role: 'HR executive',
    email: 'jfydtg@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Simranjeet',
    role: 'HR executive',
    email: 'simmy62c@gmail.com',
    linkedin: 'https://www.linkedin.com/in/simranjeet-kaur-5b39a9314',
    team: 'Human Resources',
  },
  {
    name: 'Gloria Fredy Carvalho',
    role: 'Junior HR executive',
    email: 'gloriagraphic2002@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Khushi Rai',
    role: 'Junior HR executive',
    email: 'aadirai63@gmail.com',
    linkedin: 'https://www.linkedin.com/in/khushi-r-aabbb2344',
    team: 'Human Resources',
  },
  {
    name: 'Paree Nagpal',
    role: 'Junior HR executive',
    email: 'pareehn1412@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Bhavya',
    role: 'Junior HR executive',
    email: 'khgcfyjhxcfg@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Vivek',
    role: 'Junior HR executive',
    email: 'jhgcfiy@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Megha Kelvi',
    role: 'Junior HR executive',
    email: 'meghakelvi11@gmail.com',
    team: 'Human Resources',
  },
  {
    name: 'Sagar Solanki',
    role: 'Lead Volunteer Haryana',
    email: 'SagarS@inamigosfoundation.org.in',
    linkedin: 'https://www.linkedin.com/in/sagarsolanki3266',
    team: 'Field & Programme',
  },
  {
    name: 'Dr. Akash',
    role: 'Lead Volunteer Karnataka',
    email: 'akashrj1998@gmail.com',
    team: 'Field & Programme',
  },
  {
    name: 'Adil Ali',
    role: 'Social Media Specialist',
    email: 'adila@inamigosfoundation.org.in',
    linkedin: 'https://www.linkedin.com/in/aliadil18/',
    team: 'Operations',
  },
  {
    name: 'Komal Kushwaha',
    role: 'Volunteer Associate',
    email: 'komalkushwaha3114@gmail.com',
    linkedin: 'https://www.linkedin.com/in/komal-kushwaha-0940922b6',
    team: 'Field & Programme',
  },
  {
    name: 'Suhaliya Khan',
    role: 'Volunteer Associate',
    email: 'suhaliyak538@gmail.com',
    linkedin: 'https://www.linkedin.com/in/suhaliya-khan-3b8a8833a',
    team: 'Field & Programme',
  },
  {
    name: 'Sonam Singh',
    role: 'Volunteer Associate',
    email: 'sonamrajputzzz1120@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sonam-singh-298a0b26b',
    team: 'Field & Programme',
  },
  {
    name: 'Akash',
    role: 'Volunteer Associate',
    email: 'jhfgjufv@gmail.com',
    team: 'Field & Programme',
  },
  {
    name: 'Manavi Jaiswal',
    role: 'Junior Volunteer Associate',
    email: 'manavijaiswal67@gmail.com',
    linkedin: 'https://www.linkedin.com/in/manavi-jaiswal-07a7662bb',
    team: 'Field & Programme',
  },
  {
    name: 'Faiz Khan',
    role: 'Volunteer Supervisor Uttar Pradesh',
    email: 'kfaiz3662@gmail.com',
    team: 'Field & Programme',
  },
]

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('')
}
