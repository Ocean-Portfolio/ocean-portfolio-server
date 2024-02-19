import { Body, Controller, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectTable } from 'src/dto/project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Put()
  async putProjectById(@Body() input: ProjectTable): Promise<ProjectTable> {
    return await this.projectService.putProjectById(input);
  }

  @Post()
  async createProject(@Body() input: ProjectTable): Promise<ProjectTable> {
    return await this.projectService.createProject(input);
  }
}
