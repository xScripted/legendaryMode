import { defineDb, defineTable, column } from 'astro:db'

const Lead = defineTable({
  columns: {
    name: column.text({ unique: true, required: true }),
    email: column.text({ unique: true, required: true }),
    phone: column.text({ unique: true, required: true }),
    message: column.text(),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Lead,
  },
})
