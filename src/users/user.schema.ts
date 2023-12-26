import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type } from "os";

export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop({ unique: true })
    username: string;
    @Prop()
    password: string;
    @Prop()
    nombre: string;
    @Prop()
    fotoPerfil: string;
    @Prop()
    entradasPelis: Array<string>;
}
export const UserSchema = SchemaFactory.createForClass(User);