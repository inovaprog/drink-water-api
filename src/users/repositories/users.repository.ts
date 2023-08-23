// src/users/repositories/users.repository.ts
import { Repository } from "typeorm";

import { User } from "../entities/user.entity";

export class UsersRepository extends Repository<User> {}
