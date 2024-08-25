import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AuthService } from "./auth.service";

import { LoginUserDto, RegisterUserDto } from "./dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern("auth.register.user")
  registerUser(@Payload() registerUserDto: RegisterUserDto) {
    return "Register User";
  }

  @MessagePattern("auth.login.user")
  loginUser(@Payload() loginUserDto: LoginUserDto) {
    return "Login User";
  }

  @MessagePattern("auth.verify.user")
  verifyToken() {
    return "Verify Token";
  }
}
