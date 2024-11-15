import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainCanvas from "./components/MainCanvas";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: <MainCanvas />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
