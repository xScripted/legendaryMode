import { db, Tasks } from 'astro:db'

export async function GET() {
  const tasks = await db.select().from(Tasks)

  return new Response(JSON.stringify(tasks))
}
