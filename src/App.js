import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <p>main</p>, errorElement: <p>error</p> },
  { path: "/sub", element: <p>sub</p> },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
