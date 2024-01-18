import {Link} from "react-router-dom";
import {useProfiles} from "../feature/service/data.service.ts";

interface ProfilesProps {
  accountId: number;
}

export function Profiles({ accountId }: ProfilesProps) {
  const {loadingProfiles, errorProfiles, profiles} = useProfiles(accountId)

  return (
     <div>
       {loadingProfiles && <div>Loading...</div>}
       {errorProfiles && <div>Something went wrong</div>}
       {profiles && (
          <div>
            <h1>Profiles</h1>
            <ul>
              {profiles.map((profile) => (
                 <li key={profile.profileId}>
                   <Link to={`/campaigns/${profile.profileId}`}>{profile.marketplace}</Link>
                 </li>
              ))}
            </ul>
          </div>
       )}
     </div>
  )
}