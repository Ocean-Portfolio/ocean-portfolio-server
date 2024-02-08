import { ContactTable } from 'src/dto/contact.dto';
import { ContactService } from './contact.service';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => ContactTable)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query(() => [ContactTable])
  async getContact(): Promise<ContactTable[]> {
    return await this.contactService.findAll();
  }

  @Query(() => ContactTable)
  async getContactByCategoryId(
    @Args('category_id') categoryId: number,
  ): Promise<ContactTable> {
    return await this.contactService.findByCategoryId(categoryId);
  }

  @Query(() => ContactTable)
  async getContactBySectionId(
    @Args('section_id') sectionId: number,
  ): Promise<ContactTable> {
    return await this.contactService.findBySectionId(sectionId);
  }

  @Query(() => [ContactTable])
  async getContactByTitle(
    @Args('email') email: string,
  ): Promise<ContactTable[]> {
    return await this.contactService.findByEmail(email);
  }

  @Query(() => ContactTable)
  async getContactById(@Args('id') id: number): Promise<ContactTable> {
    return await this.contactService.findById(id);
  }
}
