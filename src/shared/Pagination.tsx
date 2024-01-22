import Pagination from 'react-bootstrap/Pagination'
import {PaginationProps} from "../service/models.ts";

interface Props {
    pagination: PaginationProps,
    countPerPage: number;
    handlePageChange: (pageNumber: number) => void;
}

export const PaginationComponent = ({ pagination, countPerPage, handlePageChange }: Props) => {
  const totalPages = Math.ceil(pagination.totalPages / countPerPage)

  if (totalPages <= 1) {
    return
  }

  let paginationItems = []
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
       <Pagination.Item key={page} active={page === pagination.currentPage} onClick={() => handlePageChange(page)}>
         {page}
       </Pagination.Item>
    )
  }
  return <Pagination>{paginationItems}</Pagination>
}