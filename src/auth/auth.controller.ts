import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern("auth.register.user")
  registerUser() {
    return "Register User";
  }

  @MessagePattern("auth.login.user")
  loginUser() {
    return "Login User";
  }

  @MessagePattern("auth.verify.user")
  verifyToken() {
    return "Verify Token";
  }
}
