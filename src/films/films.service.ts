import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './film.schema';
import { log } from 'console';

@Injectable()
export class FilmsService {
    constructor(@InjectModel(Film.name) private filmsModel: Model<FilmDocument>) { }

    async getFilms(): Promise<any> {
        return await this.filmsModel.find();
    }
    async getAvailableFilms(): Promise<any> {
        return await this.filmsModel.find({ disponible: true });
    }
    async makeAvailable(id: string): Promise<any> {
        let peli = await this.filmsModel.findById(id);
        await this.filmsModel.findByIdAndUpdate(id, { $set: { butacas: 30 } });
        return await this.filmsModel.findByIdAndUpdate(id, { $set: { disponible: !peli.disponible } });

    }
    async updateFilm(peliModif: any): Promise<any> {
        return await this.filmsModel.findByIdAndUpdate(peliModif.id, {
            $set: {
                fecha: peliModif.fecha,
                genero: peliModif.genero,
                poster: peliModif.poster,
                duracion: peliModif.duracion,
                trailer: peliModif.trailer
            }
        });
    }

    async createFilm(film: any): Promise<any> {
        film.disponible = JSON.parse(film.disponible);
        film.butacas = parseInt(film.butacas);
        film.duracion = parseInt(film.duracion);
        try {
            await this.filmsModel.create(film);
        } catch (error) {
            if (error.code === 11000) {
                // Código 11000 indica violación de índice único (duplicado)
                throw new Error('El nombre de usuario ya está en uso.');
            }
            throw error;
        }

    }

    async selectFilm(peli: string): Promise<any> {
        return await this.filmsModel.findOne({ titulo: peli });
    }
}
