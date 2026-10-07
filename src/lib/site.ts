// Single source of truth for everything the site says about the business.
// Change it here and every page, the footer, the JSON-LD and the OG tags follow.

export const site = {
  name: 'Bloomridge Springs',
  tagline: 'Every child belongs, every child blooms',
  url: 'https://www.bloomridgesprings.com',
  description:
    'Integrated early development and school readiness in Banasree, Dhaka, for children aged 2 to 10: school, speech and language therapy, occupational therapy, special education, creative and expressive arts, parent coaching and a psychologist-led group, all in one place.',
  locale: 'en_GB',
  address: {
    street: 'Floor 1, House 1/1, Road 7, Block F',
    area: 'Banasree',
    city: 'Dhaka',
    postcode: '1219',
    country: 'BD',
    full: 'Floor 1, House 1/1, Road 7, Block F, Banasree, Dhaka 1219',
    mapsQuery: 'House 1/1, Road 7, Block F, Banasree, Dhaka 1219',
  },
  // From the Google Maps listing "Bloomridge Springs" (share, embed a map).
  map: {
    lat: 23.7597462,
    lng: 90.4364074,
    link: 'https://maps.google.com/?cid=870262097240768389',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.6531187788282!2d90.4364074!3d23.7597462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6a5d42d2a63ac64f%3A0xc13cac43f85bf85!2sBloomridge%20Springs!5e0!3m2!1sen!2sbd!4v1789797669545!5m2!1sen!2sbd',
  },
  phones: [
    { display: '01685 559711', e164: '+8801685559711' },
    { display: '01817 710777', e164: '+8801817710777' },
  ],
  whatsapp: { e164: '8801685559711', display: '01685 559711' },
  email: 'bloomridgesprings@gmail.com',
  // Opening hours and social links are not in the brand files yet.
  // Fill these in and the contact page, footer and JSON-LD pick them up.
  hours: '' as string,
  social: { facebook: '' as string },
  seats: 15,
  ages: { min: 2, max: 10 },
  // Neighbourhoods families travel from. Used on the contact page and in the
  // structured data so local searches from these areas match.
  areas: ['Banasree', 'Rampura', 'Aftabnagar', 'Khilgaon', 'Bashabo', 'Badda', 'Malibagh', 'Mugda', 'Goran', 'Bhuiyan Para'],
} as const;

