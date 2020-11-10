import axios from 'axios'

const USER = "USER"
const COMPANY = "COMPANY"
const TOKEN = "token"


const accessCookie = cookieName => {
    let name = cookieName + "="
    let allCookieArray = document.cookie.split(';')
    for(let i=0 ; i < allCookieArray.length; i++){
        let temp = allCookieArray[i].trim()
        if(temp.indexOf(name)===0)
            return temp.substring(name.length, temp.length)
    }
    return ""
}

//user
export const login = (data) => {
    localStorage.setItem(USER, JSON.stringify(data.user) )
    document.cookie = "token="+data.token+"; expires="+new Date(Date.now() + data.expires_in*100).toUTCString()
    axios.defaults.headers.common['Authorization'] = 'Bearer'+data.token
}; 

export const logout = () => {
    localStorage.removeItem(USER)
    localStorage.removeItem(COMPANY)
    document.cookie = TOKEN+"=;expires="+new Date(Date.now()).toUTCString()
};

export const isLogin = () => {
    if (accessCookie(TOKEN) !== "") {
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