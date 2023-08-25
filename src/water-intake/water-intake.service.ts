import { Injectable, ConflictException, NotFoundException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../users/entities/user.entity";

import { UpdateWaterIntakeDto } from "./dto/update-water-intake.dto";
import { WaterIntakeDto } from "./dto/water-intake.dto";
import { WaterIntake } from "./entities/water-intake.entity";

@Injectable()
export class WaterIntakeService {
  private readonly logger = new Logger(WaterIntakeService.name);

  constructor(
    @InjectRepository(WaterIntake)
    private readonly waterIntakeRepository: Repository<WaterIntake>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(waterIntakeDto: WaterIntakeDto): Promise<WaterIntake> {
    this.logger.log(`Creating a new water intake record: ${JSON.stringify(waterIntakeDto, null, 2)}`);

    const user = await this.userRepository.findOne({ where: { id: waterIntakeDto.userId } });
    if (!user) {
      this.logger.warn(`User with ID ${waterIntakeDto.userId} not found`);
      throw new NotFoundException(`User with ID ${waterIntakeDto.userId} not found`);
    }

    const existingWaterIntake = await this.waterIntakeRepository.findOne({
      where: { userId: waterIntakeDto.userId, timestamp: waterIntakeDto.timestamp },
    });

    if (existingWaterIntake) {
      this.logger.warn("A water intake record with this userId and timestamp already exists.");
      throw new ConflictException("A water intake record with this userId and timestamp already exists.");
    }

    const waterIntake = this.waterIntakeRepository.create(waterIntakeDto);
    const savedWaterIntake = await this.waterIntakeRepository.save(waterIntake);

    this.logger.log(`Water intake record successfully created with ID: ${savedWaterIntake.id}`);

    return savedWaterIntake;
  }

  public async findAll(): Promise<WaterIntake[]> {
    this.logger.log("Fetching all water intake records.");

    const waterIntakes = await this.waterIntakeRepository.find();

    this.logger.log(`Found ${waterIntakes.length} water intake records.`);

    return waterIntakes;
  }

  public async findOne(id: number): Promise<WaterIntake> {
    this.logger.log(`Fetching water intake record with ID: ${id}`);

    const waterIntake = await this.waterIntakeRepository.findOne({ where: { id } });

    if (!waterIntake) {
      this.logger.warn(`WaterIntake with ID ${id} not found`);
      throw new NotFoundException(`WaterIntake with ID ${id} not found`);
    }

    return waterIntake;
  }

  public async update(id: number, updateWaterIntakeDto: UpdateWaterIntakeDto): Promise<WaterIntake> {
    this.logger.log(`Updating water intake record with ID: ${id}`);

    const waterIntake = await this.findOne(id);

    if (!waterIntake) {
      this.logger.warn(`WaterIntake with ID ${id} not found`);
      throw new NotFoundException(`WaterIntake with ID ${id} not found`);
    }

    Object.assign(waterIntake, updateWaterIntakeDto);

    const updatedWaterIntake = await this.waterIntakeRepository.save(waterIntake);

    this.logger.log(`Water intake record with ID ${id} successfully updated.`);

    return updatedWaterIntake;
  }

  public async remove(id: number) {
    this.logger.log(`Attempting to remove water intake record with ID: ${id}`);

    const waterIntake = await this.waterIntakeRepository.findOne({ where: { id } });

    if (!waterIntake) {
      this.logger.warn(`Water intake record with ID ${id} not found`);
      throw new NotFoundException(`Water intake with ID ${id} not found`);
    }

    await this.waterIntakeRepository.remove(waterIntake);
    this.logger.log(`Successfully removed water intake record with ID: ${id}`);
  }
}
