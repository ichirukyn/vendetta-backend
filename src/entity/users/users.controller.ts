import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Users')
@Controller('/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }
  
  // @ApiOperation({ summary: 'Авторизация' })
  // @ApiResponse({ status: 200, type: String })
  // @Post()
  // async signIn(@Body() data: SignInDto) {
  //   return await this.userService.signIn(data);
  // }
  //
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
  
  @ApiOperation({ summary: 'Получение пользователя по chat_id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':chat_id')
  async getUser(@Param('chat_id') chat_id: string) {
    return await this.userService.getUser(chat_id);
  }
  
  @ApiOperation({ summary: 'Получение chat_id пользователя по user_id' })
  @ApiResponse({ status: 200 })
  @Get(':user_id/chat_id')
  async getUserChatId(@Param('user_id') user_id: number) {
    return await this.userService.getUserChatId(user_id);
  }
  
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
  
  
  // Hero
  @ApiOperation({ summary: 'Получение пользователя по chat_id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:user_id/hero')
  async getUserHero(@Param('user_id') user_id: number) {
    return await this.userService.getUserHero(user_id);
  }
}
