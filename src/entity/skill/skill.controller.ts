import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';

@ApiTags('Skill')
@Controller('/skill')
export class SkillController {
  constructor(private readonly userService: SkillService) {}

  @ApiOperation({ summary: 'Получение навыка по id' })
  @ApiResponse({ status: 200, type: Skill })
  @Get(':skill_id')
  async getSkill(@Param('skill_id') skill_id: number) {
    return await this.userService.getSkill(skill_id);
  }

  @ApiOperation({ summary: 'Получение списка навыков' })
  @ApiResponse({ status: 200, type: [Skill] })
  @Get()
  async getSkills() {
    return await this.userService.getSkills();
  }
}
