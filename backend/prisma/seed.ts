import { PrismaClient } from '@prisma/client';
import { formations } from '../../frontend/src/helpers/data';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.formation.createMany({
    data: formations,
  });

  console.log(result);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
