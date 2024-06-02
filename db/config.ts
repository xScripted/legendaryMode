import { defineDb, defineTable, column } from 'astro:db'

const Tasks = defineTable({
  columns: {
    name: column.text(),
    title: column.text(),
    done: column.boolean(),
    date: column.text(),
  },
})

const Entertainment = defineTable({
  columns: {
    name: column.text(),
    img: column.text(),
    title: column.text(),
    desc: column.text(),
    duration: column.text(),
    link: column.text(),
    laia: column.boolean(),
    miquel: column.boolean(),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Tasks,
    Entertainment,
  },
})
