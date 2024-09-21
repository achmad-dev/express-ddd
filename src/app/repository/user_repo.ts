import { PrismaClient } from "@prisma/client";
import type { User } from "../domain/user";

interface baseUserRepo {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByName(name: string): Promise<User>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
}


export class UserRepo implements baseUserRepo {
  constructor(private prisma: PrismaClient) { }

  async findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByName(name: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        name,
      },
    });
  }

  async create(user: User): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  async update(user: User): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }
}
