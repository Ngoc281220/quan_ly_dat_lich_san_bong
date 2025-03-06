import Home from "@pages/website/Home";
import Map from "../pages/website/map";

const PUBLIC_ROUTES = [
    { 
        path : '/', component: Home 
    },
    {
        path:'/map', component: Map
    }
];

const PRIVATE_ROUTES = [];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };