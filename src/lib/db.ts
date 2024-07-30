import { sql } from '@vercel/postgres';

export async function tableExists(tableName: string): Promise<boolean> {
  const { rows } = await sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name = ${tableName}
    );
  `;
  return rows[0].exists;
}

export async function createTables() {
  const artworksExists = await tableExists('artworks');
  const mediaExists = await tableExists('media');

  if (!artworksExists) {
    await sql`
      CREATE TABLE artworks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  }

  if (!mediaExists) {
    await sql`
      CREATE TABLE media (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        url TEXT NOT NULL,
        artwork_id INTEGER REFERENCES artworks(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  }
}

export { sql };