import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const id = searchParams.get('id'); // For lookup

    // iTunes Search API (Standard, reliable, free)
    // We use this because it returns RSS feed URLs which we can parse or use directly.
    const ITUNES_API = 'https://itunes.apple.com';

    try {
        if (id) {
            // Lookup by Collection ID (Podcast ID)
            const res = await fetch(`${ITUNES_API}/lookup?id=${id}&entity=podcast`);
            const data = await res.json();
            return NextResponse.json(data);
        }

        if (q) {
            // Search
            const res = await fetch(`${ITUNES_API}/search?media=podcast&term=${encodeURIComponent(q)}&limit=25`);
            const data = await res.json();
            return NextResponse.json(data);
        }

        // Default: Top Podcasts (using rss generator or just a generic search for "popular")
        // iTunes doesn't have a simple "trending" endpoint without scraping, so we search for "news" or "comedy" as default filler
        const res = await fetch(`${ITUNES_API}/search?media=podcast&term=podcast&limit=25`);
        const data = await res.json();
        return NextResponse.json(data);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
