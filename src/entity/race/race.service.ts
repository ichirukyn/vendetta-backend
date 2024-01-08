import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Race, RaceBonuses } from './race.model';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race) private racesRepository: Repository<Race>,
    @InjectRepository(RaceBonuses) private raceBonusesRepository: Repository<RaceBonuses>,
  ) {}

  async getRace(race_id: number) {
    const user = await this.racesRepository.findOneBy({ id: race_id });

    if (!user) {
      throw new HttpException('Раса не найдена', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async getRaces() {
    return await this.racesRepository.find();
  }

  async getRaceBonuses(race_id: number) {
    const bonus = await this.raceBonusesRepository.findBy({ race_id: race_id });
    console.log(bonus[0]);
    console.log(bonus[1]);
    return bonus
  }
}
