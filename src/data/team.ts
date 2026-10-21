export type Member = {
  name: string
  role: string
  linkedin?: string
  instagram?: string
}

export const members: Member[] = [
  { name: 'Hafeez Alavi', role: 'Founder and Executive Director' },
  { name: 'Joel Matthew', role: 'Policy and Research Analyst' },
  { name: 'Rae Mahboob', role: 'Social Media Coordinator' },
  { name: 'Richard Li', role: 'Software Developer' },
  { name: 'Ben Corrigan', role: 'Community and Stakeholder Relations' },
  { name: 'Gregory Campos-Hohn', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Rayyan Mia', role: 'Mapping and Infrastructure Researcher' },
  { name: 'Ana Marelja', role: 'Property Outreach Coordinator' },
  { name: 'Aaryan Dave', role: 'Grants and Partnerships Coordinator' },
  { name: 'Leo McNamara', role: 'Community Engagement Director' },
  { name: 'Kyla Howe', role: 'Social Media Coordinator' },
]

export const headshotOf = (name: string) =>
  `/headshots/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
