import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreatePunishDto } from './dto/create-punish.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Post()
  makeAdmin(@Body('email') email: string) {
    return this.adminService.toggleAdmin(email);
  }

  @Post('punish')
  punishUser(@Body() body: CreatePunishDto, @CurrentUser() currentUser) {
    return this.adminService.punishUser(
      +body.chatroomId,
      currentUser,
      +body.userId,
      body.reason,
      body.type,
      body.duration,
    );
  }
}
