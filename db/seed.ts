import { db, Entertainment, Tasks } from 'astro:db'

const taskData = [
  { name: 'Laia', title: 'Buy Groceries', done: false, date: '2024-06-02' },
  { name: 'Miquel', title: 'Complete Project', done: true, date: '2024-06-01' },
  { name: 'Laia', title: 'Gym Workout', done: true, date: '2024-06-02' },
  { name: 'Miquel', title: 'Read Book', done: false, date: '2024-06-03' },
  { name: 'Laia', title: 'Prepare Presentation', done: false, date: '2024-06-04' },
]

const entertainmentData = [
  {
    name: 'Movie Night',
    img: 'movie.jpg',
    title: 'Inception',
    desc: 'A mind-bending thriller by Christopher Nolan.',
    duration: '2h 28m',
    link: 'https://example.com/inception',
    laia: true,
    miquel: true,
  },
  {
    name: 'Game Night',
    img: 'game.jpg',
    title: 'Catan',
    desc: 'A popular strategy board game.',
    duration: '1h 30m',
    link: 'https://example.com/catan',
    laia: true,
    miquel: false,
  },
  {
    name: 'Concert',
    img: 'concert.jpg',
    title: 'Coldplay Live',
    desc: 'Live concert by Coldplay.',
    duration: '2h',
    link: 'https://example.com/coldplay',
    laia: false,
    miquel: true,
  },
  {
    name: 'Cooking Class',
    img: 'cooking.jpg',
    title: 'Italian Cuisine',
    desc: 'Learn to cook Italian dishes.',
    duration: '3h',
    link: 'https://example.com/italian-cuisine',
    laia: true,
    miquel: true,
  },
  {
    name: 'Reading',
    img: 'reading.jpg',
    title: 'The Great Gatsby',
    desc: 'A classic novel by F. Scott Fitzgerald.',
    duration: '4h',
    link: 'https://example.com/great-gatsby',
    laia: false,
    miquel: true,
  },
]

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Entertainment).values(entertainmentData)
  await db.insert(Tasks).values(taskData)
}
