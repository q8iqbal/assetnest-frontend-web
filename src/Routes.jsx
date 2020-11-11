import Login from "./pages/login/Login";
import Home from "./pages/home/Home"
import Error from "./components/404/Error"
import Dashboard from "./components/dashboard/Dashboard";
import History from "./components/history/History";
import AssetDetail from "./components/asset/asset-detail/AssetDetail";
import Profile from "./components/profile/Profile";

export const APP_ROUTE = [
    {
        name : "Login",
        path : "/login",
        exact : true,
        component : Login,
        restricted : true,
        private : false
    },
    {
        name : "Home",
        path : ['/home/' , '/'],
        exact : false,
        component : Home,
        restricted : true,
        private : true,
    },
    {
        name : "404",
        path : "/404",
        exact : true,
        component : Error,
        restricted : false,
        private : false,
    }
]

export const USER_ROUTE = [
    {
        name : "Dashboard",
        path : ["/home/dashboard" , "/home" , "/"],
        to : "/home/dashboard",
        exact : true,
        component : Dashboard,
    },
    {
        name : "Asset",
        path : "/home/asset",
        to : "/home/asset",
        exact : true,
        component : AssetDetail,
    },
    {
        name : "History",
        path : "/home/history",
        to : "/home/history",
        exact : true,
        component : History,
    },
    {
        name : "Profile",
        path : "/home/profile",
        to : "/home/profile",
        exact : true,
        hidden : true,
        component : Profile,
    }
]