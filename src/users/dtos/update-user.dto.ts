//src/users/dtos/update-user.dto.ts
import { PartialType } from "@nestjs/mapped-types";

import { UserDto } from "./user.dto";

export class UpdateUserDto extends PartialType(UserDto) {}
