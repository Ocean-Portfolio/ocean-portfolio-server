import { Body, Controller, Patch } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactTable } from 'src/dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Patch()
  async updateContactById(@Body() input: ContactTable) {
    return await this.contactService.updateContactById(input);
  }
}
