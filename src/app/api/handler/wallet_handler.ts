import { WalletUsecase } from "../../service/wallet_service";
import { response } from "../../../shared/domain/response";
import type { Request, Response as ExpressResponse } from "express";
import { z } from "zod";
import { logger } from "../../../shared/util/logger";

interface baseWalletHandler {
  addMoney(req: Request, res: ExpressResponse): Promise<ExpressResponse>;
  withdrawMoney(req: Request, res: ExpressResponse): Promise<ExpressResponse>;
}

export class WalletHandler implements baseWalletHandler {
  constructor(private walletUsecase: WalletUsecase) { }

  async addMoney(req: Request, res: ExpressResponse): Promise<ExpressResponse> {
    const { balance, requestId } = req.body;
    const schema = z.object({
      balance: z.number().min(0),
    });
    logger.info(`Add money requestId: ${requestId}`);
    try {
      const data = schema.parse({ balance });
      await this.walletUsecase.Update(req.userId, data.balance);
      return response(res, { status: 200, success: true, message: "Money added successfully" });
    } catch (error) {
      return response(res, { status: 500, success: false, message: "Server error" });
    }
  }

  async withdrawMoney(req: Request, res: ExpressResponse): Promise<ExpressResponse> {
    const { balance, requestId } = req.body;
    const schema = z.object({
      balance: z.number().min(0),
    });
    logger.info(`Withdraw money requestId: ${requestId}`);
    try {
      const data = schema.parse({ balance });
      await this.walletUsecase.Update(req.userId, -Math.abs(data.balance));
      return response(res, { status: 200, success: true, message: "Money withdrawn successfully" });
    } catch (error) {
      return response(res, { status: 500, success: false, message: "Server error" });
    }
  }

  async getBalance(req: Request, res: ExpressResponse): Promise<ExpressResponse> {
    const { requestId } = req.query;
    logger.info(`Get balance requestId: ${requestId}`);
    try {
      const wallet = await this.walletUsecase.findByUserId(req.userId);
      return response(res, {
        status: 200, success: true, message: "Balance retrieved successfully", data: {
          balance: wallet.balance
        }
      });
    } catch (error) {
      return response(res, { status: 500, success: false, message: "Server error" });
    }
  }
}
