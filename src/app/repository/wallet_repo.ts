import type { Wallet } from "../domain/wallet";
import { PrismaClient } from "@prisma/client";

interface baseWalletRepo {
  findById(id: string): Promise<Wallet>;
  findByUserId(userId: string): Promise<Wallet>;
  create(userId: string, balance: number): Promise<Wallet>;
  update(userId: string, balance: number): Promise<Wallet>;
}


export class WalletRepo implements baseWalletRepo {
  constructor(private prisma: PrismaClient) { }

  async findById(id: string): Promise<Wallet> {
    return this.prisma.wallet.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUserId(userId: string): Promise<Wallet> {
    return this.prisma.wallet.findUnique({
      where: {
        userId,
      },
    });
  }

  async create(userId: string, balance: number): Promise<Wallet> {
    return this.prisma.wallet.create({
      data: {
        userId,
        balance,
      },
    });
  }

  async update(userId: string, balance: number): Promise<Wallet> {
    return this.prisma.wallet.update({
      where: {
        userId,
      },
      data: {
        balance,
      },
    });
  }
} 
