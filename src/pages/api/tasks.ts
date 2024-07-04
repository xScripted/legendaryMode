import { db, eq, Tasks } from 'astro:db'

export async function GET() {
  const tasks = await db.select().from(Tasks)

  return new Response(JSON.stringify(tasks))
}

export async function POST({ request }) {
//13 buscar fila que quiero cambiar (id)

  const id = await request.json()
  const tasks = await db.select().from(Tasks).where(eq(Tasks._id, id))

  await db.update(Tasks).set({ done: !tasks.done }).where(eq(Tasks._id, id))

  return new Response(JSON.stringify( !tasks.done ))
}
