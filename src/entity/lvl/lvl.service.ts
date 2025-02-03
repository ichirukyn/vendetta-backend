import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lvl } from './lvl.model';

@Injectable()
export class LvlService {
  constructor(@InjectRepository(Lvl) private lvlRepository: Repository<Lvl>) {
  }
  
  async getLvl(lvl: number) {
    return await this.lvlRepository.findOne({
      where: { lvl: lvl },
      cache: false,
    });
  }
  
  async getLvls() {
    return await this.lvlRepository.find({ cache: false });
  }
}
