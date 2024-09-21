import { Router } from "express";
import { UserHandler } from "../handler/user_handler";
import { WalletHandler } from "../handler/wallet_handler";
import { UserRepo } from "../../repository/user_repo";
import { WalletRepo } from "../../repository/wallet_repo";
import { UserUsecase } from "../../usecase/user_usecase";
import { WalletUsecase } from "../../usecase/wallet_usecase";
import { PrismaClient } from "@prisma/client/extension";

export const initRoute = (router: Router) => {
  const client = new PrismaClient();
  const userRepo = new UserRepo(client);
  const walletRepo = new WalletRepo(client);
  const userUsecase = new UserUsecase(userRepo, walletRepo);
  const walletUsecase = new WalletUsecase(walletRepo);
  const userHandler = new UserHandler(userUsecase);
  const walletHandler = new WalletHandler(walletUsecase);

  router.post("/user/signup", userHandler.signUp);
  router.post("/user/signin", userHandler.signIn);

  router.post("/wallet/addMoney", walletHandler.addMoney);
  router.post("/wallet/withdrawMoney", walletHandler.withdrawMoney);
};
