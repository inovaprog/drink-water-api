// src/app.module.ts
import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";

import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { WaterIntakeModule } from "./water-intakes/water-intake.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
    WaterIntakeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // This will remove any properties that don't have any decorators
      }),
    },
  ],
})
export class AppModule {}
