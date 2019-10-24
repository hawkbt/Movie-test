import Cookies from 'universal-cookie'
var date = new Date
date.setDate(date.getDate()+2)
class CookieHandler {
    constructor() {
        this.cookies = new Cookies()
        this.date = date
    }
    setCookies(data) {
        data.map((s) => {
            this.cookies.set(s.name, s.value, {
                path: s.path ? s.path : '/',
                expires: s.expires ? s.expires : this.date /* domain: '' only specify this when youre are not working locally in that case would be domain: 'www.sitename.com' */
            })
        })
    }

    deleteCookies(data) {
        data.map((s) => {
            this.cookies.remove(s.name, s.value, {
                path: s.path ? s.path : '/',
                expires: s.expires ? s.expires : this.date /* domain: '' only specify this when youre are not working locally in that case would be domain: 'www.sitename.com' */
            })
        })
    }

    setCookie(name, value, path, expires) {
        this.cookies.set(name, value, {
            path: path ? path : '/',
            expires: expires ? expires : this.date
        })
    }

    deleteCookie(name, value, path, expires) {
        this.cookies.remove(name, value, {
            path: path ? path : '/',
            expires: expires ? expires : this.date
        })
    }

    getAllCookies() {
        return(this.cookies.getAll())
    }

    getCookie(name) {
        return(this.cookies.get(name))
    }
}

const handler = new CookieHandler()
export default handler