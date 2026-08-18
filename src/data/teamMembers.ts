import { isPlaceholder } from '../config/placeholders'

/**
 * Team roster.
 *
 * Seven students across three subteams, plus the adults who coach and mentor us.
 * Replace the placeholder names and bios with the real ones. Drop portraits into
 * `public/images/team/` and point `image` at them, e.g. `/images/team/ada.jpg`.
 * Leave `image` empty to fall back to a generated monogram avatar.
 */

/** Students belong to exactly one of these. */
export type Subteam = 'software' | 'hardware' | 'outreach'

export type TeamMember = {
  id: string
  name: string
  role: string
  subteam: Subteam
  /** Graduation year or grade level. */
  year: string
  bio: string
  /** Path under /public, or '' to use the monogram fallback. */
  image: string
  /** Optional skill tags rendered as small pills. */
  skills: string[]
}

export type Mentor = {
  id: string
  name: string
  /** "Head Coach", "Technical Mentor", and so on. */
  role: string
  bio: string
  image: string
}

/** Display metadata for each subteam, used for filters and the overview. */
export const subteams: { id: Subteam; label: string; description: string }[] = [
  {
    id: 'software',
    label: 'Software',
    description:
      'Writes the robot code — driver controls, autonomous routines and the sensor work behind them.',
  },
  {
    id: 'hardware',
    label: 'Hardware',
    description:
      'Designs and builds the robot: CAD, prototyping, fabrication and assembly of every mechanism.',
  },
  {
    id: 'outreach',
    label: 'Outreach',
    description:
      'Runs community events and sponsor relationships, and keeps the engineering portfolio current.',
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'STUDENT_NAME_PLACEHOLDER',
    role: 'Software Lead',
    subteam: 'software',
    year: 'Class of YEAR',
    bio: 'Short bio placeholder — what this student is building and what drew them to robotics.',
    image: '',
    skills: ['Java', 'Autonomous'],
  },
  {
    id: 'member-2',
    name: 'STUDENT_NAME_PLACEHOLDER',
    role: 'Software',
    subteam: 'software',
    year: 'Class of YEAR',
    bio: 'Short bio placeholder — the part of the codebase this student owns.',
    image: '',
    skills: ['Java', 'Sensors'],
  },
  {
    id: 'member-3',
    name: 'STUDENT_NAME_PLACEHOLDER',
    role: 'Hardware Lead',
    subteam: 'hardware',
    year: 'Class of YEAR',
    bio: 'Short bio placeholder — this student’s focus area and favourite mechanism to build.',
    image: '',
    skills: ['CAD', 'Drivetrain'],
  },
  {
    id: 'member-4',
    name: 'STUDENT_NAME_PLACEHOLDER',
    role: 'Hardware',
    subteam: 'hardware',
    year: 'Class of YEAR',
    bio: 'Short bio placeholder — what this student prototypes, machines or prints.',
    image: '',
    skills: ['3D printing', 'Assembly'],
  },
  {
    id: 'member-5',
    name: 'STUDENT_NAME_PLACEHOLDER',
    role: 'Hardware',
    subteam: 'hardware',
    year: 'Class of YEAR',
    bio: 'Short bio placeholder — mention driving, field crew or a subsystem they own.',
    image: '',
    skills: ['Fabrication', 'Driving'],
  },
  {
    id: 'member-6',
    name: 'STUDENT_NAME_PLACEHOLDER',
    role: 'Outreach Lead',
    subteam: 'outreach',
    year: 'Class of YEAR',
    bio: 'Short bio placeholder — the events this student is organising for our first season.',
    image: '',
    skills: ['Event planning', 'Writing'],
  },
  {
    id: 'member-7',
    name: 'STUDENT_NAME_PLACEHOLDER',
    role: 'Outreach & Portfolio',
    subteam: 'outreach',
    year: 'Class of YEAR',
    bio: 'Short bio placeholder — how this student documents the season and reaches sponsors.',
    image: '',
    skills: ['Portfolio', 'Design'],
  },
]

/** Our coach and technical mentors. Listed separately from the student roster. */
export const mentors: Mentor[] = [
  {
    id: 'coach-1',
    name: 'COACH_NAME_PLACEHOLDER',
    role: 'Head Coach',
    bio: 'Short bio placeholder — professional background and how they support the team.',
    image: '',
  },
  {
    id: 'mentor-1',
    name: 'MENTOR_NAME_PLACEHOLDER',
    role: 'Technical Mentor',
    bio: 'Short bio placeholder — the technical areas this mentor advises on.',
    image: '',
  },
  {
    id: 'mentor-2',
    name: 'MENTOR_NAME_PLACEHOLDER',
    role: 'Technical Mentor',
    bio: 'Short bio placeholder — the technical areas this mentor advises on.',
    image: '',
  },
]

/** Students in a subteam, in roster order. */
export function membersBySubteam(subteam: Subteam): TeamMember[] {
  return teamMembers.filter((member) => member.subteam === subteam)
}

/**
 * A person's name, or a neutral stand-in while the roster is being written up.
 *
 * Roles and subteams below are real; the names are not published yet. Saying so
 * plainly is better than printing STUDENT_NAME_PLACEHOLDER, and better than
 * dropping the card — the shape of the team is the useful part.
 */
export function displayName(name: string): string {
  return isPlaceholder(name) ? 'Name to come' : name
}

/** A field worth rendering, or null while it is still a placeholder. */
export function displayDetail(value: string): string | null {
  // "Class of YEAR" is the roster template's stand-in for a graduation year.
  if (isPlaceholder(value) || value.includes('YEAR')) return null
  return value
}

/** Initials used by the monogram avatar fallback. */
export function initialsFor(name: string): string {
  if (isPlaceholder(name)) return '··'

  const parts = name.trim().split(/[\s_]+/).filter(Boolean)
  if (parts.length === 0) return '?'
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
