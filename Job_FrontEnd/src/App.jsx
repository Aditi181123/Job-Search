import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import PostJob from './components/pages/PostJob'
import JobList from './components/pages/JobList'

const appRouter=createBrowserRouter([
  {
    path: '/',
    element:<Home/>
  },
  {
    path: '/login',
    element:<Login/>
  },
  {
    path: '/signup',
    element:<Signup/>
  },
  { 
    path: "/post-job", 
    element: <PostJob /> 
  },
  { 
    path: "/jobs",
     element: <JobList /> 
  },
])

function App() {

  return (
      <div>
        <RouterProvider router = {appRouter}/>
      </div>
  )
}

export default App
