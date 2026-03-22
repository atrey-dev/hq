// PostHog Analytics Initialization
// This file is automatically loaded by Next.js 15.3+ for client-side instrumentation
import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // Enable debug mode in development
    loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    // Capture pageviews automatically
    capture_pageview: true,
    // Capture page leaves for session recording
    capture_pageleave: true,
})

export default posthog
