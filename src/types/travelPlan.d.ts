interface PlanItem {
  title: string;
  content?: string | null;
  planDate: {
    day: string;
    time?: string | null;
  };
  billingList?: {
    billingTitle: string;
    bill: num;
  }[];
}
