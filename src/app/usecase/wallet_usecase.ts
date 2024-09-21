import { WalletRepo } from "../repository/wallet_repo";
import type { Wallet } from "../domain/wallet";

interface baseWalletUsecase {
  findById(id: string): Promise<Wallet>;
  findByUserId(userId: string): Promise<Wallet>;
  Update(userId: string, balance: number): Promise<Wallet>;
}

export class WalletUsecase implements baseWalletUsecase {
  constructor(private walletRepo: WalletRepo) { }

  async findById(id: string): Promise<Wallet> {
    return this.walletRepo.findById(id);
  }

  async findByUserId(userId: string): Promise<Wallet> {
    return this.walletRepo.findByUserId(userId);
  }

  async Update(userId: string, balance: number): Promise<Wallet> {
    return this.walletRepo.update(userId, balance);
  }
}
