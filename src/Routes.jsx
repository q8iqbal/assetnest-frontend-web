import Login from "./pages/login/Login";
import Home from "./pages/home/Home"
import Error from "./components/404/Error"

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
        path : "/home",
        exact : false,
        component : Home,
        restricted : true,
        private : false,
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