import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./layout";
import { Articles } from "./pages";
import { Toaster } from "./components/ui/toaster";
import QueryProvider from "./lib/react-query-provider";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Articles />} />
        </Route>
      </>
    )
  );

  return (
    <div className="App">
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster />
      </QueryProvider>
    </div>
  );
}

export default App;
