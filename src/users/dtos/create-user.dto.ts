// src/users/dtos/user.dto.ts
import { Expose, Transform } from "class-transformer";
import { IsEmail, IsString, IsDate, IsNumber, IsNotEmpty, Min, Max, Length, IsIn, Matches } from "class-validator";

import { Gender } from "../enums/gender.enum";
import { HeightUnit } from "../enums/height-unit.enum";
import { WeightUnit } from "../enums/weight-unit.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  @Expose()
  username: string;

  @IsString()
  @Length(8, 128)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+/, {
    message:
      "Password is too weak. It should contain an uppercase letter, lowercase letter, number, and special character.",
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsDate()
  @Expose()
  @Transform(({ value }) => new Date(value))
  birthDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(40)
  @Max(200)
  @Expose()
  weight: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(WeightUnit))
  @Expose()
  weightUnit: WeightUnit;

  @IsNotEmpty()
  @IsNumber()
  @Min(100)
  @Max(250)
  @Expose()
  height: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(HeightUnit))
  @Expose()
  heightUnit: HeightUnit;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(Gender))
  @Expose()
  gender: Gender;
}
