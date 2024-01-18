import {useEffect, useState} from "react";
import {Account, Profile, Campaign} from "./module.ts";
import {getAccountsData, getProfilesData, getCampaignsData} from "./data.ts";

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loadingAccounts, setLoadingAccounts] = useState(false)
  const [errorAccounts, setErrorAccounts] = useState<string>('')
  async function fetchData() {
    try {
      setLoadingAccounts(true)
      const accountsData = await getAccountsData()
      setAccounts(accountsData)
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

export function useProfiles(accountId: number) {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loadingProfiles, setLoadingProfiles] = useState(false)
  const [errorProfiles, setErrorProfiles] = useState<string>('')
  async function fetchData() {
    try {
      setLoadingProfiles(true)
      const profilesData = await getProfilesData(accountId)
      setProfiles(profilesData)
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

export function useCampaigns(profileId: number) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState(false)
  const [errorCampaigns, setErrorCampaigns] = useState<string>('')
  async function fetchData() {
    try {
      setLoadingCampaigns(true)
      const campaignsData = await getCampaignsData(profileId)
      setCampaigns(campaignsData)
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


