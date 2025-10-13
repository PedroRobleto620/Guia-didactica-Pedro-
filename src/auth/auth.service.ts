import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthService {

constructor(private prisma: PrismaService,
     private jwtService: JwtService) {}    

async validateUser(user: LoginDto) {

    const foundUser = await this.prisma.user.findUnique ({
where:  {
    email: user.email
}

    });

    if (!foundUser) return null;
    
    const isPasswordValid = await bcrypt.compare(user.Password, foundUser.Password);

    if (isPasswordValid){

return this.jwtService.sign({
id: foundUser.id,
email: foundUser.email,
role: foundUser.role


});

    }else{
        throw new UnauthorizedException('Credenciales invalidas');
    }
}
}