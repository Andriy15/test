import {Link} from "react-router-dom";
import { useProfiles } from "../feature/service/data.service.ts";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from 'react';
import {ProfilesProps} from "./models.ts";
import {PaginationComponent} from "../shared/Pagination.tsx";

export const Profiles = ({ accountId }: ProfilesProps) => {
  const { loadingProfiles, errorProfiles, profiles } = useProfiles(accountId)
  const [currentPage, setCurrentPage] = useState(1)
  const profilesPerPage = 2

  const indexOfLastProfile = currentPage * profilesPerPage
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile)

  const totalPages = Math.ceil(profiles.length / profilesPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
     <div className="container mt-4">
       {loadingProfiles && <div className="alert alert-info">Loading...</div>}
       {errorProfiles && <div className="alert alert-danger">Something went wrong</div>}
       {currentProfiles && (
          <div>
            <h1 className="mb-4">Profiles</h1>
            <ListGroup>
              {currentProfiles.map((profile) => (
                 <ListGroup.Item key={profile.country}>
                   <h5>
                     {profile.marketplace}
                     <Link to={`/campaigns/${profile.profileId}`} className="text-decoration-none">
                       <Button variant="outline-primary" className='m-lg-3'>View Campaigns</Button>
                     </Link>
                   </h5>
                   <p>
                     <strong>Profile id:</strong> {profile.profileId}
                   </p>
                   <p>
                     <strong>Marketplace:</strong> {profile.marketplace}
                   </p>
                   <p>
                     <strong>Country:</strong> {profile.country}
                   </p>
                 </ListGroup.Item>
              ))}
            </ListGroup>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}  />
          </div>
       )}
     </div>
  );
}