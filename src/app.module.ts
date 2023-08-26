import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";

import { AuthModule } from "./auth/auth.module"; // Importe o AuthModule
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
    AuthModule,
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
