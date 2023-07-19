import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor (private readonly userRepository: UserRepository) { }

    async create (userDTO: CreateUserDTO) {
        const user = await this.userRepository.create({
            ...userDTO,
            password: bcrypt.hashSync(userDTO.password, 10),
        })

        return user
    }

    async get(id: number) {
        const user = await this.userRepository.get(id)

        if(!user) throw new NotFoundException()
        
        return user
    }

    async getByEmail (email: string) {
        const user = await this.userRepository.getByEmail(email)

        return user
    }

    async delete (id: number) {
        const user = await this.userRepository.delete(id)

        if (!user) throw new NotFoundException()

        return user
    }
}
