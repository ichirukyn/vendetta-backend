import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Class, ClassBonuses } from './class.model';
import { ClassService } from './class.service';

@ApiTags('Class')
@Controller('/class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOperation({ summary: 'Получение класса по id' })
  @ApiResponse({ status: 200, type: Class })
  @Get(':class_id')
  async getClass(@Param('class_id') class_id: number) {
    return await this.classService.getClass(class_id);
  }

  @ApiOperation({ summary: 'Получение списка классов' })
  @ApiResponse({ status: 200, type: [Class] })
  @Get('/')
  async getClasses() {
    return await this.classService.getClasses();
  }
  
  
  @ApiOperation({ summary: 'Получение списка классов по race_id' })
  @ApiResponse({ status: 200, type: [Class] })
  @Get('/race/:race_id')
  async getClassByRace(@Param('race_id') race_id: number) {
    return await this.classService.getClassByRace(race_id);
  }

  @ApiOperation({ summary: 'Получение списка бонусов класс' })
  @ApiResponse({ status: 200, type: [ClassBonuses] })
  @Get(':class_id/bonus')
  async getClassBonuses(@Param('class_id') class_id: number) {
    return await this.classService.getClassBonuses(class_id);
  }
}
