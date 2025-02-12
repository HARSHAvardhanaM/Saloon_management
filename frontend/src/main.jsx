import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Tokens from './components/Tokens.jsx'
import Register from './components/Register.jsx'
import SetToken from './components/SetToken.jsx'
import ViewToken from './components/ViewToken.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "",
        element : <Register />
      },
      {
        path : "login",
        element : <Login />
      },
      {
        path : "signup",
        element : <SignUp />
      },
      {
        path : "tokens",
        element : <Tokens />
      },
      {
        path : "set-token",
        element : <SetToken />
      },
      {
        path : "token/:tokenId",
        element : <ViewToken />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
