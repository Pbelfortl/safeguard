import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCredentialDTO } from "./dto/create.credential.dto";

@Injectable()
export class CredentialRepository {

    constructor(private readonly prisma: PrismaService){}

    async create (userId:number, credentialDTO: CreateCredentialDTO){

        return this.prisma.credentials.create({
            data:{
                userId,
                ...credentialDTO,  
            }
        })
    }

    async getByTitle (userId: number, title: string) {
        return await this.prisma.credentials.findFirst({
            where: {
                title
            }
        })
    }

    async get (userId: number, id: number){
        return this.prisma.credentials.findFirst({
            where:{
                userId,
                id
            }
        })
    }

    async getAll (userId: number) {
        return this.prisma.credentials.findMany({
            where:{
                userId
            }
        })
    }

    async delete (userId: number, id: number){
        return this.prisma.credentials.delete({
            where:{
                id
            }
        })
    }
}