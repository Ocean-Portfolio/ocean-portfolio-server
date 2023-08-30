import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProjectTable } from 'src/dto/project.dto';
import { ProjectService } from './project.service';

@Resolver(() => ProjectTable)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectTable])
  async getProjects(): Promise<ProjectTable[]> {
    return await this.projectService.findAll();
  }

  @Query(() => [ProjectTable])
  async getProjectsByCategoryId(
    @Args('section_id') sectionId: number,
  ): Promise<ProjectTable[]> {
    return await this.projectService.findByCategoryId(sectionId);
  }

  @Query(() => [ProjectTable])
  async getProjectsByName(@Args('name') name: string): Promise<ProjectTable[]> {
    return await this.projectService.findByName(name);
  }

  @Query(() => ProjectTable)
  async getProjectById(@Args('id') id: number): Promise<ProjectTable> {
    return await this.projectService.findById(id);
  }

  @Query(() => ProjectTable)
  async getProjectByMainMode(): Promise<ProjectTable> {
    return await this.projectService.findByMainMode();
  }
}
