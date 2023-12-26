import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './film.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Film.name,
      schema: FilmSchema
    },
  ]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule { }
