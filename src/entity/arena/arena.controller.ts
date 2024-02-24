import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArenaFloor } from './arena.model';
import { ArenaFloorService } from './arena.service';
import { CreateArenaFloorDto } from './dto/create-floor';
import { ArenaFloorEnemy } from './floor.model';
import { CreateArenaFloorEnemyDto } from './dto/create-floor-enemy';

@ApiTags('ArenaFloor')
@Controller('/arena')
export class ArenaFloorController {
  constructor(private readonly userService: ArenaFloorService) {
  }
  
  @ApiOperation({ summary: 'Получение списка этажа' })
  @ApiResponse({ status: 200, type: [ArenaFloor] })
  @Get('/')
  async getArenaFloors() {
    return await this.userService.getArenaFloors();
  }
  
  @ApiOperation({ summary: 'Получение этажа по id' })
  @ApiResponse({ status: 200, type: ArenaFloor })
  @Get(':floor_id')
  async getArenaFloor(@Param('floor_id') floor_id: number) {
    return await this.userService.getArenaFloor(floor_id);
  }
  
  @ApiOperation({ summary: 'Создание этажа' })
  @ApiResponse({ status: 200, type: [ArenaFloor] })
  @Post('/')
  async createArenaFloor(@Body() createArenaFloorDto: CreateArenaFloorDto) {
    return await this.userService.createArenaFloor(createArenaFloorDto);
  }
  
  @ApiOperation({ summary: 'Обновление этажа' })
  @ApiResponse({ status: 200, type: [ArenaFloor] })
  @Put('/:floor_id')
  async editArenaFloor(@Body() createArenaFloorDto: CreateArenaFloorDto, @Param('floor_id') floor_id: number) {
    return await this.userService.editArenaFloor(createArenaFloorDto, floor_id);
  }
  
  @ApiOperation({ summary: 'Удаление этажа' })
  @ApiResponse({ status: 200, type: [ArenaFloor] })
  @Delete('/:floor_id')
  async deleteArenaFloor(@Param('floor_id') floor_id: number) {
    return await this.userService.deleteArenaFloor(floor_id);
  }
  
  
  // FloorEnemy
  @ApiOperation({ summary: 'Получение списка противников на этаже' })
  @ApiResponse({ status: 200, type: [ArenaFloorEnemy] })
  @Get('/:floor_id/enemy')
  async getArenaFloorEnemies(@Param('floor_id') floor_id: number) {
    return await this.userService.getArenaFloorEnemies(floor_id);
  }
  
  @ApiOperation({ summary: 'Получение противника на этаже по id' })
  @ApiResponse({ status: 200, type: ArenaFloorEnemy })
  @Get('/:floor_id/enemy/:enemy_id')
  async getArenaFloorEnemy(@Param('floor_id') floor_id: number, @Param('enemy_id') enemy_id: number) {
    return await this.userService.getArenaFloorEnemy(enemy_id);
  }
  
  @ApiOperation({ summary: 'Создание противника на этаже' })
  @ApiResponse({ status: 200, type: [ArenaFloorEnemy] })
  @Post('/:floor_id/enemy')
  async createArenaFloorEnemy(@Body() createArenaFloorEnemyDto: CreateArenaFloorEnemyDto) {
    return await this.userService.createArenaFloorEnemy(createArenaFloorEnemyDto);
  }
  
  @ApiOperation({ summary: 'Обновление противника на этаже' })
  @ApiResponse({ status: 200, type: [ArenaFloorEnemy] })
  @Put('/:floor_id/enemy/:enemy_id')
  async editArenaFloorEnemy(@Body() data: CreateArenaFloorEnemyDto, @Param('floor_id') floor_id: number, @Param('enemy_id') enemy_id: number) {
    return await this.userService.editArenaFloorEnemy(data, floor_id, enemy_id);
  }
  
  @ApiOperation({ summary: 'Удаление противника на этаже' })
  @ApiResponse({ status: 200, type: [ArenaFloorEnemy] })
  @Delete('/:floor_id/enemy/:enemy_id')
  async deleteArenaFloorEnemy(@Param('floor_id') floor_id: number, @Param('enemy_id') enemy_id: number) {
    return await this.userService.deleteArenaFloorEnemy(floor_id,enemy_id);
  }
}
