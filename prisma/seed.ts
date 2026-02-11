import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const course = await prisma.course.upsert({
    where: { slug: 'demo-course-structure' },
    update: {},
    create: {
      title: 'Demo Course Structure',
      description: 'This is a demo course for testing structure.',
      fileKey: 'demo-key',
      price: 100,
      duration: 10,
      level: 'beginner',
      category: 'Development',
      smallDescription: 'Demo course for structure testing',
      slug: 'demo-course-structure',
      status: 'draft',
      chapter: {
        create: [
          {
            title: 'Chapter 1',
            position: 1,
            lessons: {
              create: [
                { title: 'Lesson 1', position: 1 },
                { title: 'Lesson 2', position: 2 },
                { title: 'Lesson 3', position: 3 },
              ]
            }
          },
          {
            title: 'Chapter 2',
            position: 2,
            lessons: {
              create: [
                { title: 'Lesson 1', position: 1 },
                { title: 'Lesson 2', position: 2 },
                { title: 'Lesson 3', position: 3 },
              ]
            }
          },
          {
            title: 'Chapter 3',
            position: 3,
            lessons: {
              create: [
                { title: 'Lesson 1', position: 1 },
                { title: 'Lesson 2', position: 2 },
                { title: 'Lesson 3', position: 3 },
              ]
            }
          }
        ]
      }
    },
  })
  console.log({ course })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
