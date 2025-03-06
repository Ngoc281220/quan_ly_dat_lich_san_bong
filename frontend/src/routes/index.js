import Home from "@pages/website/Home";
import Map from "../pages/website/map";
import MapLayout from "../layouts/website/mapview";

const PUBLIC_ROUTES = [
    { 
        path : '/', component: Home 
    },
    {
        path:'/map', component: Map, layout: MapLayout
    }
];

const PRIVATE_ROUTES = [];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };