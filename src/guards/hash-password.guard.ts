// src/guards/hash-password.guard.ts
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Observable } from "rxjs";

@Injectable()
export class HashPasswordGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (body && body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(body.password, salt);
      body.password = hashedPassword;
    }

    return true;
  }
}
