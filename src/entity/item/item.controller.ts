import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Item } from './item.model';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item';

@ApiTags('Item')
@Controller('/item')
export class ItemController {
  constructor(private readonly userService: ItemService) {
  }
  
  @ApiOperation({ summary: 'Получение списка предметов' })
  @ApiResponse({ status: 200, type: [Item] })
  @Get('/')
  async getItems() {
    return await this.userService.getItems();
  }
  
  @ApiOperation({ summary: 'Получение предмета по id' })
  @ApiResponse({ status: 200, type: Item })
  @Get(':item_id')
  async getItem(@Param('item_id') item_id: number) {
    return await this.userService.getItem(item_id);
  }
  
  @ApiOperation({ summary: 'Создание предмета' })
  @ApiResponse({ status: 200, type: [Item] })
  @Post('/')
  async createItem(@Body() createItemDto: CreateItemDto) {
    return await this.userService.createItem(createItemDto);
  }
  
  @ApiOperation({ summary: 'Обновление предмета' })
  @ApiResponse({ status: 200, type: [Item] })
  @Put('/:item_id')
  async editItem(@Body() createItemDto: CreateItemDto, @Param('item_id') item_id: number) {
    return await this.userService.editItem(createItemDto, item_id);
  }
  
  @ApiOperation({ summary: 'Удаление предмета' })
  @ApiResponse({ status: 200, type: [Item] })
  @Delete('/:item_id')
  async deleteItem(@Param('item_id') item_id: number) {
    return await this.userService.deleteItem(item_id);
  }
}
