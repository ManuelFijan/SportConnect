import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

import NotFoundPage from './pages/NotFoundPage.tsx'
import Homepage from './pages/Homepage.tsx'
import CreateAccountPage from './pages/CreateAccountPage.tsx'
import AboutUsPage from './pages/AboutUsPage.tsx'
import TermsOfServicePage from './pages/TermsOfServicePage.tsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx'
import PricingPage from './pages/PricingPage.tsx'
import CookieUsePage from './pages/CookieUsePage.tsx'
import MainPage from './pages/MainPage.tsx'
import SetupYourAccountPage from './pages/SetupYourAccountPage.tsx'
import MyAccountPage from './pages/MyAccountPage.tsx'
import ChatPage from './pages/ChatPage.tsx'
import SuccessfulPaymentPage from "./pages/SuccessfulPaymentPage.tsx";
import FailurePaymentPage from "./pages/FailurePaymentPage.tsx";
import AdminPage from "./pages/AdminPage.tsx"
import { AuthProvider } from "./context/AuthContext";

import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import ViewUserProfile from './pages/ViewUserProfile.tsx'
import BannedPage from './pages/BannedPage.tsx'

/*ovdje imamo ruter, koji samo switch-a izmedu ruta i prikazuje ono sto se nalazi u element polju
  ako se bilo gdje napravi greska, prikaze se errorElement (NotFoundPage)
*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage/>,
    errorElement: <NotFoundPage/> 
  },
  {
    path: '/sign-in',
    element: <Homepage/>,
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
    path: '/cookie-use',
    element: <CookieUsePage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/main-page',
    element: <MainPage />,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/set-up-your-account',       // dodano da odvede nakon sign in sa google-om i github-om
    element: <SetupYourAccountPage />,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/my-account',
    element: <MyAccountPage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/chat',
    element: <ChatPage/>,
    errorElement: <NotFoundPage/>
  },
  {
		path: "/successful-payment",
		element: <SuccessfulPaymentPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/failed-payment",
		element: <FailurePaymentPage />,
		errorElement: <NotFoundPage />,
	},
  {
		path: "/admin",
		element: <AdminPage/>,
		errorElement: <NotFoundPage/>,
	},
  {
		path: "/view-profile",
		element: <ViewUserProfile/>,
		errorElement: <NotFoundPage/>,
	},
  {
		path: "/banned-page",
		element: <BannedPage/>,
		errorElement: <NotFoundPage/>,
	}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);