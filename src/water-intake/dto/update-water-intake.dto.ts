import { Expose, Transform } from "class-transformer";
import { IsOptional, IsNumber, IsDate, IsIn } from "class-validator";

import { LiquidUnit } from "../enums/liquid-unit.enum";

export class UpdateWaterIntakeDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  userId?: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  quantity?: number;

  @IsOptional()
  @IsIn(Object.values(LiquidUnit))
  @Expose()
  unit?: LiquidUnit;

  @IsOptional()
  @IsDate()
  @Expose()
  @Transform(({ value }) => (value ? new Date(value) : value))
  timestamp?: Date;
}