export const programs = {
  a: {
    key: 'a',
    slug: 'early-intervention',
    name: 'Early Intervention Program',
    short: 'Early Intervention',
    label: 'Program A',
    ages: 'Usually ages 2 to 6',
    focus: 'Foundations and first skills',
    lead: 'Building the foundations of communication, regulation and connection, one gentle step at a time.',
    who: 'Children who need support with communication, sensory processing or connecting with others. We start where your child is, and build the groundwork that everything else stands on.',
    outcomes: [
      ['A calmer, more regulated day', 'Sensory and emotional regulation comes first. A settled child is a child who can learn.'],
      ['A way to be understood', 'Words, signs, pictures or gestures: whatever unlocks communication for your child.'],
      ['First steps into a group', 'Sitting, sharing and taking turns. The earliest social foundations, gently taught.'],
    ],
    therapies: [
      ['OT', 'Occupational therapy', 'Fine motor skills, sensory regulation and daily independence.'],
      ['SLT', 'Speech and language', 'Early language, articulation and the means to express needs.'],
      ['SE', 'Special education', 'One-to-one learning at your child’s own pace.'],
    ],
    group:
      'A nurturing group, guided by a child psychologist, where children practise turn-taking, peer interaction, emotional awareness and cooperative play: the social skills they will use every single day.',
    faq: [
      ['Does my child need a diagnosis to join?', 'No. We assess what your child can do today and write a plan from that. A diagnosis from a paediatrician or developmental specialist is useful if you have one, but it is not required.'],
      ['My child is 2 and barely speaks. Is that too early?', 'It is exactly the right time. The years from 2 to 6 are when communication and regulation foundations are laid, and support that starts now compounds.'],
      ['How soon will I see a change?', 'Plans run in 3-month cycles and you get a weekly review. Most families see the first shifts in regulation and engagement within the first weeks, and skills scored as emerging move toward consistent over a cycle.'],
      ['Which therapies will my child get?', 'The mix of occupational therapy, speech and language therapy and special education is set from your child’s Student Profile and adjusted each week, not fixed at enrolment.'],
    ],
  },
  b: {
    key: 'b',
    slug: 'school-readiness',
    name: 'School Readiness Program',
    short: 'School Readiness',
    label: 'Program B',
    ages: 'Usually ages 4 to 10',
    focus: 'Academic and classroom skills',
    lead: 'Preparing children for the classroom: attention, literacy, numeracy, and the confidence to sit, listen and take part.',
    who: 'Children preparing for school, or up to age 10, who need support with classroom routines, reading and writing and sitting tolerance, so that school becomes a place they can succeed.',
    outcomes: [
      ['Ready to sit, listen and attend', 'Sitting tolerance, attention span and following instructions: the mechanics of learning.'],
      ['Reading, writing and numbers', 'Structured, individual instruction that closes the gap with same-age peers.'],
      ['Confident in a classroom', 'Group rules, putting a hand up, working alongside others, rehearsed before they need it.'],
    ],
    therapies: [
      ['OT', 'Occupational therapy', 'Handwriting grip, body awareness and classroom focus.'],
      ['SLT', 'Speech and language', 'Vocabulary, listening comprehension and verbal expression.'],
      ['SE', 'Special education', 'Structured reading, writing and numeracy instruction.'],
    ],
    group:
      'A supportive, psychologist-led group where children practise listening, following group instructions, peer collaboration and classroom behaviour, bridging the gap between therapy room and real school life.',
    faq: [
      ['My child is already in a school but struggling. Can they attend both?', 'Yes. Many children attend Bloomridge in the morning block and their school in the other half of the day, or take a term with us before returning. We coordinate goals with what their school expects.'],
      ['What is actually taught?', 'A written curriculum, trimester by trimester, that names the exact letters, words and numbers taught in each block, alongside sitting tolerance, following instructions and classroom routines.'],
      ['Is there homework?', 'Short take-home worksheets matched to your child’s level, and a routine we help you build. Ten focused minutes a day, not an hour of struggle.'],
      ['How do you measure progress?', 'Every goal is tied to a specific assessment item and scored on a 4-step scale: emerging, developing, consistent, independent. Reviewed with you weekly, assessed formally in December.'],
    ],
  },
} as const;

export const included = [
  ['School sessions', 'Structured small-group learning in our classroom.', '4', 'days a week, 2 hrs'],
  ['Group activity session', 'Psychologist-led social, play and peer-skills session.', '1', 'day a week, 2 hrs'],
  ['One-to-one therapy', 'OT, speech and special education. The mix is set fresh each week.', '2 to 4', 'sessions a week'],
] as const;

export const plans = [
  { name: 'Foundation', note: 'Starting out', sessions: 2, fee: 18000, featured: false },
  { name: 'Enhanced', note: 'Most chosen', sessions: 3, fee: 22000, featured: true },
  { name: 'Intensive', note: 'Highest support', sessions: 4, fee: 26000, featured: false },
] as const;

export const loop = [
  ['Strengths-first assessment', 'We map what your child can do before what they cannot. That becomes the foundation we build on, not a diagnostic label.'],
  ['A live Student Profile', 'Learning style, communication preferences, sensory needs and motivators, held in one living document every therapist, teacher and caregiver works from.'],
  ['The daily loop', 'Therapists hand strategies to teachers; teachers feed back what actually happened in class. One team solving today’s challenge, not just this term’s goal.'],
  ['Weekly review, with you', 'The profile is updated every week and shared with you. New skill mastered, we add it. New challenge, we adjust immediately.'],
] as const;

// 4 school days and 1 group day. Which weekday carries the group session is
// an assumption (Thursday); change it here if the timetable differs.
export const week = [
  { day: 'Sun', school: true, group: false },
  { day: 'Mon', school: true, group: false },
  { day: 'Tue', school: true, group: false },
  { day: 'Wed', school: true, group: false },
  { day: 'Thu', school: false, group: true },
] as const;

export const tk = (n: number) => `Tk ${n.toLocaleString('en-IN')}`;
