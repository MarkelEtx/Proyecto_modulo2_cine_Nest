import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UsersDto } from './dto/users.dto/users.dto';
import { Film, FilmDocument } from 'src/films/film.schema';
import { FilmsService } from 'src/films/films.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private usersModel: Model<UserDocument>,
        @InjectModel(Film.name) private filmsModel: Model<FilmDocument>,
    ) { }

    // async createUser({ user }: { user: UsersDto; }): Promise<string> {
    async createUser(user: any): Promise<any> {
        const saltRound = 10;
        const hastedPassowd = await bcrypt.hash(user.password, saltRound);
        let usuario = {
            username: user.username,
            password: hastedPassowd,
            nombre: user.nombre,
            fotoPerfil: user.fotoPerfil
        }
        try {
            await this.usersModel.create(usuario);
        } catch (error) {
            if (error.code === 11000) {
                // Código 11000 indica violación de índice único (duplicado)
                throw new Error('El nombre de usuario ya está en uso.');
            }
            throw error;
        }
        // if (await this.usersModel.exists({ username: usuario.username })) {
        //     return { message: "usuario no valido", status: 409 };
        // } else {
        //     await this.usersModel.create(usuario);
        //     return { message: "usuario creado", status: 201 };
        // }
    }

    async buscarUsuario(user: UsersDto): Promise<any> {
        const { username, password, nombre } = user;
        const usuarioEncontrado: UsersDto = await this.usersModel.findOne({ username: username });

        if (usuarioEncontrado) {
            const passwordMatch = await bcrypt.compare(password, usuarioEncontrado.password);
            return passwordMatch;
        } else {
            return false;
        }
    }
    async borrarUsuario(id: string): Promise<any> {
        await this.usersModel.findByIdAndRemove({ _id: id });

    }

    async comprarEntrada(body: any): Promise<any> {
        let peli = await this.filmsModel.findOne({ titulo: body.titulo });
        let usuario = await this.usersModel.findOne({ username: body.usuario });
        await this.usersModel.findOneAndUpdate(
            { _id: usuario._id },
            { $push: { entradasPelis: body.titulo } }
        );

        await this.filmsModel.findByIdAndUpdate(peli.id, { $set: { butacas: peli.butacas - 1 } });


    }

    async detallesUsuario(username: any): Promise<any> {
        return await this.usersModel.findOne({ username }).lean();
    }

    async todosUsuarios(): Promise<any> {
        try {
            console.log("hola2");
            return await this.usersModel.find();
        } catch (error) {
            throw new NotFoundException('Users not found');
        }
    }

}
