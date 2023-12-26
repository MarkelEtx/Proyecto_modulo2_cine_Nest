import { Body, Controller, Get, NotFoundException, Param, Post, Put, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { FilmsService } from './films.service';
import { log } from 'console';
import { FilmsDto } from './dto/films.dto/films.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) { }

    // @UseGuards(JwtAuthGuard)
    @Get('/admin')
    async getFilms(): Promise<any> {
        try {
            return await this.filmsService.getFilms()
        } catch (error) {
            throw new NotFoundException('Films not found');
        }
    }

    @Get()
    async availableFilms(): Promise<any> {
        try {
            return await this.filmsService.getAvailableFilms();
        } catch (error) {
            throw new NotFoundException('Films not found');
        }
    }

    @Get("pelicula/:peli")
    selectFilm(@Param('peli') peli: string) {
        try {
            return this.filmsService.selectFilm(peli);
        } catch (error) {
            throw new NotFoundException('Film not found');
        }
    }

    @Put('/publicar/:id')
    async makeAvailable(@Param('id') id: string) {
        try {
            return await this.filmsService.makeAvailable(id);
        } catch (error) {
            throw new NotFoundException('Films not found');
        }
    }
    @Put('/modificar')
    async updateFilm(@Body() film: string) {
        try {
            return await this.filmsService.updateFilm(film);
        } catch (error) {
            throw new NotFoundException('Films not found');
        }
    }

    @Post('/crearPeli')
    async createFilm(@Body() film: FilmsDto): Promise<any> {
        try {
            const newFilm = await this.filmsService.createFilm(film);
            return { message: 'Pelicula creada exitosamente', film: newFilm };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}
