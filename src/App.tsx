import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { routes } from './routing/routes'

// Routes
const router = createBrowserRouter(routes)

// defaultTheme
import themes from './themes'

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes()}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
