import { Injectable } from '@nestjs/common';
import { QueryResult } from 'pg';
import { DatabaseService } from 'src/database.service';
import { BillingTable, TravelPlanTable } from 'src/dto/travelPlanItem.dto';
import { TravelPlanItemInput } from 'src/dto/travelPlanItemInput.dto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class TravelPlanService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createTravelPlan(planItemInput: TravelPlanItemInput) {
    const { title, content, planning, billing_list } = planItemInput;
    try {
      const travelPlanItem = await this.databaseService.query<TravelPlanTable>(
        'INSERT INTO travel_plan(title, content, plan_date, plan_time) VALUES($1, $2, $3, $4) RETURNING *',
        [title, content, planning.plan_date, planning.plan_time],
      );

      const { id } = travelPlanItem.rows[0];

      const billingList = await Promise.all(
        billing_list.map((billing) =>
          this.databaseService.query<BillingTable>(
            'INSERT INTO travel_plan_bills(travel_plan_id, billing_title, bill) VALUES($1, $2, $3) RETURNING *',
            [id, billing.billing_title, billing.bill],
          ),
        ),
      );

      const getTravelPlanItem = (
        travelPlanItem: QueryResult<TravelPlanTable>,
      ) => {
        const {
          id,
          title,
          content,
          plan_date,
          plan_time,
          created_at,
          updated_at,
        } = travelPlanItem.rows[0];

        return {
          id,
          title,
          content,
          plan_date: dayjs(plan_date).format('YYYY-MM-DD HH:mm:ss.SSS'),
          plan_time,
          created_at: dayjs(created_at).format('YYYY-MM-DD HH:mm:ss.SSS'),
          updated_at: dayjs(updated_at).format('YYYY-MM-DD HH:mm:ss.SSS'),
        };
      };

      const getBillingList = (billingList: QueryResult<BillingTable>[]) => {
        return billingList.map((billing) => {
          return {
            ...billing.rows[0],
            created_at: dayjs(billing.rows[0].created_at).format(
              'YYYY-MM-DD HH:mm:ss.SSS',
            ),
            updated_at: dayjs(billing.rows[0].updated_at).format(
              'YYYY-MM-DD HH:mm:ss.SSS',
            ),
          };
        });
      };

      const travelItem = getTravelPlanItem(travelPlanItem);

      const result = {
        ...travelItem,
        planning: {
          plan_date: travelItem.plan_date,
          plan_time: travelItem.plan_time,
        },
        billing_list: getBillingList(billingList),
      };

      console.log(result, 'result');
      return result;
    } catch (error) {
      console.error('Error executing query', error);
      return null;
    }
  }
}
