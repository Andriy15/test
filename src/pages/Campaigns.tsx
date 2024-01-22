import {Link} from "react-router-dom";
import { useCampaigns } from "../service/data.service.ts";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {useEffect, useState} from 'react';
import { DateTime } from 'luxon';
import {PaginationComponent} from "../shared/Pagination.tsx";
import {Campaign} from "../service/models.ts";
import {FilterComponent} from "../shared/Filtration.tsx";
import {DropdownItem} from "react-bootstrap";
import {CAMPAIGN_OPTIONS, Options} from "./constants.tsx";
import {SortingComponent} from "../shared/Sorting.tsx";

interface Props {
  profileId: number
}

export const Campaigns = ({ profileId }: Props) => {
  const { loadingCampaigns, errorCampaigns, campaigns } = useCampaigns(profileId)
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const campaignsPerPage = 2

  const indexOfLastCampaign = currentPage * campaignsPerPage
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage

  const currentCampaigns = filteredCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign)

  const handlePageChange = (pageNumber: number): void => {
    campaigns.pagination.currentPage = pageNumber
    setCurrentPage(pageNumber)
  }

  const setPagination = (data: Campaign[], currentPage = 1): void => {
    campaigns.pagination.currentPage = currentPage
    campaigns.pagination.totalPages = data.length
  }

  useEffect(() => {
    if (campaigns.data) {
      setFilteredCampaigns(campaigns.data)
    }
  }, [campaigns.data])

  const handleFilterChange = (filterValue: string): void => {
    if (filterValue === '') {
      setPagination(campaigns.data)
      setFilteredCampaigns(campaigns.data)
    } else {
      const filteredCampaigns = campaigns.data.filter(campaign => {
        const campaignDate = DateTime.fromISO(campaign.date)
        const filterDate = DateTime.fromISO(filterValue)

        return campaignDate.hasSame(filterDate, 'day')
      })
      setPagination(filteredCampaigns)
      setFilteredCampaigns(filteredCampaigns)
    }
  }

  if (filteredCampaigns.length === 0) {
    return (
       <div className="container mt-4">
         <h1>Campaigns</h1>
         <FilterComponent title='Select date'>
           {CAMPAIGN_OPTIONS[Options.filter].map(option => (
              <DropdownItem key={option} onClick={() => handleFilterChange(option)}>
                {option || 'Without filter'}
              </DropdownItem>
           ))}
         </FilterComponent>
         <div className="alert alert-info">No campaigns found</div>
         <Link to='/'>
           <Button variant="outline-primary" className='mt-3'>Back to Accounts</Button>
         </Link>
       </div>
    )
  }

  const handleSortChange = (sortValue: string): void => {
    if (sortValue === 'Without sort') {
      setPagination(campaigns.data)
      setFilteredCampaigns(campaigns.data)
    } else if (sortValue === 'From low to high') {
        const sortedCampaigns = [...filteredCampaigns].sort((a, b) => a.cost - b.cost)
        setPagination(sortedCampaigns)
        setFilteredCampaigns(sortedCampaigns)
    } else if (sortValue === 'From high to low') {
        const sortedCampaigns = [...filteredCampaigns].sort((a, b) => b.cost - a.cost)
        setPagination(sortedCampaigns)
        setFilteredCampaigns(sortedCampaigns)
    }
  }

  return (
     <div className="container mt-4">
       {loadingCampaigns && <div className="alert alert-info">Loading...</div>}
       {errorCampaigns && <div className="alert alert-danger">Something went wrong</div>}
       <div className='d-flex justify-content-end'>
         <FilterComponent title='Select date'>
           {CAMPAIGN_OPTIONS[Options.filter].map(option => (
              <DropdownItem key={option} onClick={() => handleFilterChange(option)}>
                {option || 'Without filter'}
              </DropdownItem>
           ))}
         </FilterComponent>
         <SortingComponent title='Sort by cost'>
            {CAMPAIGN_OPTIONS[Options.sort].map(option => (
                <DropdownItem key={option} onClick={() => handleSortChange(option)}>
                {option}
                </DropdownItem>
            ))}
         </SortingComponent>
       </div>
       {currentCampaigns && (
          <div>
            <h1 className="mb-4">Campaigns</h1>
            <ListGroup>
              {currentCampaigns.map((campaign) => (
                 <ListGroup.Item key={campaign.campaignId}>
                   <h5>
                     {campaign.campaignId}
                   </h5>
                   <p>Campaign ID: {campaign.campaignId}</p>
                   <p>Clicks: {campaign.clicks}</p>
                   <p>Cost: {campaign.cost}</p>
                   <p>Date: {DateTime.fromISO(campaign.date).toLocaleString(DateTime.DATE_MED)}</p>
                 </ListGroup.Item>
              ))}
            </ListGroup>
            <PaginationComponent pagination={campaigns.pagination} handlePageChange={handlePageChange} countPerPage={campaignsPerPage} />
            <Link to='/'>
              <Button variant="outline-primary" className='mt-3'>Back to Accounts</Button>
            </Link>
          </div>
       )}
     </div>
  )
}