export function objectToQuery(obj) {
    let qs = '';
    for (const name in obj) {
        if (obj[name]) {
            if (Array.isArray(obj[name])) {
                obj[name].forEach(val => {
                    if (val) {
                        qs += `${name}=${val}&`;
                    }
                });
            } else {
                qs += `${name}=${obj[name]}&`;
            }
        }
    }
    return qs.slice(0, -1);
}

export function applyQuery(defaulValues, queryValues) {
    const values = { ...defaulValues };

    if (typeof defaulValues !== 'object') {
        console.warn('defaulValues must be an object');
        return;
    }
    if (typeof queryValues !== 'object') {
        console.warn('queryValues must be an object');
        return;
    }
    if (!Object.keys(queryValues).length) {
        return values;
    }

    for (const name in queryValues) {
        if (Object.prototype.hasOwnProperty.call(values, name)) {
            if (Array.isArray(values[name])) {
                if (Array.isArray(queryValues[name])) {
                    values[name] = queryValues[name].map(i => {
                        if (i === 'true') {
                            return true;
                        } else if (i === 'false') {
                            return false;
                        } else {
                            return i;
                        }
                    });
                } else {
                    values[name] = [queryValues[name] === 'true' ? true : queryValues[name] === 'false' ? false : queryValues[name]];
                }
            } else if (Array.isArray(queryValues[name])) {
                values[name] = queryValues[name][0] === 'true' ? true : queryValues[name][0] === 'false' ? false : queryValues[name][0];
            } else {
                values[name] = queryValues[name] === 'true' ? true : queryValues[name] === 'false' ? false : queryValues[name];
            }
        }
    }

    return values;
}

export function updateQuery(values, route, utmTags = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','_openstat','yclid','calltouch_tm']) {
    let result;

    if (Object.keys(route.query).length) {
        const utmQuery = Object.fromEntries(Object.entries(route.query)
            .filter(([key]) => utmTags.includes(key)));
        result = { ...values, ...utmQuery };
    } else {
        result = { ...values };
    }

    const urlQuery = objectToQuery(result);
    if (window?.history) {
        window.history.replaceState(null, null, `${route.path}${urlQuery?.length ? `?${urlQuery}` : ''}`);
    }
}
