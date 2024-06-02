import { db, Entertainment } from 'astro:db'

export async function GET() {
  const entertainment = await db.select().from(Entertainment)

  return new Response(JSON.stringify(entertainment))
}
