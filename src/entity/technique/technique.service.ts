import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technique, TechniqueEffect } from './technique.model';
import { CreateTechniqueDto } from './dto/create-technique';
import { CreateTechniqueEffectDto } from './dto/create-technique-effect';

@Injectable()
export class TechniqueService {
  constructor(
    @InjectRepository(Technique) private techniqueRepository: Repository<Technique>,
    @InjectRepository(TechniqueEffect) private techniqueEffectRepository: Repository<TechniqueEffect>,
  ) {
  }
  
  async createTechnique(data: CreateTechniqueDto) {
    let technique = this.techniqueRepository.create(data);
    return await this.techniqueRepository.save(technique);
  }
  
  async createTechniqueEffect(data: CreateTechniqueEffectDto, technique_id: number) {
    let effect = this.techniqueEffectRepository.create({ ...data, technique_id: technique_id });
    return await this.techniqueEffectRepository.save(effect);
  }
  
  async getTechnique(technique_id: number) {
    return await this.techniqueRepository.findOneBy({ id: technique_id });
  }
  
  async getTechniques() {
    return await this.techniqueRepository.find();
  }
}
