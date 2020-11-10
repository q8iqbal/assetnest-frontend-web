import axios from 'axios'

const USER = "USER"
const COMPANY = "COMPANY"



//user
export const login = (data) => {
    localStorage.setItem(USER, JSON.stringify(data.user) )
    document.cookie = "token="+data.token+"; expires="+new Date(Date.now() + data.expires_in*100).toUTCString()
    axios.defaults.headers.common['Authorization'] = 'Bearer'+data.token
}; 

export const logout = () => {
    localStorage.removeItem(USER)
    localStorage.removeItem(COMPANY)
    document.cookie = "token=;expires="+new Date(Date.now()).toUTCString()
};

export const isLogin = () => {
    if (localStorage.getItem(USER)) {
        return true;
    }
    return false;
};

export const getUser = () => {
    return localStorage.getItem(USER)
}


//company
export const setCompany = company => {
    localStorage.setItem(COMPANY, JSON.stringify(company))
}

export const getCompany = () => {
    return localStorage.getItem(COMPANY)
}