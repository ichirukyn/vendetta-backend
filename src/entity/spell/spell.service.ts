import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spell } from './spell.model';
import { CreateSpellDto } from './dto/create-spell';
import { CreateSpellEffectDto } from './dto/create-spell-effect';
import { SpellEffect } from './spell-effect.model';
import { SpellQueryDTO } from './spell.controller';
import { SpellBranch } from './spell-branch.model';
import { CreateSpellBranchDto } from './dto/create-spell-branch';

@Injectable()
export class SpellService {
  constructor(
    @InjectRepository(Spell) private spellRepository: Repository<Spell>,
    @InjectRepository(SpellEffect) private spellEffectRepository: Repository<SpellEffect>,
    @InjectRepository(SpellBranch) private spellBranchRepository: Repository<SpellBranch>,
  ) {
  }
  
  async getSpells({ hidden = true, author_id = undefined, race_id, class_id }: SpellQueryDTO) {
    return await this.spellRepository.find({
      relations: ['effects'],
      where: { hidden: hidden ? undefined : hidden, author_id: author_id, class_id: class_id, race_id: race_id },
      order: { id: 'ASC' },
    });
  }
  
  async getSpell(spell_id: number) {
    return await this.spellRepository.findOne({
      relations: ['effects'],
      where: { id: spell_id },
    });
  }
  
  async createSpell(data: CreateSpellDto) {
    let spell = this.spellRepository.create(data);
    return await this.spellRepository.save(spell);
  }
  
  async updateSpell(spellData: Spell, spell_id: number) {
    await this.spellRepository.update({ id: spell_id }, spellData);
    return spellData;
  }
  
  
  // Spell Effect
  async createSpellEffect(data: CreateSpellEffectDto, spell_id: number) {
    let effect = this.spellEffectRepository.create({ ...data, spell_id: spell_id });
    return await this.spellEffectRepository.save(effect);
  }
  
  async getSpellEffect(spell_id: number) {
    return await this.spellEffectRepository.find({
      where: { spell_id: spell_id },
      order: { id: 'ASC' },
    });
  }
  
  async updateSpellEffect(spellEffectData: SpellEffect, effect_id: number, spell_id: number) {
    const effect = await this.spellEffectRepository.findOneBy({ id: effect_id, spell_id: spell_id });
    
    if (!effect) {
      let effect = this.spellEffectRepository.create({ ...spellEffectData, spell_id: spell_id });
      await this.spellEffectRepository.save(effect);
    }
    
    await this.spellEffectRepository.update({ id: effect_id }, spellEffectData);
    return spellEffectData;
  }
  
  async deleteSpellEffect(effect_id: number, spell_id: number) {
    await this.spellEffectRepository.delete({ id: effect_id, spell_id: spell_id });
  }
  
  
  // Spell Branch
  async createBranchSpell(data: CreateSpellBranchDto) {
    let effect = this.spellBranchRepository.create(data);
    return await this.spellBranchRepository.save(effect);
  }
  
  async getBranchSpells() {
    return await this.spellBranchRepository.find({
      relations: ['spell', 'parent'],
      order: { id: 'ASC' },
    });
  }
  
  async getBranchSpell(branch_id: number) {
    return await this.spellBranchRepository.findOne({
      relations: ['spell', 'parent'],
      where: { id: branch_id },
      order: { id: 'ASC' },
    });
  }
  
  async updateBranchSpell(spellEffectData: SpellEffect, branch_id: number) {
    await this.spellBranchRepository.update({ id: branch_id }, spellEffectData);
    return spellEffectData;
  }
  
  async deleteBranchSpell(branch_id: number) {
    await this.spellBranchRepository.delete({ id: branch_id });
  }
}
