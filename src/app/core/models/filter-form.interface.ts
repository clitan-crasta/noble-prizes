export interface FilterFormValue {
  nobelPrizeYear?: string | null;
  yearTo?: string | null;
  nobelPrizeCategory?: string | null;
}

export interface IfilterEvent {
  pageIndex: number;
  pageSize: number;
  filterEvent: object;
}
