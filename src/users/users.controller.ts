// src/users/users.controller.ts
import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Logger } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Public } from "src/decorators/public.decorator";
import { HashPasswordGuard } from "src/guards/hash-password.guard";
import { Serialize } from "src/interceptors/serialize.interceptor";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserDto } from "./dtos/user.dto";
import { UsersService } from "./users.service";

@UseGuards(HashPasswordGuard, JwtAuthGuard)
@Serialize(UserDto)
@Controller("users")
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Attempting to create a new user with data: ${JSON.stringify(createUserDto, null, 2)}`);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    this.logger.log("Fetching all users.");
    return this.usersService.findAll();
  }

  @Get("/:id")
  findById(@Param("id") id: number) {
    this.logger.log(`Fetching user with ID: ${id}`);
    return this.usersService.findById(id);
  }

  @Patch("/:id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    this.logger.log(`Attempting to update user with ID: ${id}`);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete("/:id")
  remove(@Param("id") id: number) {
    this.logger.log(`Attempting to remove user with ID: ${id}`);
    return this.usersService.remove(id);
  }
}
