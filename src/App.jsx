import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import UserPage from './pages/UserPage';
import RecipePage from './pages/RecipePage';
import './App.css'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        
        <Route path='/user-details' element={<UserPage/>}/>
        <Route path='/recipe-details' element={<RecipePage/>}/>
      
        </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App
