import { WalletUsecase } from "../../usecase/wallet_usecase";
import type { Response } from "../../../shared/domain/response";
import type { Request, Response as ExpressResponse } from "express";

interface baseWalletHandler {
  addMoney(req: Request, res: ExpressResponse): Promise<Response>;
  withdrawMoney(req: Request, res: ExpressResponse): Promise<Response>;
}

export class WalletHandler implements baseWalletHandler {
  constructor(private walletUsecase: WalletUsecase) { }

  async addMoney(req: Request, res: ExpressResponse): Promise<Response> {
    const { userId, balance } = req.body;
    try {
      const wallet = await this.walletUsecase.Update(userId, Math.abs(balance));
      return {
        status: 200,
        success: true,
        data: wallet,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: "Server error",
      };
    }
  }

  async withdrawMoney(req: Request, res: ExpressResponse): Promise<Response> {
    const { userId, balance } = req.body;
    try {
      const wallet = await this.walletUsecase.Update(userId, -Math.abs(balance));
      return {
        status: 200,
        success: true,
        data: wallet,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: "Server error",
      };
    }
  }
}
