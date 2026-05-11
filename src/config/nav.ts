import {
  Home,
  Coins,
  BookOpen,
  Wrench,
  Bot,
  ListChecks,
  Music,
  MessageSquare,
  Brain,
  Compass,
  Heart,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  to: string
  icon: LucideIcon
  label: string
}

export interface NavSection {
  label: string
  items: NavItem[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Main',
    items: [
      { to: '/dashboard', icon: Home,       label: 'Home' },
      { to: '/earn',      icon: Coins,      label: 'Earn' },
      { to: '/guides',    icon: BookOpen,   label: 'Guides' },
      { to: '/tools',     icon: Wrench,     label: 'Tools' },
    ],
  },
  {
    label: 'Explore',
    items: [
      { to: '/saved',          icon: Heart,      label: 'Favorites' },
      { to: '/passion-finder', icon: Compass,    label: 'Passion Finder' },
      { to: '/beginner-list',  icon: ListChecks, label: 'Beginner List' },
      { to: '/ai-playground',  icon: Bot,        label: 'Prompt Vault' },
      { to: '/adhd-hacks',     icon: Brain,      label: 'ADHD Hacks' },
      { to: '/playlist',       icon: Music,      label: 'Focus Music' },
    ],
  },
  {
    label: 'Other',
    items: [
      { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
    ],
  },
]
