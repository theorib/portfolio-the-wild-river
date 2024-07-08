import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// eslint-disable-next-line no-undef
const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;
