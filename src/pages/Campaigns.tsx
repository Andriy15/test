import {Link} from "react-router-dom";
import {useCampaigns} from "../feature/service/data.service.ts";

interface CampaignsProps {
  profileId: number;
}

export function Campaigns({ profileId }: CampaignsProps) {
  const {loadingCampaigns, errorCampaigns, campaigns} = useCampaigns(profileId)

  return (
     <div>
       {loadingCampaigns && <div>Loading...</div>}
       {errorCampaigns && <div>Something went wrong</div>}
       {campaigns && (
          <div>
            <h1>Campaigns</h1>
            <ul>
              {campaigns.map((campaign) => (
                 <li key={campaign.campaignId}>
                   <Link to={`/`}>{campaign.campaignId}</Link>
                 </li>
              ))}
            </ul>
          </div>
       )}
     </div>
  )
}