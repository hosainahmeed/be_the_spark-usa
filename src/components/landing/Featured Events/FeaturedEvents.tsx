import React from 'react';
import FeaturedEventsCard from './FeaturedEventsCard';
import SectionTitleFormal from '@/components/component-layout/SectionTitleFormal';
import { ArrowUpRight } from 'lucide-react';
import { useGetEventsQuery } from '@/app/redux/service/eventApis';
import { EventDetails } from '@/types/event';

export interface CAMP_DATA {
    id: number;
    title: string;
    location: string;
    dateRange: string;
    ages: string;
    rating: number;
    reviewCount: number;
    sport: string;
    photoUrl: string;
    status: 'registration-open' | 'started-event' | 'finished-event';
    registrationDeadline: string;
    availableSlot: number;
    eventType: string;
    eventStart: string;
    price: number;
    organizer: {
        name: string;
        rating: number;
        reviewCount: number;
        avatarUrl: string;
    };
    contactEmail: string;
    contactPhone: string;
    eventDetails: string,
    isMyFeedbackGiven: boolean,
    feedbackData?: FeedbackData | null
}

export interface FeedbackData {
    profilePhotoUrl: string;
    name: string;
    rating: number;
}

export const CAMP_DATA: CAMP_DATA[] = [
    {
        id: 1,
        title: "Summer Soccer Camp 2025",
        location: "New York, USA",
        dateRange: "June 15-17, 2025",
        ages: "10-14",
        rating: 4.9,
        reviewCount: 24,
        sport: "Soccer",
        photoUrl: "https://i.ibb.co.com/PZN7Lq13/8cdf4a01753ac5dcd0ec91ad19d3665448a437b7.png",
        status: "registration-open",
        registrationDeadline: "June 10, 2025 8:00 am",
        availableSlot: 100,
        eventType: "Tournament",
        eventStart: "June 15, 2025 9:00 am",
        price: 19.00,
        organizer: {
            name: "Youth Sport Club",
            rating: 4.9,
            reviewCount: 24,
            avatarUrl: "https://avatar.iran.liara.run/public/15",
        },
        contactEmail: "info@youthsportclub.com",
        contactPhone: "+1 (963) 123-4567",
        isMyFeedbackGiven: true,
        feedbackData: {
            profilePhotoUrl: 'https://avatar.iran.liara.run/public/15',
            name: 'John Doe',
            rating: 5
        },
        eventDetails: `
        <html>
<body>
<!--StartFragment--><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 24px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Event Details</h2><ul class="list-disc pl-6 space-y-2 text-gray-700" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(27.1134 -0.956401 -12.3224);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">3-day basketball camp focused on shooting, defense, and game IQ.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">Led by former college players and certified coaches.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill contests with awards and recognition.</li></ul></div><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Schedule</h2><div class="space-y-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);"><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 1 – July 20</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Warm-up &amp; Conditioning</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Shooting Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">3v3 Games</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 2 – July 21</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Defense Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Ball Handling</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Team Strategies</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 3 – July 22</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Full Court Games</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill Contest Finals</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Awards Ceremony</li></ul></div></div></div><!--EndFragment-->
</body>
</html>
        `,
    },
    {
        id: 2,
        title: "Basketball Skills Camp 2025",
        location: "Los Angeles, USA",
        dateRange: "July 20-22, 2025",
        ages: "12-16",
        rating: 4.7,
        reviewCount: 18,
        sport: "Basketball",
        photoUrl: "https://i.ibb.co.com/PGTbr1xQ/cdb0cbd28f4d652b06cacf43557c76749ca38023.png",
        status: "started-event",
        registrationDeadline: "July 15, 2025 8:00 am",
        availableSlot: 80,
        eventType: "Training Camp",
        eventStart: "July 20, 2025 9:30 am",
        price: 25.00,
        organizer: {
            name: "Elite Hoops Academy",
            rating: 4.7,
            reviewCount: 18,
            avatarUrl: "https://avatar.iran.liara.run/public/15"
        },
        contactEmail: "contact@elitehoops.com",
        contactPhone: "+1 (310) 555-7821",
        isMyFeedbackGiven: true,
        feedbackData: {
            profilePhotoUrl: 'https://avatar.iran.liara.run/public/15',
            name: 'John Doe',
            rating: 4
        },
        eventDetails: `
        <html>
<body>
<!--StartFragment--><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 24px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Event Details</h2><ul class="list-disc pl-6 space-y-2 text-gray-700" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(27.1134 -0.956401 -12.3224);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">3-day basketball camp focused on shooting, defense, and game IQ.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">Led by former college players and certified coaches.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill contests with awards and recognition.</li></ul></div><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Schedule</h2><div class="space-y-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);"><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 1 – July 20</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Warm-up &amp; Conditioning</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Shooting Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">3v3 Games</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 2 – July 21</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Defense Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Ball Handling</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Team Strategies</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 3 – July 22</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Full Court Games</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill Contest Finals</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Awards Ceremony</li></ul></div></div></div><!--EndFragment-->
</body>
</html>
        `,
    },
    {
        id: 3,
        title: "Tennis Academy Camp 2025",
        location: "Miami, USA",
        dateRange: "August 5-7, 2025",
        ages: "8-14",
        rating: 4.8,
        reviewCount: 32,
        sport: "Tennis",
        photoUrl: "https://i.ibb.co.com/DgLWmZcY/b827575f043289944139bd0b82b4f0b512e4a0d0.png",
        status: "registration-open",
        registrationDeadline: "August 1, 2025 8:00 am",
        availableSlot: 60,
        eventType: "Training Camp",
        eventStart: "August 5, 2025 8:30 am",
        price: 30.00,
        organizer: {
            name: "Miami Tennis Club",
            rating: 4.8,
            reviewCount: 32,
            avatarUrl: "https://avatar.iran.liara.run/public/15"
        },
        contactEmail: "info@miamitennisclub.com",
        contactPhone: "+1 (786) 555-9087",
        isMyFeedbackGiven: false,
        feedbackData: null,
        eventDetails: `
        <html>
<body>
<!--StartFragment--><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 24px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Event Details</h2><ul class="list-disc pl-6 space-y-2 text-gray-700" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(27.1134 -0.956401 -12.3224);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">3-day basketball camp focused on shooting, defense, and game IQ.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">Led by former college players and certified coaches.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill contests with awards and recognition.</li></ul></div><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Schedule</h2><div class="space-y-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);"><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 1 – July 20</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Warm-up &amp; Conditioning</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Shooting Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">3v3 Games</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 2 – July 21</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Defense Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Ball Handling</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Team Strategies</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 3 – July 22</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Full Court Games</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill Contest Finals</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Awards Ceremony</li></ul></div></div></div><!--EndFragment-->
</body>
</html>
        `,

    },
    {
        id: 4,
        title: "Tennis Academy Camp 2025",
        location: "Miami, USA",
        dateRange: "August 5-7, 2025",
        ages: "8-14",
        rating: 4.8,
        reviewCount: 32,
        sport: "Tennis",
        photoUrl: "https://i.ibb.co.com/DgLWmZcY/b827575f043289944139bd0b82b4f0b512e4a0d0.png",
        status: "finished-event",
        registrationDeadline: "August 1, 2025 8:00 am",
        availableSlot: 0,
        eventType: "Training Camp",
        eventStart: "August 5, 2025 8:30 am",
        price: 30.00,
        organizer: {
            name: "Miami Tennis Club",
            rating: 4.8,
            reviewCount: 32,
            avatarUrl: "https://avatar.iran.liara.run/public/15"
        },
        contactEmail: "info@miamitennisclub.com",
        contactPhone: "+1 (786) 555-9087",
        isMyFeedbackGiven: false,
        eventDetails: `
        <html>
<body>
<!--StartFragment--><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 24px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Event Details</h2><ul class="list-disc pl-6 space-y-2 text-gray-700" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(27.1134 -0.956401 -12.3224);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">3-day basketball camp focused on shooting, defense, and game IQ.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">Led by former college players and certified coaches.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill contests with awards and recognition.</li></ul></div><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Schedule</h2><div class="space-y-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);"><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 1 – July 20</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Warm-up &amp; Conditioning</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Shooting Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">3v3 Games</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 2 – July 21</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Defense Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Ball Handling</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Team Strategies</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 3 – July 22</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Full Court Games</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill Contest Finals</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Awards Ceremony</li></ul></div></div></div><!--EndFragment-->
</body>
</html>
        `,
    }
];


const FeaturedEvents = () => {
    const { data, isLoading } = useGetEventsQuery({limit:4})
    console.log(data)
    return (
        <div className="container  mx-auto p-4 sm:p-6 lg:p-8">
            <SectionTitleFormal
                title="Featured Events"
                description="Events promoted by coaches & organizations to reach more families."
                button={true}
                buttonText="Explore All Events"
                icon={<ArrowUpRight className="w-6 h-6" />}
                buttonClassName='bg-[var(--blue)] text-white'
                className='my-12'
                routes='/browse-events'
            />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {data?.data?.result.map((event:EventDetails) => (
                    <FeaturedEventsCard key={event?._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedEvents;