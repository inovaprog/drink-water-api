// src/users/user.entity.ts
import { WaterIntake } from "src/water-intakes/entities/water-intake.entity";
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";

import { Gender } from "../enums/gender.enum";
import { HeightUnit } from "../enums/height-unit.enum";
import { WeightUnit } from "../enums/weight-unit.enum";

@Entity("users")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string; // Should be hashed before saving

  @Column()
  email: string;

  @Column("timestamp")
  birthDate: Date;

  @Column("double precision")
  weight: number;

  @Column({
    type: "enum",
    enum: WeightUnit,
    default: WeightUnit.KG,
  })
  weightUnit: WeightUnit;

  @Column("double precision")
  height: number;

  @Column({
    type: "enum",
    enum: HeightUnit,
    default: HeightUnit.CM,
  })
  heightUnit: HeightUnit;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @OneToMany(() => WaterIntake, waterIntake => waterIntake.user)
  waterIntakes: WaterIntake[];
}
