import {Route, Routes, useParams} from "react-router-dom";
import {Accounts} from "./pages/Accounts.tsx";
import {Profiles} from "./pages/Profiles.tsx";
import {Campaigns} from "./pages/Campaigns.tsx";

const App = () => {
  return (
     <Routes>
       <Route path='/' element={<Accounts /> } />
       <Route path=':accountId/profiles' element={<ProfilesWrapper /> } />
       <Route path=':accountId/profiles/:profileId' element={<CampaignsWrapper /> } />
     </Routes>
  )
}

const ProfilesWrapper = () => {
  const { accountId } = useParams()
  return <Profiles accountId={Number(accountId)} />
}

const CampaignsWrapper = () => {
  const { profileId } = useParams()
  return <Campaigns profileId={Number(profileId)} />
}

export default App