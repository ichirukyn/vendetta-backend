import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from './tag.model';
import { CreateTagDto } from './dto/create-tag';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {
  }
  
  async getTag(tag_id: number) {
    const tag = await this.tagsRepository.findOneBy({ id: tag_id });
    if (!tag) throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    
    return tag;
  }
  
  async getTags(list_id?: number[]) {
    return await this.tagsRepository.find({ where: { id: list_id && In(list_id) } });
  }
  
  async createTag(data: CreateTagDto) {
    const tag = this.tagsRepository.create(data);
    await this.tagsRepository.save(tag);
    return tag;
  }
  
  async editTag(data: CreateTagDto, tag_id: number) {
    return this.tagsRepository.update({ id: tag_id }, { ...data, id: tag_id });
  }
  
  async deleteTag(tag_id: number) {
    return this.tagsRepository.delete({ id: tag_id });
  }
}
