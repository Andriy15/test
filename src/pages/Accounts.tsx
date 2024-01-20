import {Link} from "react-router-dom";
import { useAccounts } from "../feature/service/data.service.ts";
import { Account } from "../feature/service/models.ts";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { DateTime } from 'luxon'
import { useState, useEffect } from 'react';
import {PaginationComponent} from "../shared/Pagination.tsx";
import {FilterComponent} from "../shared/Filtration.tsx";
// import Dropdown from "react-bootstrap/Dropdown";

export const Accounts = () => {
  const { loadingAccounts, errorAccounts, accounts } = useAccounts()
  const [filtredAccount, setFiltredAccount] = useState<Account[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const accountsPerPage = 2

  useEffect(() => {
    setFiltredAccount(accounts)
  }, [accounts])

  const indexOfLastAccount = currentPage * accountsPerPage
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage
  const currentAccounts = filtredAccount.slice(indexOfFirstAccount, indexOfLastAccount)

  const totalPages = Math.ceil(filtredAccount.length / accountsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }
  const handleFilterChange = (filterValue: string) => {
    const filteredAccounts = accounts.filter(account => {
      const accountCreationDate = DateTime.fromISO(account.creationDate)
      const filterDate = DateTime.fromISO(filterValue)
      return accountCreationDate.hasSame(filterDate, 'day')
    })
    setFiltredAccount(filteredAccounts)
  }

  if (filtredAccount.length === 0) {
    return (
       <div className="container mt-4">
         <h1>Accounts</h1>
         <div className='alert alert-info'>No accounts found</div>
       </div>
    )
  }

  return (
     <div className="container mt-4">
       {loadingAccounts && <div className='alert alert-info'>Loading...</div>}
       {errorAccounts && <div className="alert alert-danger">Something went wrong</div>}
       <FilterComponent handleFilterChange={handleFilterChange}>
         Select date
       </FilterComponent>
       {currentAccounts && (
          <div>
            <h1>Accounts</h1>
            <ListGroup>
              {currentAccounts.map((account: Account) => (
                 <ListGroup.Item key={account.accountId}>
                   <div>
                     <h5>
                       {account.email}
                       <Link to={`/profiles/${account.accountId}`}>
                         <Button variant="outline-primary" className='m-lg-3'>View Profiles</Button>
                       </Link>
                     </h5>
                     <p>Auth-token: {account.authToken}</p>
                     <p>Email: {account.email}</p>
                     <p>Created: {DateTime.fromISO(account.creationDate).toLocaleString(DateTime.DATE_MED)}</p>
                     <p>Account ID: {account.accountId}</p>
                   </div>
                 </ListGroup.Item>
              ))}
            </ListGroup>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
          </div>
       )}
     </div>
  )
}