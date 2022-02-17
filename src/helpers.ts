export function flattenObj(obj: any, parent: string = '', res: any = {}) {
    for (const key in obj) {
        const propName = parent ? parent + '_' + key : key;

        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }

    return res;
}

export function renderDataJs<T extends HTMLElement>(el: HTMLElement, propName: string, obj: any) {
    // iterate over user properties and set values
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const field = el.querySelector(`[data-js=${key}]`) as T;
            if (!field) continue;
            // have to cast to any, else TS will complain
            (field as any)[propName] = obj[key];
        }
    }

    return el;
}
