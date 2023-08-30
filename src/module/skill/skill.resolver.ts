import { Args, Query, Resolver } from '@nestjs/graphql';
import { SkillTable } from 'src/dto/skill.dto';
import { SkillService } from './skill.service';

@Resolver(() => SkillTable)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Query(() => [SkillTable])
  async getSkills(): Promise<SkillTable[]> {
    return await this.skillService.findAll();
  }

  @Query(() => [SkillTable])
  async getSkillsByCategoryId(
    @Args('category_id') categoryId: number,
  ): Promise<SkillTable[]> {
    return await this.skillService.findByCategoryId(categoryId);
  }

  @Query(() => [SkillTable])
  async getSkillsByTitle(@Args('name') name: string): Promise<SkillTable[]> {
    return await this.skillService.findByName(name);
  }

  @Query(() => SkillTable)
  async getSkillById(@Args('id') id: number): Promise<SkillTable> {
    return await this.skillService.findById(id);
  }
}
