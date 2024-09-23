import { PrismaClient } from "@prisma/client";
import type { User } from "../domain/user";

interface baseUserRepo {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
}


export class UserRepo implements baseUserRepo {
  constructor(private prisma: PrismaClient) { }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
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
