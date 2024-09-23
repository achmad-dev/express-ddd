import { UserUsecase } from "../../usecase/user_usecase";
import { response } from "../../../shared/domain/response";
import type { Request, Response } from "express";
import { logger } from "../../../shared/util/logger";
import { z } from "zod";
interface baseUserHandler {
  signUp(req: Request, res: Response): Promise<Response>;
  signIn(req: Request, res: Response): Promise<Response>
}

export class UserHandler implements baseUserHandler {
  constructor(private userUsecase: UserUsecase) { }

  async signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;
    logger.info("SignUp request received");
    const schema = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });
    try {
      logger.info("processing signUp request");
      const data = schema.parse({ name, email, password });
      await this.userUsecase.create(data.name, data.email, data.password);
      logger.info("signUp request processed");
      return response(res, { status: 200, success: true, message: "SignUp successful" });
    } catch (error: any) {
      logger.error(error);
      return response(res, { status: 400, success: false, message: `error: ${error}` });
    }
  }

  async signIn(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    try {
      const data = schema.parse({ email, password });
      const authentication = await this.userUsecase.signIn(data.email, data.password);
      return response(res, { status: 200, success: true, message: "SignIn successful", data: authentication });
    } catch (error) {
      logger.error(error);
      return response(res, { status: 400, success: false, message: `error: ${error}` });
    }
  }
} 
