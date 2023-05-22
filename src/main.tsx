import ReactDOM from 'react-dom/client'
import { MantineProvider } from "@mantine/core";

import App from './App.tsx'
import Interceptor from './core/components/Interceptor.tsx'
import GlobalStyles from './core/components/GlobalStyles.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Interceptor >
      <MantineProvider
        theme={{
          breakpoints: {
            xs: '30em',
            sm: '36em',
            md: '48em',
            lg: '62em',
            xl: '75em',
          }
        }}>
        <GlobalStyles />
        <App />
      </MantineProvider>
    </Interceptor>
  </BrowserRouter>
)
