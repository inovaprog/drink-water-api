//src/users/dtos/update-user.dto.ts
import { Expose, Transform } from "class-transformer";
import { IsEmail, IsString, IsDate, IsNumber, IsOptional, Min, Max, Length, IsIn } from "class-validator";

import { Gender } from "../enums/gender.enum";
import { HeightUnit } from "../enums/height-unit.enum";
import { WeightUnit } from "../enums/weight-unit.enum";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 255)
  @Expose()
  username?: string;

  @IsOptional()
  @IsEmail()
  @Expose()
  email?: string;

  @IsOptional()
  @IsDate()
  @Expose()
  @Transform(({ value }) => new Date(value))
  birthDate?: Date;

  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(200)
  @Expose()
  weight?: number;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(WeightUnit))
  @Expose()
  weightUnit?: WeightUnit;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(250)
  @Expose()
  height?: number;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(HeightUnit))
  @Expose()
  heightUnit?: HeightUnit;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(Gender))
  @Expose()
  gender?: Gender;
}
