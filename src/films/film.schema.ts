import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FilmDocument = Film & Document;

@Schema()
export class Film {
    @Prop({ unique: true })
    titulo: string;
    @Prop()
    poster: string;
    @Prop()
    fecha: string;
    @Prop()
    butacas: number;
    @Prop()
    sinopsis: string;
    @Prop()
    duracion: number;
    @Prop()
    genero: string;
    @Prop()
    trailer: string;
    @Prop()
    disponible: boolean;
}

export const FilmSchema = SchemaFactory.createForClass(Film)