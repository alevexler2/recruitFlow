import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';
import { routes } from './routes';
import RootLayout from './layout/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route key="layout" path="/" element={<RootLayout />}>
      {
        routes?.map(({ Element, path, index }) => (
          <Route key={index} path={path} element={<Element />} />
        ))
      }
    </Route>,
  ),
);


function App() {

  return <RouterProvider router={router} />;
}

export default App
