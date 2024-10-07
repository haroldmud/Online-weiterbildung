import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const formation1 = await prisma.formation.create({
    data: {
      title:
        'MINDSET: Learn to have the necessary mindset to succeed in life in just 30 days',
      description:
        'This course will help you understand how an entrepreneur thinks, discover yourself and the type of leader you want to be, and learn more about the world of entrepreneurship. 📈',
      price: 149.99,
      wholesalePrice: 0,
      image: 'image1.jpg',
    },
  });

  const formation2 = await prisma.formation.create({
    data: {
      title:
        'MINDSET: Learn to have the necessary mindset to succeed in life in just 30 days.',
      description:
        'This course will help you understand how an entrepreneur thinks, discover yourself and the type of leader you want to be, and learn more about the world of entrepreneurship. 📈',
      price: 149.99,
      wholesalePrice: 0,
      image: 'image1.jpg',
    },
  });
  console.log(formation1, formation2);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
