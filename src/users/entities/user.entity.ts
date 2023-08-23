// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";

import { Gender } from "../enums/Gender";
import { HeightUnit } from "../enums/HeightUnit";
import { WeightUnit } from "../enums/WeightUnit";

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

  @AfterInsert()
  logInsert() {
    console.log("Inserted User with id:", this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log("Updated User with id:", this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log("Removed User with id:", this.id);
  }
}
