import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/db';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers():User[] {
    return this.userService.getUsers();
  }

  @Get('/:userId')
  getUser(@Param('userId') userId:string):User{
    return this.userService.getUser(userId)
  }

  @Post()
  addUser(@Body() user:UserDto):User{
    return this.userService.addUser(user)
  }

  @Put('/:userId')
  updateUser(@Param('userId') userId:string, @Body() updatedObj:Partial<UserDto>):User{
    return this.userService.updateUser(userId,updatedObj)
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId:string):User{
    return this.userService.deleteUser(userId)
  }
}
