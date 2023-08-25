// src/waterIntake/waterIntake.entity.ts
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { LiquidUnit } from "../enums/liquid-unit.enum";

@Entity("water_intakes")
export class WaterIntake {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column("double precision")
  quantity: number;

  @Column({
    type: "enum",
    enum: LiquidUnit,
    default: LiquidUnit.ML,
  })
  unit: LiquidUnit;

  @Column("timestamp with time zone")
  timestamp: Date;

  @ManyToOne(() => User, user => user.waterIntakes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;
}
