import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TravelPlanItem } from 'src/dto/travelPlanItem.dto';
import { TravelPlanItemInput } from 'src/dto/travelPlanItemInput.dto';
import { TravelPlanService } from 'src/service/travelPlan.service';

@Resolver()
export class TravelPlanResolver {
  constructor(private readonly travelPlanService: TravelPlanService) {}

  @Mutation(() => TravelPlanItem)
  create_plan_item(
    @Args('planItemInput') planItemInput: TravelPlanItemInput,
  ): Promise<TravelPlanItem> {
    return this.travelPlanService.createTravelPlan(planItemInput);
  }
}
