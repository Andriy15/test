import {Route, Routes, useParams} from "react-router-dom";
import {Accounts} from "./pages/Accounts.tsx";
import {Profiles} from "./pages/Profiles.tsx";
import {Campaigns} from "./pages/Campaigns.tsx";

function App() {
  return (
     <Routes>
       <Route path='/' element={<Accounts /> } />
       <Route path='/profiles/:accountId' element={<ProfilesWrapper /> } />
       <Route path='/campaigns/:profileId' element={<CampaignsWrapper /> } />
     </Routes>
  )
}

function ProfilesWrapper() {
  const { accountId } = useParams();
  return <Profiles accountId={Number(accountId)} />
}

function CampaignsWrapper() {
  const { profileId } = useParams();
  return <Campaigns profileId={Number(profileId)} />
}

export default App