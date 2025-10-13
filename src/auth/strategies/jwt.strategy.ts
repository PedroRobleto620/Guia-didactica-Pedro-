import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Role } from "generated/prisma";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret_key', // Replace with your actual secret key
    });
}
async validate(payload: any) {
        return {
             userId: payload.id,
              email: payload.email,
              Role: payload.role,


        };


  }

}


    
        