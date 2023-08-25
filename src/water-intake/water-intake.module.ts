// src/water-intake/water-intake.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";

import { WaterIntake } from "./entities/water-intake.entity";
import { WaterIntakeController } from "./water-intake.controller";
import { WaterIntakeService } from "./water-intake.service";

@Module({
  imports: [TypeOrmModule.forFeature([WaterIntake, User])],
  controllers: [WaterIntakeController],
  providers: [WaterIntakeService],
})
export class WaterIntakeModule {}
