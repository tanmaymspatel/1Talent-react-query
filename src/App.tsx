import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { InteractionRequiredAuthError, InteractionStatus, InteractionType } from '@azure/msal-browser';
import { useEffect, useState } from 'react';

import MainApp from './core/components/MainApp'
import FilterFieldsContextProvider from './context/filterFieldsContext/FilterFieldsContextProvider';
import SearchContextProvider from './context/searchContext/SearchContextProvider';
import RequestPayloadContextProvider from './context/requstPayloadContext/RequestPayloadContextProvider';

function App() {

  const queryClient = new QueryClient();
  useMsalAuthentication(InteractionType.Redirect);
  const [m_strUser, setm_strUser] = useState<string>("");
  const { instance, inProgress, accounts } = useMsal();
  localStorage.setItem("isClicked", "false");
  const accessTokenRequest = {
    scopes: ['openid', 'offline_access', 'api://582856b6-2df6-45b5-b481-c4bb646d7cca/Employee.Read'],
    account: accounts[0],
  };

  useEffect(() => {

  }, [instance, accounts, inProgress]);

  const render = () => {
    try {
      if (inProgress === InteractionStatus.None) {
        instance
          .acquireTokenSilent(accessTokenRequest)
          .then((accessTokenResponse) => {
            // Acquire token silent success
            localStorage.setItem("accessToken", (accessTokenResponse.accessToken));
          })
          .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
              instance.acquireTokenRedirect(accessTokenRequest);
            }
            console.log(error);
          });
      }
      const username = accounts[0].username;
      setm_strUser(username);

    }
    catch (e) {
      console.log(e);
    }
  }

  if (m_strUser != "") {
    return (
      <QueryClientProvider client={queryClient}>
        <RequestPayloadContextProvider>
          <FilterFieldsContextProvider>
            <SearchContextProvider>
              <MainApp />
            </SearchContextProvider>
          </FilterFieldsContextProvider>
        </RequestPayloadContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ QueryClientProvider >
    )
  }
  else return <>{render()}<div>Please wait...</div></>
}

export default App
