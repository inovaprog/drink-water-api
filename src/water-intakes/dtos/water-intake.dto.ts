// src/water-intake/dto/water-intake.dto.ts
import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsDate, IsIn } from "class-validator";

import { LiquidUnit } from "../enums/liquid-unit.enum";

export class WaterIntakeDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  quantity: number;

  @IsNotEmpty()
  @IsIn(Object.values(LiquidUnit))
  @Expose()
  unit: LiquidUnit;

  @IsNotEmpty()
  @IsDate()
  @Expose()
  @Transform(({ value }) => (value ? new Date(value) : value))
  timestamp: Date;
}
