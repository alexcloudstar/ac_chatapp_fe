import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreatePunishDto } from './dto/create-punish.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { JwtAuthGuard } from '../utils/jwt/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  makeAdmin(@Body('email') email: string) {
    return this.adminService.toggleAdmin(email);
  }

  @UseGuards(JwtAuthGuard)
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
