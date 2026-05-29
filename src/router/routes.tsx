import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import News from "../pages/News";
import NewsDetail from "../pages/NewsDetail";
import Events from "../pages/Events";
import EventDetail from "../pages/EventDetail";
import PickupDetail from "../pages/PickupDetail";
import ShopDetail from "../pages/ShopDetail";
import About from "../pages/About";
import Access from "../pages/Access";
import FloorGuide from "../pages/FloorGuide";
import Sitemap from "../pages/Sitemap";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "floor-guide", Component: FloorGuide },
      { path: "about", Component: About },
      { path: "access", Component: Access },
      { path: "contact", Component: Contact },
      { path: "sitemap", Component: Sitemap },
      { path: "news", Component: News },
      { path: "news/:id", Component: NewsDetail },
      { path: "events", Component: Events },
      { path: "events/:id", Component: EventDetail },
      { path: "pickups/:id", Component: PickupDetail },
      { path: "shops/:id", Component: ShopDetail },
    ],
  },
]);
