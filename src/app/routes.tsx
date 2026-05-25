import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./components/Home";
import News from "./components/News";
import NewsDetail from "./components/NewsDetail";
import Events from "./components/Events";
import EventDetail from "./components/EventDetail";
import ShopDetail from "./components/ShopDetail";
import About from "./components/About";
import Access from "./components/Access";
import FloorGuide from "./components/FloorGuide";
import Sitemap from "./components/Sitemap";
import Contact from "./components/Contact";

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
      { path: "shops/:id", Component: ShopDetail },
    ],
  },
]);
