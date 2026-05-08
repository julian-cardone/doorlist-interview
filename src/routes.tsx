import { createBrowserRouter, Outlet } from "react-router-dom";
import EventCreatePage from "./features/events/pages/EventCreatePage/EventCreatePage";
import EventViewPage from "./features/events/pages/EventViewPage/EventViewPage";

function RootLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "events/create",
        Component: EventCreatePage,
      },
      {
        path: "events/:id",
        Component: EventViewPage,
      },
    ],
  },
]);
