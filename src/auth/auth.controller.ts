import { Controller, Post, Request, UseGuards, Get } from "@nestjs/common";
import { Logger } from "@nestjs/common"; // Import the Logger class
import { Public } from "src/decorators/public.decorator";

import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    this.logger.log(`User attempting to log in: ${req.user.email}`);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    this.logger.log(`User accessing profile: ${req.user.email}`);
    return req.user;
  }
}
