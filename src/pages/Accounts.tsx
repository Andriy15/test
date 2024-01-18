import {Link} from "react-router-dom";
import {useAccounts} from "../feature/service/data.service.ts";
import {Account} from "../feature/service/module.ts";

export function Accounts() {
  const {loadingAccounts, errorAccounts, accounts} = useAccounts()

  return (
     <div>
       {loadingAccounts && <div>Loading...</div>}
       {errorAccounts && <div>Something went wrong</div>}
       {accounts && (
          <div>
            <h1>Accounts</h1>
            <ul>
              {accounts.map((account: Account) => (
                 <li key={account.accountId}>
                   <Link to={`/profiles/${account.accountId}`}>{account.email}</Link>
                 </li>
              ))}
            </ul>
          </div>
       )}
     </div>
  )
}