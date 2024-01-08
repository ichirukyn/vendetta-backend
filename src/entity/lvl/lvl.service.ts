import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lvl } from './lvl.model';

@Injectable()
export class LvlService {
  constructor(@InjectRepository(Lvl) private lvlRepository: Repository<Lvl>) {}
  
  async getLvl(lvl: number) {
    const user = await this.lvlRepository.findOneBy({ lvl: lvl });
  }
  
  async getLvls() {
    return await this.lvlRepository.find();
  }
}
