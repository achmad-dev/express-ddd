import { UserRepo } from "../repository/user_repo";
import { WalletRepo } from "../repository/wallet_repo";
import type { User } from "../domain/user";
import type { Authentication } from "../domain/authentication";
import jwt from "jsonwebtoken";

interface baseUserUsecase {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByName(name: string): Promise<User>;
  create(name: string, email: string, password: string): Promise<User>;
  signIn(email: string, password: string): Promise<Authentication>;
  update(user: User): Promise<User>;
}

export class UserUsecase implements baseUserUsecase {
  constructor(private userRepo: UserRepo, private walletRepo: WalletRepo) { }

  async findById(id: string): Promise<User> {
    return this.userRepo.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findByEmail(email);
  }

  async findByName(name: string): Promise<User> {
    return this.userRepo.findByName(name);
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await Bun.password.hash(password);
    const user: User = {
      id: "",
      name,
      email,
      password: hashedPassword,
    };
    await this.walletRepo.create(user.id, 0);
    return this.userRepo.create(user);
  }

  async signIn(email: string, password: string): Promise<Authentication> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordCorrect = await Bun.password.verify(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(user.id, "whatever");
    // const refreshToken = randomUUIDString(12);
    const authentication: Authentication = {
      token: token,
      // refreshToken: refreshToken,
      expiresIn: 0,
    };
    return authentication;
  }

  async update(user: User): Promise<User> {
    return this.userRepo.update(user);
  }
}

// const randomUUIDString = (length: number) => {
//   const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += charset.charAt(Math.floor(Math.random() * charset.length));
//   }
//   return result;
// };
