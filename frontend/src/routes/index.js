// website rote
import Home from "@pages/website/Home";
import Map from "../pages/website/map";
import MapLayout from "../layouts/website/mapview";
import AccountPage from "../pages/website/account/index";
import AccountLayout from "../layouts/website/account";
import VerifyEmail from "../components/verify";
import BookingLayout from "../layouts/website/booking";
import BookingSchedule from "../pages/website/Booking";


// admin route
import Dashboard from "@pages/admin/Dashboard";

const WEBSITE_ROUTES = [
    { 
        path : '/', component: Home 
    },
    {
        path:'/map', component: Map, layout: MapLayout
    },
    {
        path:'/account', component: AccountPage, layout: AccountLayout
    },
    {
        path:'/verify-email', component: VerifyEmail
    },
    {
        path: '/booking', component: BookingSchedule, layout:  BookingLayout
    }
];

const ADMIN_ROUTES = [
    {
        path: '/dashboard', component: Dashboard
    }
];

export { WEBSITE_ROUTES, ADMIN_ROUTES };