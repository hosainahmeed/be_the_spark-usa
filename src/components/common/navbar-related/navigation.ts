export interface MenuItem {
    label: string;
    href: string;
    onClick?: () => void;
    icons?: string;
  }
  
export const NON_USER_MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Find Your Events', href: '/events' },
    { label: 'List Your Events', href: '/list-events' },
    { label: 'Contact / Help', href: '/contact' },
];

export const LOGIN_USER_MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Browse Events', href: '/events' },
    { label: 'Contact / Help', href: '/contact' },
];

export const ORGANIZER_MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Browse Events', href: '/events' },
    { label: 'Contact / Help', href: '/contact' },
];