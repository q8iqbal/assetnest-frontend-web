import Login from "./pages/login/Login";

export const APP_ROUTE = [
    {
        name : "Login",
        path : "/",
        exact : true,
        component : Login,
        restricted : true,
        private : false
    }
]