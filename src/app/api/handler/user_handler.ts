import { UserUsecase } from "../../usecase/user_usecase";
import type { Response } from "../../../shared/domain/response";
import type { Request, Response as ExpressResponse } from "express";

interface baseUserHandler {
  signUp(req: Request, res: ExpressResponse): Promise<Response>;
  signIn(req: Request, res: ExpressResponse): Promise<Response>;
}

export class UserHandler implements baseUserHandler {
  constructor(private userUsecase: UserUsecase) { }

  async signUp(req: Request, res: ExpressResponse): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      const user = await this.userUsecase.create(name, email, password);
      return {
        status: 200,
        success: true,
        data: user,
      };
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message: error.message,
      };
    }
  }

  async signIn(req: Request, res: ExpressResponse): Promise<Response> {
    const { email, password } = req.body;
    try {
      const authentication = await this.userUsecase.signIn(email, password);
      return {
        status: 200,
        success: true,
        data: authentication,
      };
    } catch (error) {
      return {
        status: 401,
        success: false,
        message: "Invalid credentials",
      };
    }
  }
} 
