import {Account, Campaign, Profile} from "./module.ts";

const accountsData: Account[] = [
  {
    accountId: 1,
    email: "example1@example.com",
    authToken: "authToken1",
    creationDate: "2024-01-18"
  },
  {
    accountId: 2,
    email: "example2@example.com",
    authToken: "authToken2",
    creationDate: "2024-01-19"
  },
]

const profilesData: Profile[] = [
  {
    profileId: 101,
    country: "USA",
    marketplace: "Amazon",
    accountId: 1
  },
  {
    profileId: 102,
    country: "UK",
    marketplace: "eBay",
    accountId: 2
  },
  {
    profileId: 102,
    country: "Ukraine",
    marketplace: "Olx",
    accountId: 2
  },
  {
    profileId: 103,
    country: "China",
    marketplace: "AliExpress",
    accountId: 1
  },
]

const campaignsData: Campaign[] = [
  {
    campaignId: 1001,
    clicks: 150,
    cost: 500,
    date: "2024-01-18",
    profileId: 101
  },
  {
    campaignId: 1002,
    clicks: 120,
    cost: 450,
    date: "2024-01-19",
    profileId: 102
  },
  {
    campaignId: 1003,
    clicks: 200,
    cost: 600,
    date: "2024-01-20",
    profileId: 102
  },
  {
    campaignId: 1004,
    clicks: 180,
    cost: 550,
    date: "2024-01-21",
    profileId: 103
  },
]

export const getAccountsData = (): Promise<Account[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(accountsData);
    }, 500);
  });
}

export const getProfilesData = (accountId: number): Promise<Profile[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const selectedProfiles = profilesData.filter(profile => profile.accountId === accountId)
      resolve(selectedProfiles)
    }, 500)
  })
}

export const getCampaignsData = (profileId: number): Promise<Campaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const selectedCampaigns = campaignsData.filter(campaign => campaign.profileId === profileId)
      resolve(selectedCampaigns)
    }, 500)
  })
}

export const getProfileById = (profileId: number): Promise<Profile | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const selectedProfile = profilesData.find(profile => profile.profileId === profileId)
      resolve(selectedProfile)
    }, 500)
  })
}
