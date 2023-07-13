import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { useState } from 'react';

import MainApp from './core/components/MainApp'
import FilterFieldsContextProvider from './context/filterFieldsContext/FilterFieldsContextProvider';
import SearchContextProvider from './context/searchContext/SearchContextProvider';
import RequestPayloadContextProvider from './context/requestPayloadContext/RequestPayloadContextProvider';

function App() {

  console.log("app called");

  const queryClient = new QueryClient();
  useMsalAuthentication(InteractionType.Redirect);
  const [m_strUser, setm_strUser] = useState<string>("");
  const { accounts } = useMsal();
  localStorage.setItem("isClicked", "false");

  const render = () => {
    try {
      // if (inProgress === InteractionStatus.None) {
      //   instance
      //     .acquireTokenSilent(accessTokenRequest)
      //     .then((accessTokenResponse) => {
      //       // Acquire token silent success
      //       localStorage.setItem("accessToken", (accessTokenResponse.accessToken));
      //     })
      //     .catch((error) => {
      //       if (error instanceof InteractionRequiredAuthError) {
      //         instance.acquireTokenRedirect(accessTokenRequest);
      //       }
      //       console.log(error);
      //     });
      // }
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
