import Home from "@pages/website/Home";
import Map from "../pages/website/map";
import MapLayout from "../layouts/website/mapview";
import AccountPage from "../pages/website/account/index";

const WEBSITE_ROUTES = [
    { 
        path : '/', component: Home 
    },
    {
        path:'/map', component: Map, layout: MapLayout
    },
    {
        path:'/accout', component: AccountPage
    }
];

const PRIVATE_ROUTES = [];

export { WEBSITE_ROUTES, PRIVATE_ROUTES };