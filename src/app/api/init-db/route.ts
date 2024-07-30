import { NextResponse } from 'next/server';
import { createTables } from '../../../lib/db';

export async function POST() {
  try {
    await createTables();
    return NextResponse.json({ message: 'Database initialized successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}