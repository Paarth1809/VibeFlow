import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || 'chill';
    const per_page = searchParams.get('per_page') || '20';
    const key = process.env.NEXT_PUBLIC_PIXABAY_KEY;

    if (!key) return NextResponse.json({ error: 'Missing Pixabay key' }, { status: 500 });

    // Try Pixabay Audio API first
    const audioUrl = `https://pixabay.com/api/audio/?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&per_page=${per_page}`;

    try {
        const res = await fetch(audioUrl);
        if (res.ok) {
            const data = await res.json();
            return NextResponse.json(data);
        }

        console.warn(`Pixabay Audio API failed (${res.status}), falling back to Videos API.`);
    } catch (e) {
        console.warn("Pixabay Audio API network error, falling back to Videos API.", e);
    }

    // Fallback to Pixabay Videos API (category=music)
    // Note: Videos might not always have audio, but it's the best backup.
    const videoUrl = `https://pixabay.com/api/videos/?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&per_page=${per_page}&category=music`;

    try {
        const res = await fetch(videoUrl);
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Pixabay Video API failed: ${res.status} ${text}`);
        }
        const data = await res.json();
        // Transform video hits to mimic audio hits structure to simplify frontend
        const transformedHits = data.hits.map((hit: any) => ({
            ...hit,
            // Map video files to something we can try to play
            audio: hit.videos?.tiny?.url || hit.videos?.small?.url, // For compatibility
            url: hit.videos?.tiny?.url || hit.videos?.small?.url, // Standardize on 'url'
            image: hit.userImageURL // Use user image as fallback cover in frontend
        }));

        return NextResponse.json({ ...data, hits: transformedHits });
    } catch (err: any) {
        console.error("Pixabay Videos Route Exception:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
