import Pagination from 'react-bootstrap/Pagination'
import {PaginationProps} from "./models.ts";

export const PaginationComponent = ({ currentPage, totalPages, handlePageChange }: PaginationProps) => {
  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
       <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
         {number}
       </Pagination.Item>,
    )
  }

  return <Pagination>{paginationItems}</Pagination>
}