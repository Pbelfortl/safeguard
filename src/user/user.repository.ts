import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable ()
export class UserRepository{

  constructor (private readonly prisma: PrismaService){}

  async create (userDTO: CreateUserDTO) {
    return await this.prisma.users.create({
      data: userDTO
    })
  }

  async get(id: number) {
    return await this.prisma.users.findFirst({
      where: {id}
    })
  }

  async getByEmail (email: string) {
    return await this.prisma.users.findFirst({
      where: {email}
    })
  }

  async delete (id: number) {
    return await this.prisma.users.delete({
      where: {id}
    })
  }

}
