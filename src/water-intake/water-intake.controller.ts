import { Controller, Post, Body, Get, Param, Patch, Logger, Delete } from "@nestjs/common";

import { UpdateWaterIntakeDto } from "./dto/update-water-intake.dto";
import { WaterIntakeDto } from "./dto/water-intake.dto";
import { WaterIntakeService } from "./water-intake.service";

@Controller("water-intake")
export class WaterIntakeController {
  private readonly logger = new Logger(WaterIntakeController.name);

  constructor(private readonly waterIntakeService: WaterIntakeService) {}

  @Post()
  create(@Body() createWaterIntakeDto: WaterIntakeDto) {
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
