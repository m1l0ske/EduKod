import { db } from "../src/server/db";

async function main() {
  console.log("🌱 Seeding database...");

  // 🔹 Clear existing data (dev only)
  await db.question.deleteMany();
  await db.lessonBlock.deleteMany();
  await db.lesson.deleteMany();
  await db.user.deleteMany();
  await db.post.deleteMany();

  // 🔹 Create users
  const user1 = await db.user.create({
    data: {
      username: "nikola",
      password: "hashed_password_here", // replace with real hash if needed
      mail: "nikola@mail.com",
      completed: [],
      image: null,
    },
  });

  const user2 = await db.user.create({
    data: {
      username: "ana",
      password: "hashed_password_here",
      mail: "ana@mail.com",
      completed: [],
      image: null,
    },
  });

  // 🔹 Create a lesson with blocks
  const lesson1 = await db.lesson.create({
    data: {
      title: "Introduction to JavaScript",
      thumbnail: "/thumbnails/js-intro.png",
      blocks: {
        create: [
          {
            order: 1,
            type: "TEXT",
            text: "JavaScript is a versatile programming language used mainly for web development.",
          },
          {
            order: 2,
            type: "IMAGE",
            imageUrl: "/images/js-logo.png",
          },
          {
            order: 3,
            type: "VIDEO",
            videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
          },
          {
            order: 4,
            type: "ANIMATION",
            animation: { type: "basic-syntax", duration: 2000 },
          },
        ],
      },
      questions: {
        create: [
          {
            question: "What is JavaScript mainly used for?",
            answer: "Web development",
          },
          {
            question: "Which company developed JavaScript?",
            answer: "Netscape",
          },
        ],
      },
    },
    include: {
      blocks: true,
      questions: true,
    },
  });

  // 🔹 Optionally, create more lessons
  const lesson2 = await db.lesson.create({
    data: {
      title: "Variables in JavaScript",
      thumbnail: "/thumbnails/js-vars.png",
      blocks: {
        create: [
          {
            order: 1,
            type: "TEXT",
            text: "Variables store values in memory. Use let, const, or var.",
          },
          {
            order: 2,
            type: "IMAGE",
            imageUrl: "/images/variables.png",
          },
        ],
      },
      questions: {
        create: [
          {
            question: "Name the three ways to declare a variable in JS?",
            answer: "let, const, var",
          },
        ],
      },
    },
    include: {
      blocks: true,
      questions: true,
    },
  });
  console.log("✅ Database seeded successfully!");
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await db.$disconnect();
    process.exit(1);
  });
