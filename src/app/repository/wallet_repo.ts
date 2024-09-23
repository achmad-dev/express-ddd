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
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        id,
      },
    });
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    return wallet;
  }

  async findByUserId(userId: string): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        userId,
      },
    });
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    return wallet;
  }

  async create(userId: string, balance: number): Promise<Wallet> {
    return this.prisma.wallet.create({
      data: {
        userId,
        balance,
      },
    });
  }

  // async update to use transaction for withdrawal or deposit
  async update(userId: string, balanceChange: number): Promise<Wallet> {
    return this.prisma.$transaction(async (prisma) => {

      const wallet = await prisma.wallet.findUnique({
        where: {
          userId,
        },
      });

      if (!wallet) {
        throw new Error("Wallet not found");
      }

      const currentBalance = wallet.balance;

      if (balanceChange < 0) {
        if (currentBalance === 0) {
          throw new Error("Cannot withdraw from a wallet with zero balance");
        } else if (currentBalance + balanceChange < 0) {
          throw new Error("Insufficient balance for withdrawal");
        }
      }

      return prisma.wallet.update({
        where: {
          userId,
        },
        data: {
          balance: currentBalance + balanceChange,
        },
      });
    });
  }
} 
