import Cookie from 'js-cookie'

const USER = "USER"
const COMPANY = "COMPANY"
const TOKEN = "JWT_TOKEN"

//user
export const login = (data) => {
    localStorage.setItem(USER, JSON.stringify(data.user) )
    // document.cookie = "token="+data.token+"; expires="+new Date(Date.now() + data.expires_in*100).toUTCString()
    const expiresDate = new Date(Date.now() + data.expires_in*1000)
    Cookie.set(TOKEN, data.token, { expires: expiresDate})
}; 

export const logout = () => {
    localStorage.removeItem(USER)
    localStorage.removeItem(COMPANY)
    Cookie.remove(TOKEN)
};

export const isLogin = () => {
    if (Cookie.get(TOKEN) !== undefined) {
        return true;
    }
    return false;
};

export const getCookie = () => {
    return Cookie.get(TOKEN)
};

export const setUser = user => {
    localStorage.setItem(COMPANY, JSON.stringify(user))
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem(USER))
}


//company
export const setCompany = company => {
    localStorage.setItem(COMPANY, JSON.stringify(company))
}

export const getCompany = () => {
    return JSON.parse(localStorage.getItem(COMPANY))
}