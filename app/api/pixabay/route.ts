import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || 'lofi';
  const per_page = searchParams.get('per_page') || '20';
  const key = process.env.NEXT_PUBLIC_PIXABAY_KEY;
  if (!key) return NextResponse.json({ error: 'Missing Pixabay key' }, { status: 500 });

  const url = `https://pixabay.com/api/?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&per_page=${per_page}&image_type=photo`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
