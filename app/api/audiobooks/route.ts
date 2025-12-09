import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const id = searchParams.get('id');
    const limit = searchParams.get('limit') || '25';

    // LibriVox API
    const BASE_URL = 'https://librivox.org/api/feed/audiobooks';

    let targetUrl = `${BASE_URL}/?format=json&extended=1&limit=${limit}`;

    if (id) {
        targetUrl += `&id=${id}`;
    } else if (q) {
        targetUrl += `&title=${encodeURIComponent(q)}`;
    } else {
        // Default fetch (latest/popular isn't explicit, so we might just get latest by default or specify offsets)
        // LibriVox default sort is usually by release date.
    }

    try {
        const res = await fetch(targetUrl);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
