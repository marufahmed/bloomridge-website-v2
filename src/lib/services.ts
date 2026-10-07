// One entry per service landing page. Each page targets the searches Dhaka
// parents actually type ("speech therapy Dhaka", "special education Dhaka")
// with the term in the URL, title, heading and first paragraph, and the copy
// written in the brand voice rather than stuffed.

export interface Service {
  slug: string;
  name: string;
  keyword: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  cover: string;
  icon: 'speech' | 'hand' | 'book' | 'group' | 'sparkle';
  intro: string[];
  who: { title: string; items: string[] };
  what: { title: string; items: [string, string][] };
  session: { title: string; text: string[] };
  fit: { title: string; text: string[] };
  faq: [string, string][];
  related: string[];
}

export const services: Service[] = [
  {
    slug: 'speech-therapy-dhaka',
    name: 'Speech and language therapy',
    keyword: 'speech therapy in Dhaka',
    title: 'Speech Therapy for Children in Banasree, Dhaka',
    description:
      'Speech and language therapy for children aged 2 to 10 in Banasree, Dhaka: late talkers, unclear speech, understanding and expressing language, in Bangla and English.',
    h1: 'Speech therapy for children in Dhaka',
    lead: 'For the child who is not talking yet, the child whose words only the family understands, and the child who talks but cannot tell you what happened. Play-based sessions in Banasree, in Bangla and English.',
    cover: 'speech-therapy',
    icon: 'speech',
    intro: [
      'Speech is the sounds a child makes. Language is the understanding and the meaning behind them. Most parents searching for speech therapy in Dhaka are worried about one or the other: a 2-year-old with very few words, a 4-year-old whose speech strangers cannot follow, a 6-year-old who cannot answer "what did you do at school today?" The first job of our speech and language therapist is to work out which of these it is, because the help is different.',
      'We are a child-development centre in Banasree, not a clinic. Speech therapy here happens at a small table or on the floor, with picture cards, bubbles, a mirror and whatever your child is already interested in. The therapist sits in the same staff room as the classroom teachers and the occupational therapist, so what is practised in a session is used in the classroom the same week, and sent home with you as 2 or 3 concrete things to try.',
    ],
    who: {
      title: 'Who speech therapy helps',
      items: [
        'Late talkers: children of 2 or 3 with fewer words than expected, or no two-word phrases yet.',
        'Unclear speech: children whose words are understood at home but not by a teacher or a relative.',
        'Understanding: children who do not follow a 2-step instruction, or who echo questions instead of answering them.',
        'Expressing: children who have words but cannot ask for help, describe, or tell a short story.',
        'Children who use gestures, signs or pictures, and need those recognised and built on rather than replaced.',
        'Children with or without a diagnosis of autism, developmental delay or a hearing history.',
      ],
    },
    what: {
      title: 'What our speech and language therapist works on',
      items: [
        ['Receptive language', 'Understanding words, following instructions, pointing to the right picture, answering who, what and where.'],
        ['Expressive language', 'First words, joining words, asking for things, commenting, and eventually telling you what happened.'],
        ['Articulation', 'The speech sounds that make a child understood outside the family, in the order they typically develop.'],
        ['Alternatives to speech', 'Gestures, signs and picture cards so being understood does not have to wait for words.'],
        ['Social communication', 'Greeting, taking turns in conversation, looking where someone points, sharing attention over a toy.'],
        ['Bangla and English', 'Both languages are welcome in the room. We do not ask families to drop the home language.'],
      ],
    },
    session: {
      title: 'What a session looks like',
      text: [
        'A session is 45 minutes to an hour, one-to-one. The therapist follows your child’s lead, models the next step up from what they already say, and creates reasons to communicate: a bubble jar that will not open, a favourite toy just out of reach, a picture that is missing a piece.',
        'The first 2 or 3 sessions are also assessment. We record what your child understands and says, how they communicate when words fail, and what motivates them. That goes into their Student Profile and becomes the first set of goals, each scored on a 4-step scale so you can see movement.',
      ],
    },
    fit: {
      title: 'How it fits with the rest of the week',
      text: [
        'Speech therapy is one part of a plan, not the whole plan. A child in our Early Intervention Program has 2 to 4 one-to-one sessions a week, and the mix between speech therapy, occupational therapy and special education is set from the profile and changed as needs change. The classroom teachers use the same target words and prompts, so a word learned on Sunday is heard and used all week.',
        'You are shown what to do at home in plain terms, and the weekly review tells you what moved.',
      ],
    },
    faq: [
      ['At what age should speech therapy start?', 'If your child has few or no words at 2, is not combining words at 2 and a half, or is hard to understand at 4, it is worth an assessment now. Early support is easier and shorter than later support.'],
      ['Do you need a diagnosis first?', 'No. We assess what your child can do and write a plan from that. If a hearing test or a paediatric opinion would help, we will say so.'],
      ['Is therapy in Bangla or English?', 'Both. The therapist works in the language your child hears most at home and supports the other one alongside.'],
      ['How many sessions a week?', 'Two to four one-to-one sessions a week depending on plan, alongside the school and group sessions. See the fees page for the three plans.'],
    ],
    related: ['speech-delay-signs-by-age', 'what-happens-in-speech-therapy', 'bilingual-bangla-english-late-talker'],
  },
  {
    slug: 'occupational-therapy-dhaka',
    name: 'Occupational therapy',
    keyword: 'occupational therapy for children in Dhaka',
    title: 'Occupational Therapy for Children in Banasree, Dhaka',
    description:
      'Paediatric occupational therapy in Banasree, Dhaka: sensory regulation, fine motor skills, handwriting readiness and daily independence for ages 2 to 10.',
    h1: 'Occupational therapy for children in Dhaka',
    lead: 'For the child who cannot sit still, or cannot bear noise, or cannot yet hold a spoon or a pencil. Play that is secretly work, in a sensory room in Banasree.',
    cover: 'occupational-therapy',
    icon: 'hand',
    intro: [
      'Occupational therapy has a confusing name. It is not about jobs. The "occupations" of childhood are eating, dressing, playing, sitting in a chair, coping with a noisy room and holding a crayon, and a paediatric occupational therapist helps a child do those things with less struggle. Families searching for occupational therapy for children in Dhaka usually arrive with one of three worries: sensory (the child melts down at loud sounds, hates certain clothes, or seeks constant movement), fine motor (grip, buttons, scissors, writing), or independence (feeding, toileting, dressing).',
      'At Bloomridge our occupational therapist works from a padded sensory room with a fabric swing, a ball pit, a climbing mat and trays of textured things, and shares a staff room with the classroom teachers. What is learned in the room is handed to the teacher the same day, so it shows up at the school table and, with your help, at the dining table at home.',
    ],
    who: {
      title: 'Who occupational therapy helps',
      items: [
        'Children who are overwhelmed by sound, touch, light or movement, or who seek far more of it than others.',
        'Children who cannot sit at a table for more than a minute or two, or who slide off the chair.',
        'Children with a weak or awkward pencil grip, or who avoid drawing, threading and building.',
        'Children who are not yet feeding themselves, dressing or using the toilet at an age when peers are.',
        'Children who are clumsy, bump into things, or avoid climbing and playground equipment.',
        'Children preparing for school who need handwriting readiness and classroom focus.',
      ],
    },
    what: {
      title: 'What our occupational therapist works on',
      items: [
        ['Sensory regulation', 'Finding the input that settles your child, and building a daily routine around it, so a settled child can learn.'],
        ['Fine motor skills', 'Hand strength, using both hands together, threading, cutting, drawing, and eventually a working pencil grip.'],
        ['Daily independence', 'Spoon, cup, buttons, zips, shoes and toileting, broken into steps small enough to succeed at.'],
        ['Posture and body awareness', 'Core strength and knowing where the body is, so that sitting to learn is not itself hard work.'],
        ['Handwriting readiness', 'Pre-writing strokes, letter formation and the sitting tolerance to finish a line.'],
        ['A sensory plan for home', 'Written for your flat, your routine and your child, not a generic list.'],
      ],
    },
    session: {
      title: 'What a session looks like',
      text: [
        'To your child it looks like play: a swing, a tunnel, a tray of beads, playdough, a wobble board. To the therapist each activity is targeting something specific, and the order of activities is chosen to bring your child to a calm, alert state before the fine motor work begins.',
        'The first sessions assess sensory responses, motor skills and daily living skills against a developmental checklist. Results go into the Student Profile with each skill scored on a 4-step scale, and the first goals are written from there.',
      ],
    },
    fit: {
      title: 'How it fits with the rest of the week',
      text: [
        'Occupational therapy strategies are handed to the classroom teachers through the daily loop, so movement breaks, seating and sensory tools are used in the school session, not just in the therapy room. For a child in the School Readiness Program the focus shifts toward handwriting and sitting tolerance; in the Early Intervention Program it is regulation and first independence.',
        'You receive a home sensory plan and a weekly review of what changed.',
      ],
    },
    faq: [
      ['Is occupational therapy only for children with autism?', 'No. Sensory and motor difficulties occur with and without any diagnosis. We assess the child in front of us, not the label.'],
      ['My child is not clumsy, just cannot sit still. Is that OT?', 'Often, yes. Constant movement is frequently a sensory need, and the right input at the right time makes sitting possible.'],
      ['What should I bring to the first session?', 'Any earlier reports, a change of clothes, and a note of what your child loves and what they cannot stand. Both matter.'],
      ['How long until we see a difference?', 'Regulation usually shifts within weeks once the right input is found. Fine motor and independence goals are written in 3-month cycles and reviewed with you weekly.'],
    ],
    related: ['sensory-processing-explained', 'occupational-therapy-for-children-explained', 'sitting-tolerance-and-attention-at-home'],
  },
  {
    slug: 'special-education-dhaka',
    name: 'Special education',
    keyword: 'special education in Dhaka',
    title: 'Special Education School and Services in Banasree, Dhaka',
    description:
      'Special education in Banasree, Dhaka for ages 2 to 10: one-to-one teaching, a written curriculum, individual education plans and a classroom of at most 15.',
    h1: 'Special education services in Dhaka',
    lead: 'One-to-one teaching at your child’s pace, a small classroom that feels like school, and an individual education plan that tells you exactly what is being taught and whether it moved.',
    cover: 'special-education',
    icon: 'book',
    intro: [
      'Special education means teaching that is built around one child: what they can already do, how they learn best, and the next small step. In Dhaka the term is used loosely, so it helps to be precise about what we mean. At Bloomridge Springs special education is delivered by trained special educators, one-to-one and in a classroom of at most 15 children, following a written curriculum that names the letters, words, numbers and classroom skills taught in each trimester, with every child on an individual education plan.',
      'We serve children aged 2 to 10 who are not yet ready for a mainstream classroom, who are in one and struggling, or who have been asked to leave one. Some have a diagnosis of autism, ADHD, a developmental delay or a learning difficulty. Many have no diagnosis at all. The plan is written from an assessment of the child, not from the label.',
    ],
    who: {
      title: 'Who special education helps',
      items: [
        'Children aged 2 to 6 who need the pre-academic foundations before school: matching, sorting, attention to a task, following instructions.',
        'Children aged 4 to 10 who are behind same-age peers in reading, writing or numbers and need structured, individual teaching to catch up.',
        'Children who cannot yet cope with a classroom: sitting, waiting, group instructions, transitions.',
        'Children in a mainstream or English-medium school who need a parallel programme to keep up.',
        'Children with autism, ADHD, developmental delay, Down syndrome or a learning difficulty, with or without a formal diagnosis.',
        'Families who want a written plan, measurable goals and a weekly account of progress, not vague reassurance.',
      ],
    },
    what: {
      title: 'What our special educators teach',
      items: [
        ['Pre-academic skills', 'Matching, sorting, sequencing, imitation and attention to a task: the foundations everything academic stands on.'],
        ['Reading, writing and numbers', 'Structured, individual instruction following the trimester curriculum, with the exact content named in advance.'],
        ['Learning how to learn', 'Waiting, asking for help, finishing a task, moving to the next one, working next to another child.'],
        ['Classroom skills', 'Sitting tolerance, following group instructions, putting a hand up, lining up, tidying: rehearsed before school demands them.'],
        ['Individual education plans', 'A 3-month plan per child, each goal tied to a curriculum target and an assessment item, scored on a 4-step scale.'],
        ['Parent coaching and home work', 'Short take-home worksheets matched to level, and monthly guidance on supporting learning at home.'],
      ],
    },
    session: {
      title: 'What special education looks like here',
      text: [
        'Each child has one-to-one sessions with a special educator and attends the small-group school session 4 mornings a week. One-to-one time is one adult, one child, one clear task at a time, in a quiet corner, with the task broken into steps small enough to succeed at and the next step introduced only when the last is consistent.',
        'The school session is where those skills are used in a group: a circle, a table activity, a story, a tidy-up. The special educators and classroom teachers share the Student Profile and talk at the end of every day.',
      ],
    },
    fit: {
      title: 'The plan, the curriculum and the December review',
      text: [
        'Every child has an individual education plan written for a 3-month teaching block. Goals cite the curriculum target and the assessment-bank item they are scored against, so the review can say plainly what moved from emerging to developing to consistent to independent. Teaching blocks run September to November, January to March and May to July, each followed by an assessment month.',
        'Speech and occupational therapy sit alongside, and the mix for your child is adjusted weekly from the same profile.',
      ],
    },
    faq: [
      ['Is this a special school?', 'It is a child-development centre with a small classroom and a written curriculum. Many children attend us in the morning and a mainstream school in the afternoon, or take a term with us before joining or returning to school.'],
      ['Do you take children with autism?', 'Yes, with or without a formal diagnosis. We do not diagnose ourselves, and we will tell you if a paediatric or developmental opinion would help.'],
      ['What ages?', 'Children aged 2 to 10. Placement into the Early Intervention or School Readiness Program is by need, not by age alone.'],
      ['How is progress reported?', 'A weekly review with you, and a formal assessment at the end of each trimester scored against the same items the goals were written from.'],
    ],
    related: ['what-a-3-month-plan-looks-like', 'school-readiness-checklist', 'why-early-intervention-matters'],
  },
  {
    slug: 'social-skills-group-dhaka',
    name: 'Psychologist-led social skills group',
    keyword: 'social skills group for children in Dhaka',
    title: 'Social Skills Group for Children in Banasree, Dhaka',
    description:
      'A weekly psychologist-led social skills group in Banasree, Dhaka for ages 2 to 10: turn-taking, peer play, feelings and following group instructions.',
    h1: 'A psychologist-led social skills group in Dhaka',
    lead: 'For the child who plays alongside but not with, who cannot lose a game, or who does not yet notice how someone else feels. The skills no one-to-one session can teach, practised once a week with a child psychologist.',
    cover: 'group-session',
    icon: 'group',
    intro: [
      'Some things can only be learned in a group: waiting while someone else has the turn, joining a game that has already started, losing without the afternoon ending, noticing that a friend is upset. Parents in Dhaka looking for a social skills group for their child are usually describing one of these. Our weekly group activity session is led by a child psychologist and built minute by minute around them.',
      'The group is small, the same children each week, and part of every Bloomridge plan rather than an add-on. What the psychologist observes goes straight into each child’s Student Profile, and the strategies that worked are passed to the classroom teachers and to you.',
    ],
    who: {
      title: 'Who the group helps',
      items: [
        'Children who play next to other children but rarely with them.',
        'Children who cannot wait a turn, share, or accept losing a game.',
        'Children who do not yet greet, ask to join in, or respond when a peer speaks to them.',
        'Children who find feelings, theirs and others’, hard to name or manage.',
        'Children heading for school who need to follow instructions given to the whole group, not just to them.',
        'Children with social communication differences, with or without a diagnosis of autism.',
      ],
    },
    what: {
      title: 'What the group works on',
      items: [
        ['Turn-taking and waiting', 'In games where the turn is worth waiting for, and the wait gets gradually longer.'],
        ['Peer interaction', 'Greeting, joining in, asking to play, responding when spoken to.'],
        ['Emotional awareness', 'Naming feelings, spotting them in others, and what to do with a big one.'],
        ['Group instructions', 'Doing what the adult asked the whole circle to do, the way a classroom will ask.'],
        ['Cooperative play', 'Building, pretending and problem-solving with another child rather than alone.'],
        ['Winning and losing', 'Practised in low-stakes games, on purpose, until an ending is survivable.'],
      ],
    },
    session: {
      title: 'What a session looks like',
      text: [
        'Two hours, once a week, on a rug with cushions and a shelf of games. It looks like a party. It is structured minute by minute: a greeting circle, a turn-taking game, a cooperative task, a feelings activity, free play with an adult scaffolding it, and a goodbye routine.',
        'The psychologist watches for what each child can already do socially and what they need next, and records it on the Student Profile alongside the speech, occupational therapy and classroom observations.',
      ],
    },
    fit: {
      title: 'How it fits with the rest of the week',
      text: [
        'The group session is the bridge between the therapy room and real school life. A child who practises requesting in speech therapy uses it to ask for a turn in the group. A child working on sitting tolerance with the occupational therapist sits in the circle. The classroom teachers then use the same cues during the 4 school mornings.',
        'The session is included in every plan, at every level of one-to-one support.',
      ],
    },
    faq: [
      ['How many children are in the group?', 'Small, and the same children each week, grouped by need and developmental stage rather than strictly by age.'],
      ['Who leads it?', 'A child psychologist, supported by the classroom staff who know each child from the school sessions.'],
      ['Can my child join the group only, without the other sessions?', 'The group is part of every plan because it depends on the profile built in the other sessions. Ask us and we will talk through what makes sense for your child.'],
      ['What do parents get from it?', 'Observations on the weekly review and specific things to try at home, such as how to set up a turn-taking game with a sibling.'],
    ],
    related: ['meltdowns-vs-tantrums', 'school-readiness-checklist', 'why-early-intervention-matters'],
  },
  {
    slug: 'autism-support-dhaka',
    name: 'Autism support',
    keyword: 'autism support for children in Banasree, Dhaka',
    title: 'Autism Support for Children in Banasree, Dhaka',
    description:
      'Support for autistic children aged 2 to 10 in Banasree, Dhaka: speech therapy, OT, special education and a small classroom in one team, diagnosis or not.',
    h1: 'Autism support for children in Banasree, Dhaka',
    lead: 'Speech therapy, occupational therapy, special education and a small classroom under one roof, working from one profile of your child. With or without a diagnosis.',
    cover: 'early-intervention',
    icon: 'sparkle',
    intro: [
      'Most families who ask us about autism support in Dhaka have spent months moving between places: a speech therapist in one part of the city, an occupational therapy clinic in another, a school that is not sure what to do, and nobody talking to anybody. Every one of those people may be good at their job. The child still gets four different plans.',
      'Bloomridge Springs puts the whole developmental journey in one place. An autistic child here has a speech and language therapist, an occupational therapist, special educators, a child psychologist leading a weekly group and a small classroom, all working from one Student Profile and talking at the end of every day. Families come from Banasree, Rampura, Aftabnagar, Khilgaon and across east Dhaka.',
    ],
    who: {
      title: 'Who we work with',
      items: [
        'Children aged 2 to 10 with a diagnosis of autism, or a query about autism that has not been assessed yet.',
        'Children who are not talking yet, or who use words but not to share or ask.',
        'Children who are overwhelmed by noise, touch or crowds, or who seek constant movement.',
        'Children who play alone, line things up, or find changes to routine very hard.',
        'Children who have been asked to leave a school, or who are struggling in one.',
        'Families who want one written plan, measurable goals and a weekly account of progress.',
      ],
    },
    what: {
      title: 'What support looks like across the week',
      items: [
        ['Communication', 'Speech and language therapy for understanding, first words and requests, with gestures, signs and pictures used alongside speech, never instead of it.'],
        ['Regulation', 'Occupational therapy to find the sensory input that settles your child, and a plan for the classroom and for home.'],
        ['Learning', 'One-to-one special education at your child’s pace, and a classroom of at most 15 children to use those skills in.'],
        ['Social connection', 'A weekly psychologist-led group for turn-taking, joining in and noticing others, in a small, predictable setting.'],
        ['Everyday independence', 'Eating, dressing, toileting and moving between activities, broken into steps small enough to succeed at.'],
        ['Parent coaching', 'A weekly review with you, and 2 or 3 concrete things to try at home. What works at the centre has to work at home too.'],
      ],
    },
    session: {
      title: 'Strengths first, not deficits first',
      text: [
        'We start by mapping what your child already does well and what motivates them: the favourite toy, the song that calms, the thing they will work for. That becomes the foundation of the plan, because skills are built on interests, not on a list of problems.',
        'Every goal is scored on a 4-step scale, emerging, developing, consistent, independent, so you can see movement week by week rather than wait for a report.',
      ],
    },
    fit: {
      title: 'What we do not do',
      text: [
        'We do not diagnose autism, and we do not promise a cure. A diagnosis comes from a developmental paediatrician or a child neurologist, and we will tell you plainly if an assessment like that would help. Support does not have to wait for it.',
        'Plans run in 3-month blocks with an assessment month after each one, and the mix of therapies is adjusted every week from the same profile.',
      ],
    },
    faq: [
      ['Do you need an autism diagnosis to join?', 'No. We assess what your child can do and write the plan from that. If a developmental paediatrician’s opinion would help, we will say so.'],
      ['Is Bloomridge an autism school?', 'It is a child-development centre with a small classroom, therapy and special education in one team. Many of our children are autistic; many are not. Every child is placed by need.'],
      ['My child is 2 and shows signs of autism. Is it too early?', 'No. The years from 2 to 6 are when support makes the biggest difference, and you do not need to wait for a diagnosis to start.'],
      ['Which therapies will my child get?', 'Speech therapy, occupational therapy and special education in a mix set from the Student Profile, plus the weekly group and 4 school sessions. The mix changes as needs change.'],
      ['How much does it cost?', 'Three monthly plans, Tk 18,000, Tk 22,000 and Tk 26,000, differing only in the number of one-to-one sessions. The fees page lists what each includes.'],
      ['Is therapy in Bangla or English?', 'Both. We work in the language your child hears most at home.'],
    ],
    related: ['why-early-intervention-matters', 'sensory-processing-explained', 'meltdowns-vs-tantrums'],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
