import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Lvl } from './lvl.model';
import { LvlService } from './lvl.service';

@ApiTags('Lvl')
@Controller('/lvl')
export class LvlController {
  constructor(private readonly lvlService: LvlService) {}

  @ApiOperation({ summary: 'Получение уровня' })
  @ApiResponse({ status: 200, type: Lvl })
  @Get(':lvl')
  async getLvl(@Param('lvl') lvl: number) {
    return await this.lvlService.getLvl(lvl);
  }

  @ApiOperation({ summary: 'Получение списка уровней' })
  @ApiResponse({ status: 200, type: [Lvl] })
  @Get()
  async getLvls() {
    return await this.lvlService.getLvls();
  }
}
