import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Res,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('auth/registration')
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    {
      return this.usersService.registration(createUserDto, res);
    }
  }
  @HttpCode(200)
  @Post('auth/login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    {
      return this.usersService.login(loginDto, res);
    }
  }
  @HttpCode(HttpStatus.OK)
  @Post('auth/logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    {
      return this.usersService.logout(refreshToken, res);
    }
  }
  @Get('users/activate/:link')
  activate(@Param('link') link: string) {
    {
      return this.usersService.activate(link);
    }
  }
  @Get('users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Get('users/:id')
  getOneUser(@Param('id') id: string) {
    return this.usersService.getOneUser(id);
  }
  @Put('users/:id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.updateUser(updateUserDto, +id);
  }
  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }
  @Post(':id/refresh')
  refresh(@Param('id') id: string, @CookieGetter('refresh_token') refreshToken:string) {
    return this.usersService.removeUser(+id);
  }
}
