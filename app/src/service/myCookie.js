class MyCookie {
    constructor(name) {
        this.name = name;
    }

    get = () => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + this.name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    set = (value, options = {}) => {
        options = {
            path: '/',
            'max-age': 60 * 60,
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(this.name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    remove = () => {
        this.set("", {
            'max-age': -1
        })
    }
}

export const myCookie = new MyCookie();
export const myCookieUser = new MyCookie('user');
