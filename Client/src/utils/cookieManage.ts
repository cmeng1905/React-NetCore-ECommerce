import Cookies from 'js-cookie';

export function removeCookie(key: string) {
    Cookies.remove(key);
}
