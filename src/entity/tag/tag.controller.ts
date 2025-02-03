import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from './tag.model';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag';

@ApiTags('Tag')
@Controller('/tag')
export class TagController {
  constructor(private readonly userService: TagService) {
  }
  
  @ApiOperation({ summary: 'Получение списка предметов' })
  @ApiResponse({ status: 200, type: [Tag] })
  @Get('/')
  async getTags(@Query('list_id') list_id?: number[]) {
    return await this.userService.getTags(list_id);
  }
  
  @ApiOperation({ summary: 'Получение предмета по id' })
  @ApiResponse({ status: 200, type: Tag })
  @Get(':tag_id')
  async getTag(@Param('tag_id') tag_id: number) {
    return await this.userService.getTag(tag_id);
  }
  
  @ApiOperation({ summary: 'Создание предмета' })
  @ApiResponse({ status: 200, type: [Tag] })
  @Post('/')
  async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.userService.createTag(createTagDto);
  }
  
  @ApiOperation({ summary: 'Обновление предмета' })
  @ApiResponse({ status: 200, type: [Tag] })
  @Put('/:tag_id')
  async editTag(@Body() createTagDto: CreateTagDto, @Param('tag_id') tag_id: number) {
    return await this.userService.editTag(createTagDto, tag_id);
  }
  
  @ApiOperation({ summary: 'Удаление предмета' })
  @ApiResponse({ status: 200, type: [Tag] })
  @Delete('/:tag_id')
  async deleteTag(@Param('tag_id') tag_id: number) {
    return await this.userService.deleteTag(tag_id);
  }
}
