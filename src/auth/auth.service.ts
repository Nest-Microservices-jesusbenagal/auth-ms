import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { LoginUserDto, RegisterUserDto } from "./dto";

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log("Connected to database");
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, name, password } = registerUserDto;
    try {
      const user = await this.user.findUnique({
        where: { email },
      });

      if (user)
        throw new RpcException({ status: 400, message: "User already exists" });

      const newUser = await this.user.create({
        data: {
          email,
          name,
          password: bcrypt.hashSync(password, 10),
        },
      });

      const { password: _, ...rest } = newUser;

      return {
        user: rest,
        token: "ABC123",
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({ status: 400, message: error.message });
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.user.findUnique({
        where: { email },
      });

      if (!user)
        throw new RpcException({ status: 400, message: "User not found" });

      if (!bcrypt.compareSync(password, user.password))
        throw new RpcException({ status: 400, message: "Invalid password" });

      const { password: _, ...rest } = user;

      return {
        user: rest,
        token: "ABC123",
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({ status: 400, message: error.message });
    }
  }
}
