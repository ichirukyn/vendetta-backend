import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Race, RaceBonuses } from './race.model';
import { Class } from '../class/class.model';
import { QueryRaceDto } from './race.controller';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race) private racesRepository: Repository<Race>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(RaceBonuses) private raceBonusesRepository: Repository<RaceBonuses>,
  ) {
  }
  
  async getRace(race_id: number, { hidden=false }: QueryRaceDto) {
    const user = await this.racesRepository.findOneBy({ id: race_id, hidden: hidden });
    
    if (!user) {
      throw new HttpException('Раса не найдена', HttpStatus.BAD_REQUEST);
    }
    
    return user;
  }
  
  async getRaces({ hidden=false }: QueryRaceDto) {
    return await this.racesRepository.findBy({ hidden: hidden });
  }
  
  async getRaceBonuses(race_id: number) {
    return  await this.raceBonusesRepository.findBy({ race_id: race_id });
  }
  
  async getClassByRace(race_id?: number) {
    return await this.classRepository.findBy({ race_id: race_id });
  }
}
