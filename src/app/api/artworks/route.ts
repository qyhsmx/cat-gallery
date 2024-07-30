import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { sql } from '@vercel/postgres';

export async function GET() {

  const { rows } = await sql`
    SELECT a.*, json_agg(json_build_object('id', m.id, 'type', m.type, 'url', m.url)) as media
    FROM artworks a
    LEFT JOIN media m ON a.id = m.artwork_id
    GROUP BY a.id
  `;

  return NextResponse.json(rows);
}

async function saveFile(file: File): Promise<string> {
  const data = await file.arrayBuffer();
  const buffer = Buffer.from(data);
  const filename = file.name.replace(/\s/g, '-');
  const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const artist = formData.get('artist') as string;
  const description = formData.get('description') as string;
  const mediaFiles = formData.getAll('media') as File[];

  try {
    const { rows: [artwork] } = await sql`
      INSERT INTO artworks (title, artist, description)
      VALUES (${title}, ${artist}, ${description})
      RETURNING *
    `;

    for (const file of mediaFiles) {
      const url = await saveFile(file);
      const fileExtension = path.extname(file.name).toLowerCase();
      const isVideo = ['.mp4', '.webm', '.ogg'].includes(fileExtension);

      await sql`
        INSERT INTO media (type, url, artwork_id)
        VALUES (${isVideo ? 'video' : 'image'}, ${url}, ${artwork.id})
      `;
    }

    return NextResponse.json(artwork, { status: 201 });
  } catch (error) {
    console.error('Error creating artwork:', error);
    return NextResponse.json({ error: 'Error creating artwork' }, { status: 500 });
  }
}