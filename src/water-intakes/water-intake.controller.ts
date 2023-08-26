import { Controller, Post, Body, Get, Param, Patch, Logger, Delete, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Serialize } from "src/interceptors/serialize.interceptor";

import { CreateWaterIntakeDto } from "./dtos/create-water-intake.dto";
import { UpdateWaterIntakeDto } from "./dtos/update-water-intake.dto";
import { WaterIntakeDto } from "./dtos/water-intake.dto";
import { WaterIntakeService } from "./water-intake.service";

@UseGuards(JwtAuthGuard)
@Serialize(WaterIntakeDto)
@Controller("water-intake")
export class WaterIntakeController {
  private readonly logger = new Logger(WaterIntakeController.name);

  constructor(private readonly waterIntakeService: WaterIntakeService) {}

  @Post()
  create(@Body() createWaterIntakeDto: CreateWaterIntakeDto) {
    this.logger.log(`Creating a new water intake with data: ${JSON.stringify(createWaterIntakeDto, null, 2)}`);
    return this.waterIntakeService.create(createWaterIntakeDto);
  }

  @Get()
  findAll() {
    this.logger.log("Fetching all water intake records.");
    return this.waterIntakeService.findAll();
  }

  @Get("/:id")
  findOne(@Param("id") id: string) {
    this.logger.log(`Fetching a water intake record with ID: ${id}`);
    return this.waterIntakeService.findOne(Number(id));
  }

  @Patch("/:id")
  update(@Param("id") id: string, @Body() updateWaterIntakeDto: UpdateWaterIntakeDto) {
    this.logger.log(`Updating a water intake record with ID: ${id}`);
    return this.waterIntakeService.update(Number(id), updateWaterIntakeDto);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    this.logger.log(`Removing a water intake record with ID: ${id}`);
    return this.waterIntakeService.remove(Number(id));
  }
}
