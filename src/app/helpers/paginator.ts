export interface Paginator {
  page: number;
  last_page: number;
  from: number;
  to: number;
  limit: number;
  total: number;
  has_more_pages: boolean;
  is_first_page: boolean;
}
