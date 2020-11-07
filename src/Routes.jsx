import Login from "./pages/login/Login";
import Home from "./pages/home/Home"

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
        path : "/",
        exact : true,
        component : Home,
        restricted : true,
        private : true
    }
]