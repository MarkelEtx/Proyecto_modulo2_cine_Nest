import { Body, Controller, Delete, Param, Post, Put, Res, UseGuards, HttpStatus, HttpException, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto/users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    // @Post('/crearUsuario')
    // async createFilm(@Body() user: UsersDto): Promise<any> {
    //     await this.userService.createUser({ user })
    // }
    @Post('/crearUsuario')
    async createUser(@Body() user: any): Promise<any> {
        try {
            const newFilm = await this.userService.createUser(user);
            return { message: 'Usuario creado exitosamente', film: newFilm };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
        // let usuario = await this.userService.createUser(user);
        // return res.status(usuario.status).json(usuario.message);
    }
    @Get("/verTodos")
    async seeAllUsers(): Promise<any> {
        console.log("hola");

        return await this.userService.todosUsuarios()
    }
    @Post('/log')
    async login(@Body() film: UsersDto): Promise<any> {
        console.log(await this.userService.buscarUsuario(film));
    }
    @Delete('/borrarUsu/:id')
    async borrarUsu(@Param("id") id: string): Promise<any> {
        await this.userService.borrarUsuario(id);

    }
    @UseGuards(JwtAuthGuard)
    @Put('/comprarEntrada')
    comprarEntrada(@Body() body: string): any {
        this.userService.comprarEntrada(body);
    }
}
