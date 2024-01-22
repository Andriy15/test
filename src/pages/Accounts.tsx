import {Link} from "react-router-dom";
import { useAccounts } from "../service/data.service.ts";
import { Account } from "../service/models.ts";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { DateTime } from 'luxon'
import { useState, useEffect } from 'react';
import {PaginationComponent} from "../shared/Pagination.tsx";
import {FilterComponent} from "../shared/Filtration.tsx";
import {Dropdown} from "react-bootstrap";
import {SortingComponent} from "../shared/Sorting.tsx";
import {ACCOUNT_OPTIONS, Options} from "./constants.tsx";

export const Accounts = () => {
  const { loadingAccounts, errorAccounts, accounts } = useAccounts()
  const [filteredAccount, setFilteredAccount] = useState<Account[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const accountsPerPage = 2

  const indexOfLastAccount = currentPage * accountsPerPage
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage

  const currentAccounts =  filteredAccount.slice(indexOfFirstAccount, indexOfLastAccount)

  const setPagination = (data: Account[], currentPage = 1): void => {
    accounts.pagination.currentPage = currentPage;
    accounts.pagination.totalPages = data.length;
  }

  useEffect(() => {
    if (accounts.data) {
      setFilteredAccount(accounts.data)
    }
  }, [accounts.data])

  const handlePageChange = (pageNumber: number): void => {
    accounts.pagination.currentPage = pageNumber;
    setCurrentPage(pageNumber);
  }
  const handleFilterChange = (filterValue: string): void => {
    if (filterValue === 'Without filter') {
      setPagination(accounts.data)
      setFilteredAccount(accounts.data)
    } else {
      const filteredAccounts = accounts.data.filter(account => {
        const accountCreationDate = DateTime.fromISO(account.creationDate)
        const filterDate = DateTime.fromISO(filterValue)

        return accountCreationDate.hasSame(filterDate, 'day')
      })
      setPagination(filteredAccounts)
      setFilteredAccount(filteredAccounts)
    }
  }

  if (filteredAccount.length === 0) {
    return (
       <div className="container mt-4">
         <h1>Accounts</h1>
         <FilterComponent title='Select date'>
           {ACCOUNT_OPTIONS[Options.filter].map(option => (
              <Dropdown.Item key={option} onClick={() => handleFilterChange(option)}>
                {option}
              </Dropdown.Item>
           ))}
         </FilterComponent>
         <div className='alert alert-info'>No accounts found</div>
       </div>
    )
  }

  const handleSortChange = (sortValue: string): void => {
    if (sortValue === 'asc') {
        const sortedAccounts = [...filteredAccount].sort((a, b) => {
          return a.email.localeCompare(b.email)
        })
        setPagination(sortedAccounts)
        setFilteredAccount(sortedAccounts)
    } else {
        const sortedAccounts = [...filteredAccount].sort((a, b) => {
          return b.email.localeCompare(a.email)
        })
        setPagination(sortedAccounts)
        setFilteredAccount(sortedAccounts)
    }
  }


  return (
     <div className="container mt-4">
       {loadingAccounts && <div className='alert alert-info'>Loading...</div>}
       {errorAccounts && <div className="alert alert-danger">Something went wrong</div>}
       <div className='d-flex justify-content-end'>
         <FilterComponent title='Select date'>
           {ACCOUNT_OPTIONS[Options.filter].map(option => (
              <Dropdown.Item key={option} onClick={() => handleFilterChange(option)}>
                {option}
              </Dropdown.Item>
           ))}
         </FilterComponent>
         <SortingComponent title={'Sort by email'}>
            {ACCOUNT_OPTIONS[Options.sort].map(option => (
              <Dropdown.Item key={option} onClick={() => handleSortChange(option)}>
                {option}
              </Dropdown.Item>
            ))}
         </SortingComponent>
       </div>
       {currentAccounts && (
          <div>
            <h1>Accounts</h1>
            <ListGroup className='mb-3'>
              {currentAccounts.map((account: Account) => (
                 <ListGroup.Item key={account.accountId}>
                   <div>
                     <h5>
                       {account.email}
                       <Link to={`${account.accountId}/profiles`}>
                         <Button variant="outline-primary" style={{ marginLeft: '10px' }}>View Profiles</Button>
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
            <PaginationComponent pagination={accounts.pagination} countPerPage={accountsPerPage} handlePageChange={handlePageChange}  />
          </div>
       )}
     </div>
  )
}