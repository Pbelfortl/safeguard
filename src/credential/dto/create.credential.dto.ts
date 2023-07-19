import { IsString } from "class-validator";

export class CreateCredentialDTO {

    @IsString()
    title: string

    @IsString()
    url: string

    @IsString()
    user: string

    @IsString()
    password: string
}