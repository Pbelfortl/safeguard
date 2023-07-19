import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private EXPIRATION_TIME = "7 days"
    private ISSUER = "DrivenPass"
    private AUDIENCE = "users"
 
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async signup (data: AuthRegisterDTO){
        const user = await this.userService.getByEmail(data.email)
        if(user) throw new ConflictException

        return await this.userService.create(data)
    }

    async signin (email: string, password: string) {
        
        const user = await this.userService.getByEmail(email)

        if(!user) throw new UnauthorizedException('Invalid email or password.')

        const valid = bcrypt.compareSync(password, user.password)
       
        if(!valid) throw new UnauthorizedException('Invalid email or password.')

        return this.createToken(user)
    }

    async createToken (user: users) {
        const token = this.jwtService.sign({
            email: user.email
        }, {
            expiresIn: this.EXPIRATION_TIME,
            subject: String(user.id),
            issuer: this.ISSUER,
            audience: this.AUDIENCE
        })
        return token
    }

    async checkToken (token: string) {

        try{

            const data = await this.jwtService.verify(token, 
                {
                    audience: this.AUDIENCE,
                    issuer: this.ISSUER
                })
                
            return data

        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
