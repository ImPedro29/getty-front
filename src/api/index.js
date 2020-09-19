import fetch from 'node-fetch';
import URL from 'url';

let {REACT_APP_BASE_URL} = process.env;

export default async (method = 'GET', route = '/', body = {}, headers = {}) => {

    let url = URL.resolve(REACT_APP_BASE_URL, route);

    let response = await fetch(url, {
        method,
        ...(Object.keys(body).length > 0 ? {body: JSON.stringify(body)} : {}),
        headers: {
            ...headers,
            'content-type': 'application/json',
        }
    });

    let res;

    try {
        res = await response.json();
    } catch (e) {
        try {
            res = await response.text();
        } catch (e) {}
    }

    if (response.status < 200 || response.status > 300) {
        return Promise.reject(res);
    }

    return res;
};