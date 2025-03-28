// website rote
import Home from "@pages/website/Home";
import Map from "../pages/website/map";
import MapLayout from "../layouts/website/mapview";
import AccountPage from "../pages/website/account/index";
import AccountLayout from "../layouts/website/account";
import VerifyEmail from "../components/verify";
import BookingLayout from "../layouts/website/booking";
import BookingSchedule from "../pages/website/Booking";

// post
import BlogList from "../pages/website/post";

// admin route
import Dashboard from "@pages/admin/Dashboard";
import FieldList from "@pages/admin/Field";
import CreateFields from "@pages/admin/Field/create";
import FieldDetail from "@pages/admin/Field/detail";

// 
import PostList from "../pages/admin/post";

// admin quản lý người dùng
import ListUser from "@pages/admin/user";

const WEBSITE_ROUTES = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/map",
    component: Map,
    layout: MapLayout,
  },
  {
    path: "/account",
    component: AccountPage,
    layout: AccountLayout,
  },
  {
    path: "/verify-email",
    component: VerifyEmail,
  },
  {
    path: "/booking/:id",
    component: BookingSchedule,
    layout: BookingLayout,
  },
  {
    path: "/posts",
    component: BlogList
  }
];

const ADMIN_ROUTES = [
  {
    path: "/admin/dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/fields",
    component: FieldList,
  },
  {
    path:"/admin/fields/create",
    component: CreateFields
  },
  {
    path:"/admin/fields/:id",
    component: FieldDetail
  },
  {
    path:"/admin/user",
    component: ListUser
  },
  {
    path:"/admin/posts",
    component: PostList
  }
];

export { WEBSITE_ROUTES, ADMIN_ROUTES };
