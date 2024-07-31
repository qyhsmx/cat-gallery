import { CatInfo } from "@/types/catInfo";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";

export const catInfos: CatInfo[] = [
    {
        id: 'c25c0d55-0f2a-46bd-834d-dace767980c7',
        name: '小粉',
        price: 1500,
        age: 15,
        category: '银点',
        description: '一个安静的小美猫',
        medias: [{ type: 'image', url: '/images/微信图片_20240414145458.jpg' }, { type: 'image', url: '/images/微信图片_20240414145432.jpg' }],
    },
];

export async function queryAllCats(): Promise<CatInfo[]> {
    try {
        const { rows } = await sql<CatInfo[]>`
        SELECT c.*, json_agg(json_build_object('type', m.type, 'url', m.url)) as medias
        FROM cat_info c
        LEFT JOIN media_items m ON c.id = m.cat_id
        GROUP BY c.id
      `;
        if (rows.length === 0) {
            return catInfos;
        }
        return rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        return catInfos
    }
}

export async function queryCatInfoById(id: string): Promise<CatInfo | undefined> {
    try {
        const { rows } = await sql<CatInfo>`
        SELECT c.*, json_agg(json_build_object('type', m.type, 'url', m.url)) as medias
        FROM cat_info c
        LEFT JOIN media_items m ON c.id = m.cat_id
        WHERE c.id = ${id}
        GROUP BY c.id
      `;
        if (rows.length === 0) {
            return catInfos.find(c => c.id === id);
        }
        return rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        return catInfos.find(c => c.id === id);
    }
}