import {useEffect, useState} from "react";
import {Account, Profile, Campaign, Response} from "./models.ts";
import {getAccountsData, getProfilesData, getCampaignsData} from "./data.ts";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Response<Account[]>>({data: [], pagination: {currentPage: 1, totalPages: 1}})
  const [loadingAccounts, setLoadingAccounts] = useState(false)
  const [errorAccounts, setErrorAccounts] = useState<string>('')
  async function fetchData(): Promise<void> {
    try {
      setLoadingAccounts(true)
      const {data, pagination} = await getAccountsData()
      setAccounts({data, pagination})
      setLoadingAccounts(false)
    } catch (error: any) {
      setErrorAccounts(error.message)
      setLoadingAccounts(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

return {
    accounts,
    loadingAccounts,
    errorAccounts
  }
}

export const useProfiles = (accountId: number) => {
  const [profiles, setProfiles] = useState<Response<Profile[]>>({data: [], pagination: {currentPage: 1, totalPages: 1}})
  const [loadingProfiles, setLoadingProfiles] = useState(false)
  const [errorProfiles, setErrorProfiles] = useState<string>('')
  async function fetchData(): Promise<void> {
    try {
      setLoadingProfiles(true)
      const {data, pagination} = await getProfilesData(accountId)
      setProfiles({data, pagination})
      setLoadingProfiles(false)
    } catch (error: any) {
      setErrorProfiles(error.message)
      setLoadingProfiles(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [accountId])

return {
    profiles,
    loadingProfiles,
    errorProfiles
  }
}

export const useCampaigns = (profileId: number) => {
  const [campaigns, setCampaigns] = useState<Response<Campaign[]>>({data: [], pagination: {currentPage: 1, totalPages: 1}})
  const [loadingCampaigns, setLoadingCampaigns] = useState(false)
  const [errorCampaigns, setErrorCampaigns] = useState<string>('')
  async function fetchData(): Promise<void> {
    try {
      setLoadingCampaigns(true)
      const {data, pagination} = await getCampaignsData(profileId)
      setCampaigns({data, pagination})
      setLoadingCampaigns(false)
    } catch (error: any) {
      setErrorCampaigns(error.message)
      setLoadingCampaigns(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [profileId])

return {
    campaigns,
    loadingCampaigns,
    errorCampaigns
  }
}


