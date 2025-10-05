import { MenuItem } from "@/components/common/navbar-related/navigation";

export const NON_USER_MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Find Your Events', href: '/find-your-events' },
    { label: 'List Your Events', href: '/list-events' },
    { label: 'Contact / Help', href: '/contact-us' },
];

export const LOGIN_USER_MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Browse Events', href: '/find-your-events' },
    { label: 'Contact / Help', href: '/contact-us' },
];

export const ORGANIZER_MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Browse Events', href: '/find-your-events' },
    { label: 'Contact / Help', href: '/contact-us' },
];