import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage.tsx'
import Homepage from './pages/Homepage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import CreateAccountPage from './pages/CreateAccountPage.tsx'
import AboutUsPage from './pages/AboutUsPage.tsx'
import TermsOfServicePage from './pages/TermsOfServicePage.tsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx'
import PricingPage from './pages/PricingPage.tsx'
import ContactPage from './pages/ContactPage.tsx'

import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage/>,
    errorElement: <NotFoundPage/> 
  },
  {
    path: '/sign-in',
    element: <SignInPage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/create-an-account',
    element: <CreateAccountPage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/about-us',
    element: <AboutUsPage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/terms-of-service',
    element: <TermsOfServicePage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyPage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/pricing',
    element: <PricingPage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/contact',
    element: <ContactPage/>,
    errorElement: <NotFoundPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)