import { IsBoolean, IsInt, IsString } from "class-validator";

export class FilmsDto {
    @IsString()
    titulo: string;
    @IsString()
    poster: string;
    @IsString()
    fecha: string;
    @IsInt({ message: 'Numero en butacas Por Favor' })
    butacas: number;
    @IsInt({ message: 'Numero en duración Por Favor' })
    duracion: number;
    @IsString()
    genero: string;
    @IsString()
    trailer: string;
    @IsBoolean({ message: 'Booleano en disponible Por Favor' })
    disponible: boolean;
    @IsString()
    sinopsis: string;
}
