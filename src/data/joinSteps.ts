/**
 * How to join the team.
 *
 * Edit the steps and the eligibility notes here — the Join page renders whatever
 * is in this file, so the copy stays in one place.
 */

export type JoinStep = {
  id: string
  title: string
  description: string
}

export const joinSteps: JoinStep[] = [
  {
    id: 'step-1',
    title: 'Email us',
    description:
      'Tell us your name, your grade, and what part sounds interesting — code, building, or the outreach and design side. One or two sentences is plenty.',
  },
  {
    id: 'step-2',
    title: 'Come to a meeting',
    description:
      'Sit in on a session and see what we actually do. Nothing to prepare and nothing to bring; you are just there to look around and ask questions.',
  },
  {
    id: 'step-3',
    title: 'Try a subteam',
    description:
      'Spend a couple of weeks with whichever subteam interests you most. If it turns out not to fit, switch — most of us end up working across all three anyway.',
  },
  {
    id: 'step-4',
    title: 'You are on the team',
    description:
      'Once you have found where you fit, you are in. We will get you set up with the tools and pair you with someone already working in that area.',
  },
]

export type JoinFact = {
  id: string
  question: string
  answer: string
}

export const joinFacts: JoinFact[] = [
  {
    id: 'fact-experience',
    question: 'Do I need experience?',
    answer:
      'No. We formed in 2026 and most of us started knowing nothing about robotics. Being willing to be bad at something for a few weeks matters far more than arriving skilled.',
  },
  {
    id: 'fact-who',
    question: 'Who can join?',
    answer:
      'Middle and high school students in the Redmond area. We are an independent community team, so you do not need to attend a particular school to be part of it.',
  },
  {
    id: 'fact-cost',
    question: 'Does it cost anything?',
    answer:
      'Talk to us. We are a new team still building our budget, and we do not want cost to be the reason someone cannot take part — reach out and we will work it out.',
  },
  {
    id: 'fact-time',
    question: 'How much time does it take?',
    answer:
      'More during build season than the offseason. We would rather you commit to the meetings you can genuinely make than promise everything and burn out by January.',
  },
  {
    id: 'fact-when',
    question: 'When can I join?',
    answer:
      'Now. We are a first-year team and still growing, so we are not waiting for a recruitment window — if you are interested, email us this week.',
  },
]
