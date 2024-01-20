import {Account, Campaign, Profile} from "./models.ts";

const accountsData: Account[] = [
  {
    accountId: 1,
    email: "example1@example.com",
    authToken: "authToken1",
    creationDate: '2021-01-02'
  },
  {
    accountId: 2,
    email: "example2@example.com",
    authToken: "authToken2",
    creationDate: '2021-01-03'
  },
  {
    accountId: 3,
    email: "example3@example.com",
    authToken: "authToken3",
    creationDate: '2021-01-04'
  },
  {
    accountId: 4,
    email: "example4@example.com",
    authToken: "authToken4",
    creationDate: '2021-01-05'
  }
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
  {
    profileId: 104,
    country: "Germany",
    marketplace: "Zalando",
    accountId: 3
  },
  {
    profileId: 105,
    country: "France",
    marketplace: "Cdiscount",
    accountId: 4
  },
  {
    profileId: 106,
    country: "Italy",
    marketplace: "Amazon.it",
    accountId: 4
  },
  {
    profileId: 107,
    country: "Spain",
    marketplace: "El Corte Inglés",
    accountId: 2
  },
  {
    profileId: 108,
    country: "Japan",
    marketplace: "Rakuten",
    accountId: 1
  },
];

const campaignsData: Campaign[] = [
  {
    campaignId: 1001,
    clicks: 150,
    cost: 500,
    date: '2021-01-18',
    profileId: 101
  },
  {
    campaignId: 1002,
    clicks: 120,
    cost: 450,
    date: '2021-01-19',
    profileId: 102
  },
  {
    campaignId: 1003,
    clicks: 200,
    cost: 600,
    date: '2021-01-20',
    profileId: 102
  },
  {
    campaignId: 1004,
    clicks: 180,
    cost: 550,
    date: '2021-01-21',
    profileId: 103
  },
  {
    campaignId: 1005,
    clicks: 120,
    cost: 400,
    date: '2021-01-22',
    profileId: 104
  },
  {
    campaignId: 1006,
    clicks: 250,
    cost: 700,
    date: '2021-01-23',
    profileId: 105
  },
  {
    campaignId: 1007,
    clicks: 180,
    cost: 600,
    date: '2021-01-24',
    profileId: 106
  },
  {
    campaignId: 1008,
    clicks: 200,
    cost: 550,
    date: '2021-01-25',
    profileId: 107
  },
  {
    campaignId: 1009,
    clicks: 150,
    cost: 500,
    date: '2021-01-26',
    profileId: 108
  },
];


export const getAccountsData = (): Promise<Account[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(accountsData);
    }, 500)
  })
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
