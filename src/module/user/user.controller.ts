import { Body, Controller, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserTable } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  async updateUserById(@Body() input: UserTable) {
    return await this.userService.updateUserById(input);
  }
}
