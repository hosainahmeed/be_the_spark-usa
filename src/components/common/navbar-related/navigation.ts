export interface MenuItem {
    label: string;
    href: string;
    onPointerDown?: () => void;
    icons?: string;
  }
  
export const NON_USER_MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Find Your Events', href: '/find-your-events' },
    { label: 'List Your Events', href: '/list-events' },
    { label: 'Contact / Help', href: '/contact-us' },
];

export const LOGIN_USER_MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Browse Events', href: '/browse-events' },
    { label: 'Contact / Help', href: '/contact-us' },
];

export const ORGANIZER_MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'List Events', href: '/list-events-organizer' },
    { label: 'Contact / Help', href: '/contact-us' },
];

