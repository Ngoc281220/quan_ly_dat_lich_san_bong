import Home from "@pages/website/Home";
import Map from "../pages/website/map";
import MapLayout from "../layouts/website/mapview";
import AccountPage from "../pages/website/account/index";
import AccountLayout from "../layouts/website/account";
import VerifyEmail from "../components/verify";

const WEBSITE_ROUTES = [
    { 
        path : '/', component: Home 
    },
    {
        path:'/map', component: Map, layout: MapLayout
    },
    {
        path:'/accout', component: AccountPage, layout: AccountLayout
    },
    {
        path:'/verify-email', component: VerifyEmail
    }
];

const PRIVATE_ROUTES = [];

export { WEBSITE_ROUTES, PRIVATE_ROUTES };