import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import UserPage from './pages/UserPage';
import './App.css'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        
        <Route path='/user-details' element={<UserPage/>}/>
      
        </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App
