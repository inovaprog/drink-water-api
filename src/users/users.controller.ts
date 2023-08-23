// src/users/users.controller.ts
import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete } from "@nestjs/common";
import { HashPasswordGuard } from "src/guards/hash-password.guard";
import { Serialize } from "src/interceptors/serialize.interceptor";

import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserDto } from "./dtos/user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@Serialize(UserDto)
@UseGuards(HashPasswordGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get("/:id")
  findById(@Param("id") id: number) {
    return this.usersService.findById(id);
  }

  @Patch("/:id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete("/:id")
  remove(@Param("id") id: number) {
    return this.usersService.remove(id);
  }
}
