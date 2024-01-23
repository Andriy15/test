import {Link} from "react-router-dom";
import { useProfiles } from "../service/data.service.ts";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {useCallback, useEffect, useMemo, useState} from 'react';
import {PaginationComponent} from "../shared/Pagination.tsx";
import {Profile} from "../service/models.ts";
import {FilterComponent} from "../shared/Filtration.tsx";
import {Dropdown} from "react-bootstrap";
import {Options, PROFILE_OPTIONS} from "./constants.tsx";
import {SortingComponent} from "../shared/Sorting.tsx";

interface Props {
  accountId: number
}

export const Profiles = ({ accountId }: Props) => {
  const { loadingProfiles, errorProfiles, profiles } = useProfiles(accountId)
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const profilesPerPage = 2

  const indexOfLastProfile = currentPage * profilesPerPage
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage

  const currentProfiles = useMemo(() => filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile), [filteredProfiles, indexOfFirstProfile, indexOfLastProfile])

  const setPagination = useCallback((data: Profile[], currentPage = 1): void => {
    profiles.pagination.currentPage = currentPage
    profiles.pagination.totalPages = data.length
  }, [profiles.pagination])
  const handlePageChange = (pageNumber: number): void => {
    profiles.pagination.currentPage = pageNumber
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    if (profiles.data) {
      setFilteredProfiles(profiles.data)
    }
  }, [profiles.data])

  const handleFilterChange = (filterValue: string): void => {
    if (filterValue === 'Without filter') {
      setPagination(profiles.data)
      setFilteredProfiles(profiles.data)
    } else {
      const filteredProfiles = profiles.data.filter(profile => {
        const profileCountry = profile.country
        return profileCountry === filterValue
      })
      setPagination(filteredProfiles)
      setFilteredProfiles(filteredProfiles)
    }
  }

  if (filteredProfiles.length === 0) {
    return (
       <div className="container mt-4">
         <h1>Profiles</h1>
         <FilterComponent title='Select country'>
           {PROFILE_OPTIONS[Options.filter].map(option => (
              <Dropdown.Item key={option} onClick={() => handleFilterChange(option)}>
                {option}
              </Dropdown.Item>
           ))}
         </FilterComponent>
         <div className="alert alert-info">No profiles found</div>
       </div>
    )
  }

  const handleSortChange = (sortValue: string): void => {
    if (sortValue === 'Without sort') {
      setPagination(profiles.data)
      setFilteredProfiles(profiles.data)
    }
    if (sortValue === 'Sort by country') {
        const sortedProfiles = [...filteredProfiles].sort((a, b) => {
            if (a.country < b.country) {
              return -1
            }
            if (a.country > b.country) {
              return 1
            }
            return 0
        })
        setPagination(sortedProfiles)
        setFilteredProfiles(sortedProfiles)
    }
    if (sortValue === 'Sort by marketplace') {
        const sortedProfiles = [...filteredProfiles].sort((a, b) => {
            if (a.marketplace < b.marketplace) {
              return -1
            }
            if (a.marketplace > b.marketplace) {
              return 1
            }
            return 0
        })
        setPagination(sortedProfiles)
        setFilteredProfiles(sortedProfiles)
    }
  }

  return (
     <div className="container mt-4">
       {loadingProfiles && <div className="alert alert-info">Loading...</div>}
       {errorProfiles && <div className="alert alert-danger">Something went wrong</div>}
       <div className='d-flex justify-content-end'>
         <FilterComponent title='Select country'>
            {PROFILE_OPTIONS[Options.filter].map(option => (
              <Dropdown.Item key={option} onClick={() => handleFilterChange(option)}>
                {option}
              </Dropdown.Item>
            ))}
          </FilterComponent>
         <SortingComponent title='Sort by'>
            {PROFILE_OPTIONS[Options.sort].map(option => (
            <Dropdown.Item key={option} onClick={() => handleSortChange(option)}>
                {option}
            </Dropdown.Item>
            ))}
          </SortingComponent>
       </div>
       {currentProfiles && (
          <div>
            <h1 className="mb-4">Profiles</h1>
            <ListGroup className='mb-3'>
              {currentProfiles.map((profile: Profile) => (
                 <ListGroup.Item key={profile.country}>
                   <h5>
                     {profile.marketplace}
                     <Link to={`/${accountId}/profiles/${profile.profileId}`} className="text-decoration-none">
                       <Button variant="outline-primary" style={{ marginLeft: '10px' }}>View Campaigns</Button>
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
            <PaginationComponent pagination={profiles.pagination} countPerPage={profilesPerPage} handlePageChange={handlePageChange}  />
          </div>
       )}
     </div>
  );
}