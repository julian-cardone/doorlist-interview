import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import EventCreatePage from "./features/events/pages/EventCreatePage/EventCreatePage";
import EventViewPage from "./features/events/pages/EventViewPage/EventViewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <div>Page not found</div>,
    children: [
      { index: true, element: <Navigate to="events/create" replace /> },
      { path: "events/create", Component: EventCreatePage },
      { path: "events/:id", Component: EventViewPage },
    ],
  },
]);
