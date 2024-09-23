import { Router } from "express";
import { UserHandler } from "../handler/user_handler";
import { WalletHandler } from "../handler/wallet_handler";
import { UserRepo } from "../../repository/user_repo";
import { WalletRepo } from "../../repository/wallet_repo";
import { UserUsecase } from "../../service/user_service";
import { WalletUsecase } from "../../service/wallet_service";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/middleware";

export const initRoute = (router: Router) => {
  const client = new PrismaClient();
  const userRepo = new UserRepo(client);
  const walletRepo = new WalletRepo(client);
  const userUsecase = new UserUsecase(userRepo, walletRepo);
  const walletUsecase = new WalletUsecase(walletRepo);
  const userHandler = new UserHandler(userUsecase);
  const walletHandler = new WalletHandler(walletUsecase);

  router.post("/user/signup", (req, res) => userHandler.signUp(req, res));

  router.post("/user/signin", (req, res) => userHandler.signIn(req, res));

  router.post("/wallet/addMoney", authMiddleware(userUsecase), (req, res) => walletHandler.addMoney(req, res));

  router.post("/wallet/withdrawMoney", authMiddleware(userUsecase), (req, res) => walletHandler.withdrawMoney(req, res));

  router.get("/wallet/balance", authMiddleware(userUsecase), (req, res) => walletHandler.getBalance(req, res));
};
