import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technique } from './technique.model';
import { CreateTechniqueDto } from './dto/create-technique';
import { CreateTechniqueEffectDto } from './dto/create-technique-effect';
import { TechniqueEffect } from './technique-effect.model';
import { TechniqueQueryDTO } from './technique.controller';
import { TechniqueBranch } from './technique-branch.model';
import { CreateTechniqueBranchDto } from './dto/create-tecgnique-branch';

@Injectable()
export class TechniqueService {
  constructor(
    @InjectRepository(Technique) private techniqueRepository: Repository<Technique>,
    @InjectRepository(TechniqueEffect) private techniqueEffectRepository: Repository<TechniqueEffect>,
    @InjectRepository(TechniqueBranch) private techniqueBranchRepository: Repository<TechniqueBranch>,
  ) {
  }
  
  async getTechniques({ hidden = 'true', author = undefined, race_id, class_id }: TechniqueQueryDTO) {
    // TODO: Починить hidden....
    return await this.techniqueRepository.find({
      relations: ['effects'],
      where: { hidden: hidden === 'false' ? false : undefined, author: author, class_id: class_id, race_id: race_id },
      order: { id: 'ASC' },
    });
  }
  
  async getTechnique(technique_id: number) {
    return await this.techniqueRepository.findOne({
      relations: ['effects'],
      where: { id: technique_id },
    });
  }
  
  async createTechnique(data: CreateTechniqueDto) {
    let technique = this.techniqueRepository.create(data);
    return await this.techniqueRepository.save(technique);
  }
  
  async updateTechnique(techniqueData: Technique, technique_id: number) {
    await this.techniqueRepository.update({ id: technique_id }, techniqueData);
    return techniqueData;
  }
  
  
  // Technique Effect
  async createTechniqueEffect(data: CreateTechniqueEffectDto, technique_id: number) {
    let effect = this.techniqueEffectRepository.create({ ...data, technique_id: technique_id });
    return await this.techniqueEffectRepository.save(effect);
  }
  
  async getTechniqueEffect(technique_id: number) {
    return await this.techniqueEffectRepository.find({
      where: { technique_id: technique_id },
      order: { id: 'ASC' },
    });
  }
  
  async updateTechniqueEffect(techniqueEffectData: TechniqueEffect, effect_id: number, technique_id: number) {
    const effect = await this.techniqueEffectRepository.findOneBy({ id: effect_id, technique_id: technique_id });
    
    if (!effect) {
      let effect = this.techniqueEffectRepository.create({ ...techniqueEffectData, technique_id: technique_id });
      await this.techniqueEffectRepository.save(effect);
    }
    
    await this.techniqueEffectRepository.update({ id: effect_id }, techniqueEffectData);
    return techniqueEffectData;
  }
  
  async deleteTechniqueEffect(effect_id: number, technique_id: number) {
    await this.techniqueEffectRepository.delete({ id: effect_id, technique_id: technique_id });
  }
  
  
  // Technique Branch
  async createBranchTechnique(data: CreateTechniqueBranchDto) {
    let effect = this.techniqueBranchRepository.create(data);
    return await this.techniqueBranchRepository.save(effect);
  }
  
  async getBranchTechniques() {
    return await this.techniqueBranchRepository.find({
      relations: ['technique', 'parent'],
      order: { id: 'ASC' },
    });
  }
  
  async getBranchTechnique(branch_id: number) {
    return await this.techniqueBranchRepository.findOne({
      relations: ['technique', 'parent'],
      where: { id: branch_id },
      order: { id: 'ASC' },
    });
  }
  
  async updateBranchTechnique(techniqueEffectData: TechniqueEffect, branch_id: number) {
    await this.techniqueBranchRepository.update({ id: branch_id }, techniqueEffectData);
    return techniqueEffectData;
  }
  
  async deleteBranchTechnique(branch_id: number) {
    await this.techniqueBranchRepository.delete({ id: branch_id });
  }
}
