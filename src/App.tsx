import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import MainApp from './core/components/MainApp'
function App() {

  const queryClient = new QueryClient();
  localStorage.setItem("currentView", "grid");

  return (
    <QueryClientProvider client={queryClient}>
      <MainApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </ QueryClientProvider>
  )
}

export default App
