import { CatInfo } from "@/types/catInfo";
import { sql } from "@vercel/postgres";

export const catInfos: CatInfo[] = [
    {
        id: '1',
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
        const catInfos = await sql<CatInfo>`
          SELECT
            cat_info.id,
            cat_info.name,
            cat_info.price,
            cat_info.age,
            cat_info.category,
            cat_info.description
          FROM cat_info
        `;
        return catInfos.rows;
    } catch (error) {
        console.error('Database Error:', error);
        return catInfos
    }
}

export async function queryCatInfoById(id: string): Promise<CatInfo | undefined> {
    return catInfos.find(c => c.id === id);
}