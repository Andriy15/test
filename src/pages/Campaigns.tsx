import {Link} from "react-router-dom";
import { useCampaigns } from "../feature/service/data.service.ts";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from 'react';
import { DateTime } from 'luxon';
import {CampaignsProps} from "./models.ts";
import {PaginationComponent} from "../shared/Pagination.tsx";

export const Campaigns = ({ profileId }: CampaignsProps) => {
  const { loadingCampaigns, errorCampaigns, campaigns } = useCampaigns(profileId)
  const [currentPage, setCurrentPage] = useState(1)
  const campaignsPerPage = 2

  const indexOfLastCampaign = currentPage * campaignsPerPage
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage
  const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign)

  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
     <div className="container mt-4">
       {loadingCampaigns && <div className="alert alert-info">Loading...</div>}
       {errorCampaigns && <div className="alert alert-danger">Something went wrong</div>}
       {currentCampaigns && (
          <div>
            <h1 className="mb-4">Campaigns</h1>
            <ListGroup>
              {currentCampaigns.map((campaign) => (
                 <ListGroup.Item key={campaign.campaignId}>
                   <h5>
                     {campaign.campaignId}
                   </h5>
                   <p>Clicks: {campaign.clicks}</p>
                   <p>Cost: {campaign.cost}</p>
                   <p>Date: {DateTime.fromISO(campaign.date).toLocaleString(DateTime.DATE_MED)}</p>
                 </ListGroup.Item>
              ))}
            </ListGroup>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            <Link to='/'>
              <Button variant="outline-primary" className='mt-3'>Back to Accounts</Button>
            </Link>
          </div>
       )}
     </div>
  )
}