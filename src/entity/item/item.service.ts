import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.model';
import { CreateItemDto } from './dto/create-item';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
  ) {
  }
  
  async getItem(item_id: number) {
    const item = await this.itemsRepository.findOneBy({ id: item_id });
    
    if (!item) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    
    return item;
  }
  
  async getItems() {
    return await this.itemsRepository.find();
  }
  
  async createItem(data: CreateItemDto) {
    const item = await this.itemsRepository.create(data);
    return this.itemsRepository.save(item);
  }
  
  async editItem(data: CreateItemDto, item_id: number) {
    return this.itemsRepository.update({ id: item_id }, { ...data, id: item_id });
  }
  
  async deleteItem(item_id: number) {
    return this.itemsRepository.delete({ id: item_id });
  }
}
