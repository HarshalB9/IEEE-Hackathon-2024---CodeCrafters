import pkg from '@prisma/client';
const { PrismaClient ,DateTime  } = pkg;
const prisma = new PrismaClient()
export default prisma;