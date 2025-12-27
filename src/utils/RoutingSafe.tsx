'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

type JwtPayload = {
    role: 'user' | 'organizer'
}

const publicRoutes = [
    '/',
    '/find-your-events',
    '/about-us',
    '/faq',
    '/list-events',
    '/sign-in',
    '/sign-up',
    '/forget-password-otp',
    '/forgot-password',
    '/one-time-pass',
    '/set-new-password',
    '/subscription-purchase',
    '/verify-your-email',
    '/privacy',
    '/terms',
    '/contact-us',
    '/choose-role',
    '/popular-sports'
]

const userRoutes = [
    '/my-profile',
    '/my-shortlisted-events',
    '/browse-events'
]

const organizerRoutes = [
    '/list-events-organizer',
    '/my-events',
    '/my-profile-organizer',
]

const RoutingSafe = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [isAllowed, setIsAllowed] = useState(false)

    useEffect(() => {
        const token = Cookies.get('accessTokenForPlayFinder')
        const isPublicRoute = publicRoutes.includes(pathname)


        if (!token) {
            if (!isPublicRoute) {
                router.replace('/sign-in')
            } else {
                setIsAllowed(true)
            }
            return
        }


        let decoded: JwtPayload
        try {
            decoded = jwtDecode<JwtPayload>(token)
        } catch (error) {
            Cookies.remove('accessTokenForPlayFinder')
            router.replace('/sign-in')
            return
        }

        const role = decoded.role


        if (role === 'user' && organizerRoutes.includes(pathname)) {
            router.replace('/browse-events')
            return
        }


        if (role === 'organizer' && userRoutes.includes(pathname)) {
            router.replace('/list-events-organizer')
            return
        }

        setIsAllowed(true)
    }, [pathname, router])


    if (!isAllowed) return null

    return <>{children}</>
}

export default RoutingSafe
