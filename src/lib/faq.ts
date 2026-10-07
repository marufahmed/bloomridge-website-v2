// The questions parents ask before they call, grouped for /faq/. Answers use
// only facts already stated elsewhere on the site; anything not yet confirmed
// (opening hours, assessment fee, assessment length) is answered "ask us".

import { plans, tk } from './site';

const fees = plans.map((p) => `${p.name} ${tk(p.fee)}`).join(', ');

export const faqGroups: { id: string; title: string; items: [string, string][] }[] = [
  {
    id: 'starting',
    title: 'Getting started',
    items: [
      ['My child is 2 or 3 and still not talking. Should I wait?', 'No. Few or no words at 2, or no two-word phrases by 2 and a half, is worth an assessment now. Waiting rarely helps, and support that starts early is easier and shorter than support that starts late.'],
      ['How do I start?', 'Call or WhatsApp 01685 559711. We will talk through what you are seeing, tell you honestly whether Bloomridge is the right place, and book a play-based, strengths-first assessment at the centre with you in the room.'],
      ['What happens at the first assessment?', 'Your child plays while we observe all areas of development and note what they already do well. You get a written summary, a program recommendation and a starting plan, without jargon.'],
      ['Is there an assessment fee?', 'Please ask when you call. We will tell you the current fee and what it includes before you book.'],
      ['Does my child need a diagnosis to join?', 'No. We assess what your child can do today and write a plan from that. A report from a paediatrician or specialist is useful if you have one, but not required.'],
      ['What should I bring?', 'Any earlier reports, something your child loves, a note of the words or signs they use at home in any language, and your questions written down.'],
    ],
  },
  {
    id: 'programs',
    title: 'Programs and therapies',
    items: [
      ['What does "all in one place" mean?', 'School sessions, speech and language therapy, occupational therapy, special education, a psychologist-led group, creative and expressive arts, and parent coaching, delivered by one team working from one Student Profile of your child. Families do not have to run between a speech centre, an OT clinic and a school.'],
      ['What is the difference between the two programs?', 'The Early Intervention Program (usually ages 2 to 6) builds communication, regulation and first social skills. The School Readiness Program (usually ages 4 to 10) builds attention, reading, writing, numbers and classroom skills. Placement is by need, not by age alone.'],
      ['What is included every week?', 'Four 2-hour school sessions in a small classroom, one 2-hour psychologist-led group session, and 2 to 4 one-to-one therapy sessions depending on your plan.'],
      ['How long is a one-to-one therapy session?', 'Between 45 minutes and an hour, one adult and one child.'],
      ['Who decides which therapies my child gets?', 'The mix of speech therapy, occupational therapy and special education is set from your child’s Student Profile and adjusted every week, not fixed at enrolment.'],
      ['How many children are in the classroom?', `At most 15. We keep it small so every adult in the room knows every child.`],
      ['Is therapy in Bangla or English?', 'Both. The team works in the language your child hears most at home and supports the other alongside it. We never ask families to drop the home language.'],
      ['My child already goes to school. Can they attend both?', 'Yes. Many children attend Bloomridge for one part of the day and their school for the other, or spend a term with us before joining or returning to school. We align goals with what the school expects.'],
    ],
  },
  {
    id: 'autism',
    title: 'Autism, diagnosis and additional needs',
    items: [
      ['Do you work with autistic children?', 'Yes, with or without a formal diagnosis. Speech therapy, occupational therapy, special education and the weekly group are planned together for each child.'],
      ['Do you diagnose autism or ADHD?', 'No. Diagnosis comes from a developmental paediatrician or a child neurologist. We will tell you plainly if an assessment like that would help, and support does not have to wait for it.'],
      ['Is Bloomridge a special school?', 'It is a child-development centre with a small classroom, a written curriculum, and therapy in the same team. It sits between a therapy centre and a school, so children can move on to mainstream school when ready.'],
      ['Do you take children with Down syndrome, developmental delay or learning difficulties?', 'Yes. We plan from the child in front of us, not the label. If a need is outside what we can support well, we will say so at the first conversation.'],
      ['My child has meltdowns. Can you help?', 'Often, yes. Meltdowns usually have a sensory or communication cause. Occupational therapy and speech therapy work on the cause, and the classroom team uses the same strategies all day.'],
    ],
  },
  {
    id: 'fees',
    title: 'Fees and schedule',
    items: [
      ['How much does it cost?', `Three monthly plans: ${fees}. They differ only in the number of one-to-one therapy sessions a week (2, 3 or 4). Everything else is included in every plan.`],
      ['Is the fee the same for both programs?', 'Yes. The Early Intervention and School Readiness Programs share the same three plans.'],
      ['Can we change plan later?', 'Yes, at the start of any month. Many families begin on Foundation while a child settles, then move up where the profile shows extra sessions would help.'],
      ['Can we add extra one-to-one sessions?', 'Yes. Sessions beyond your plan can be added and are charged per session.'],
      ['How do I pay?', 'Monthly, in advance, at the centre. A receipt is issued for every payment.'],
      ['What are the opening hours?', 'Please call or WhatsApp 01685 559711 for current timings and to arrange a visit.'],
      ['How does the school year run?', 'Teaching blocks run September to November, January to March and May to July. Each is followed by an assessment month (December, April, August) when every goal is scored and the next plan is written.'],
    ],
  },
  {
    id: 'progress',
    title: 'Progress and parents',
    items: [
      ['How will I know if my child is improving?', 'Every goal is scored on a 4-step scale: emerging, developing, consistent, independent. You get a weekly review showing what moved, and a formal assessment at the end of each teaching block.'],
      ['How soon will we see a change?', 'Most families see the first shifts in regulation and engagement within weeks. Bigger skills are planned in 3-month blocks and reviewed with you weekly.'],
      ['What is my role as a parent?', 'You are part of the team. Each week you get 2 or 3 concrete things to try at home, and short worksheets matched to your child’s level. Ten focused minutes a day beats an hour of struggle.'],
      ['Is there homework?', 'Short take-home worksheets matched to your child’s level, and a routine we help you build.'],
    ],
  },
  {
    id: 'location',
    title: 'Location',
    items: [
      ['Where exactly are you?', 'Floor 1, House 1/1, Road 7, Block F, Banasree, Dhaka 1219. It is on Google Maps as Bloomridge Springs.'],
      ['We live in Rampura, Aftabnagar or Khilgaon. Is that too far?', 'Most of our families come from Banasree, Rampura, Aftabnagar, Khilgaon, Bashabo, Badda, Malibagh, Mugda and Goran. The centre is a short rickshaw ride from Rampura bridge.'],
      ['Is there parking?', 'Yes, on the lane outside.'],
      ['Can I visit before deciding?', 'Call or WhatsApp 01685 559711 and ask. Most questions are easiest answered in person, at the first conversation or the assessment.'],
    ],
  },
];
