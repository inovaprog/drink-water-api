import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserResponseDto } from "src/users/dtos/user-response.dto";

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); // Create a Logger instance

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponseDto | null> {
    this.logger.log(`Validating user with email: ${email}`);
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserResponseDto) {
    this.logger.log(`User logged in: ${user.username}`);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserById(userId: string): Promise<UserResponseDto | null> {
    this.logger.log(`Validating user with ID: ${userId}`);
    const user = await this.usersService.findById(Number(userId));
    if (!user) {
      this.logger.error(`User not found with ID: ${userId}`);
      throw new NotFoundException("User not found");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
