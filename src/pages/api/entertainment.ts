import { db, eq, Entertainment } from 'astro:db'

export async function GET() {
  const entertainment = await db.select().from(Entertainment)

  return new Response(JSON.stringify(entertainment))
}

export async function POST({ request }) {
  const data = await request.json()

  const item = await db.select().from(Entertainment).where(eq(Entertainment.title, data.title))

  const miquel = data.person === 'miquel' ? !item[0].miquel : item[0].miquel
  const laia = data.person === 'laia' ? !item[0].laia : item[0].laia

  await db.update(Entertainment).set({ laia, miquel }).where(eq(Entertainment.title, data.title))

  return new Response(JSON.stringify(data.person === 'laia' ? laia : miquel))
}
