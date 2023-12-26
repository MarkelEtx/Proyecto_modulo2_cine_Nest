import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UsersDto } from 'src/users/dto/users.dto/users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(username: string, pass: string): Promise<any> {
        console.log("HOLA");

        const usuarioEncontrado: UsersDto = await this.usersService.detallesUsuario(username);
        //console.log(usuarioEncontrado);

        if (!usuarioEncontrado) {
            return null;
        }
        const passwordMatch = await bcrypt.compare(pass, usuarioEncontrado.password);

        if (passwordMatch) {
            const { password, ...result } = usuarioEncontrado
            // return result;
            return result;
        } else {
            return null;
        }
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user._id.toString(), user };

        console.log(payload);

        return {
            access_token: this.jwtService.sign(payload),
            usuario: user
        };
    }
}
