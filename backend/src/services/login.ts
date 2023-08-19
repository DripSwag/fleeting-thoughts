import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export function getUser(username: String, password: String) {
  let temp = Promise.reject("bad");
  return temp;
}
