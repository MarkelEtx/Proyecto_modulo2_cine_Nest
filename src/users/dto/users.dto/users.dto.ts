import { IsArray, IsString } from "class-validator";

export class UsersDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsString()
    nombre: string;
}
