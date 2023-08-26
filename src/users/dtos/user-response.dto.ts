import { Expose, Transform } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, Length, IsIn, Min, Max } from "class-validator";

import { Gender } from "../enums/gender.enum";
import { HeightUnit } from "../enums/height-unit.enum";
import { WeightUnit } from "../enums/weight-unit.enum";

export class UserResponseDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  @Expose()
  username: string;

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
