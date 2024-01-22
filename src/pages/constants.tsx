export enum Options {
  filter = 'filter',
  sort = 'sort'
}

export const ACCOUNT_OPTIONS: Record<string, Array<string>> = {
  [Options.filter]: ['Without filter', '2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05'],
  [Options.sort]: ['asc', 'desc']
}

export const PROFILE_OPTIONS: Record<string, Array<string>> = {
  [Options.filter]: ['Without filter', 'USA', 'UK', 'Germany', 'France', 'Italy', 'Ukraine', 'China', 'Spain', 'Japan', 'Canada'],
  [Options.sort]: ['Without sort', 'Sort by country', 'Sort by marketplace']
}

export const CAMPAIGN_OPTIONS: Record<string, Array<string>> = {
  [Options.filter]: ['Without filter', '2021-01-18', '2021-01-19', '2021-01-20', '2021-01-21', '2021-01-22', '2021-01-23', '2021-01-24', '2021-01-25', '2021-01-26'],
  [Options.sort]: ['Without sort', 'From low to high', 'From high to low']
}