import './App.css';
import { Home } from './pages/home';
import { DataProvider } from './pages/dataProvider';
import { Collection } from './pages/images_collection';
import { Login } from './pages/login';
import {Signup} from './app/components/signup';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/collection",
    element: <Collection />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
]);
function App() {
  return (
    <>
    <DataProvider>
    <RouterProvider router={router} />
    </DataProvider>
    </>
  );
}

export default App;
