export const MAIN_NAV = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Projects',
    icon: 'projects',
    badge: 24,
    submenu: [
      { label: 'Project List', href: '/dashboard/projects' },
      { label: 'Project Categories', href: '/dashboard/project-categories' },
      { label: 'Add New Project', href: '/dashboard/projects/new' },
    ],
  },
  {
    label: 'Our Team',
    icon: 'team',
    submenu: [
      { label: 'Team List', href: '/dashboard/team' },
      { label: 'Add Team Member', href: '/dashboard/team/new' },
    ],
  },
  {
    label: 'Appointments',
    icon: 'appointments',
    badge: 6,
    submenu: [
      { label: 'Appointment List', href: '/dashboard/appointments' },
      { label: 'Calendar View', href: '/dashboard/appointments/calendar' },
      { label: 'Manage Calendar', href: '/dashboard/appointments/manage' },
      { label: 'Approval Requests', href: '/dashboard/appointments/approvals' },
    ],
  },
  {
    label: 'Messages',
    icon: 'messages',
    badge: 12,
    submenu: [
      { label: 'Contact Form Entries', href: '/dashboard/messages' },
      { label: 'Edit Contact Details', href: '/dashboard/messages/settings' },
    ],
  },
  {
    label: 'Blog',
    icon: 'blog',
    submenu: [
      { label: 'Blog Posts', href: '/dashboard/blog' },
      { label: 'Blog Categories', href: '/dashboard/blog-categories' },
      { label: 'Add New Post', href: '/dashboard/blog/new' },
    ],
  },
  {
    label: 'Media Library',
    href: '/dashboard/media',
    icon: 'media',
  },
];

export const CAREERS_NAV = [
  {
    label: 'Vacancies',
    icon: 'vacancies',
    badge: 4,
    submenu: [
      { label: 'Vacancy List', href: '/dashboard/vacancies' },
      { label: 'Add New Vacancy', href: '/dashboard/vacancies/new' },
    ],
  },
  {
    label: 'Job Applications',
    href: '/dashboard/job-applications',
    icon: 'applications',
    badge: 18,
  },
];

export const SYSTEM_NAV = [
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: 'analytics',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
  },
];
