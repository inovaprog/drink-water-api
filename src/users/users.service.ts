// src/users/users.service.ts
import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./repositories/users.repository";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Attempting to create a new user with data: ${JSON.stringify(createUserDto, null, 2)}`);

    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });

    if (existingUser) {
      this.logger.warn("User with this email already exists.");
      throw new ConflictException("User with this email already exists.");
    }

    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);

    this.logger.log(`User successfully created with ID: ${savedUser.id}`);

    return savedUser;
  }

  public async findAll(): Promise<User[]> {
    this.logger.log("Fetching all users.");

    const users = await this.usersRepository.find();

    this.logger.log(`Found ${users.length} users.`);

    return users;
  }

  public async findById(id: number): Promise<User> {
    this.logger.log(`Fetching user with ID: ${id}`);

    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Attempting to update user with ID: ${id}`);

    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);

    const updatedUser = await this.usersRepository.save(user);

    this.logger.log(`User with ID ${id} successfully updated.`);

    return updatedUser;
  }

  public async remove(id: number): Promise<void> {
    this.logger.log(`Attempting to remove user with ID: ${id}`);

    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.usersRepository.remove(user);

    this.logger.log(`Successfully removed user with ID: ${id}`);
  }
}
