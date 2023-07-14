import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data: {
  //     username: "Nat Chen",
  //     password: "123456",
  //     email: "chen_natalie@outlook.com",
  //     avatarUrl: "https://avatars.githubusercontent.com/u/23573469?v=4",
  //   },
  // });
  // await prisma.category.createMany({
  //   data: [{ name: "Frontend" }, { name: "Backend" }, { name: "Fullstack" }],
  // });
  await prisma.project.createMany({
    data: [
      {
        title: "frontend",
        description: "this is a frontend work",
        imageUrl:
          "https://res.cloudinary.com/dr0strejy/image/upload/v1689177498/mkvuj2koek1edwyizml6.png",
        websiteUrl: "https://www.natchen1.com",
        githubUrl: "https://www.natchen1.com",
        userId: "31d77e16-9f4d-4aaf-9240-ad9b5557e412",
        categoryId: "5ce14ac6-f631-4467-8fc8-f85ba8f57723",
      },
      {
        title: "backend",
        description: "this is a backend work",
        imageUrl:
          "https://res.cloudinary.com/dr0strejy/image/upload/v1683619197/qadjb0knwvina77acke6.png",
        websiteUrl: "https://www.natchen2.com",
        githubUrl: "https://www.natchen2.com",
        userId: "31d77e16-9f4d-4aaf-9240-ad9b5557e412",
        categoryId: "1bf6c6e0-9a70-4f05-b489-f8c79d18c04c",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
