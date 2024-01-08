import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Skill } from '../skill/skill.model';
import { TechniqueService } from './technique.service';
import { Technique } from './technique.model';
import { CreateTechniqueDto } from './dto/create-technique';
import { Effect } from '../effect/effect.model';
import { CreateTechniqueEffectDto } from './dto/create-technique-effect';

@ApiTags('Technique')
@Controller('technique')
export class TechniqueController {
  constructor(private readonly techniqueService: TechniqueService) {
  }
  
  @ApiOperation({ summary: 'Создание техники' })
  @ApiResponse({ status: 200, type: Technique })
  @Post('/')
  async createTechnique(@Body() createTechniqueDto: CreateTechniqueDto) {
    return await this.techniqueService.createTechnique(createTechniqueDto);
  }
  
  @ApiOperation({ summary: 'Создание бонуса техники' })
  @ApiResponse({ status: 200, type: Effect })
  @Post('/:technique_id/effect')
  async createTechniqueBonus(@Body() createTechniqueEffectDto: CreateTechniqueEffectDto, @Param('technique_id') technique_id: number) {
    return await this.techniqueService.createTechniqueEffect(createTechniqueEffectDto, technique_id);
  }
  
  @ApiOperation({ summary: 'Получение техники по id' })
  @ApiResponse({ status: 200, type: Skill })
  @Get(':technique_id')
  async getTechnique(@Param('technique_id') technique_id: number) {
    return await this.techniqueService.getTechnique(technique_id);
  }
  
  @ApiOperation({ summary: 'Получение списка техник' })
  @ApiResponse({ status: 200, type: [Skill] })
  @Get()
  async getTechniques() {
    return await this.techniqueService.getTechniques();
  }
}
