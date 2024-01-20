export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

export interface FilterProps {
  handleFilterChange: (filterValue: string) => void;
  children: React.ReactNode;
}