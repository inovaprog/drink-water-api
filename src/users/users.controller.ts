// src/users/users.controller.ts
import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Logger } from "@nestjs/common";
import { HashPasswordGuard } from "src/guards/hash-password.guard";
import { Serialize } from "src/interceptors/serialize.interceptor";

import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserDto } from "./dtos/user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@Serialize(UserDto)
@UseGuards(HashPasswordGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
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
