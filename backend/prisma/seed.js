"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data_1 = require("../../frontend/src/helpers/data");
const prisma = new client_1.PrismaClient();
async function main() {
    const result = await prisma.formation.createMany({
        data: data_1.formations,
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
