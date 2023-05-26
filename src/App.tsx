import { useEffect } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import MainApp from './core/components/MainApp'
import { useState } from 'react';
import employeeServices from './shared/services/employeeServices';
function App() {

  const queryClient = new QueryClient();
  useMsalAuthentication(InteractionType.Redirect);
  const [m_strUser, setm_strUser] = useState<string>("");
  const { accounts } = useMsal();
  const { fetchEmployees1 } = employeeServices;

  const render = () => {
    try {
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
        <MainApp />
        <ReactQueryDevtools initialIsOpen={false} />
      </ QueryClientProvider>
    )
  }
  else return <>{render()}<div>Please wait...</div></>
}

export default App
