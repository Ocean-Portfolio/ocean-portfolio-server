import { InputType, Field } from '@nestjs/graphql';
import { PlanDate } from './travelPlanItem.dto';

@InputType()
class InputPlanDate extends PlanDate {
  @Field()
  plan_date: string;

  @Field({ nullable: true })
  plan_time?: string;
}

@InputType()
class InputBillingItem {
  @Field()
  billing_title: string;

  @Field()
  bill: number;
}

@InputType()
export class TravelPlanItemInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => InputPlanDate, { nullable: true })
  planning?: InputPlanDate;

  @Field(() => [InputBillingItem])
  billing_list: InputBillingItem[];
}
