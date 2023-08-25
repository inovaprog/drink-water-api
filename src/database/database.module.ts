// src/database/database.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("DB_HOST"),
        port: Number(configService.getOrThrow("DB_PORT")),
        username: configService.getOrThrow("DB_USERNAME"),
        password: configService.getOrThrow("DB_PASSWORD"),
        database: configService.getOrThrow("DB_NAME"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: Boolean(configService.getOrThrow("POSTGRES_SYNCHRONIZE")),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
