import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) return NextResponse.json({ error: 'Missing Feed URL' }, { status: 400 });

    try {
        const feed = await parser.parseURL(url);
        // Get newest episode
        const latest = feed.items[0];

        if (latest && latest.enclosure && latest.enclosure.url) {
            return NextResponse.json({
                title: latest.title,
                audio: latest.enclosure.url,
                description: latest.contentSnippet
            });
        }

        return NextResponse.json({ error: 'No audio found in feed' }, { status: 404 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
