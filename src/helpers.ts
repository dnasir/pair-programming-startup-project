/**
 *
 * @param el Template HTML
 * @param attrName HTML attribute to use for locating.
 * @param propName HTML property to assign value to.
 * @param obj Object to get data from.
 * @returns
 */
export function applyDataToTemplate<T extends HTMLElement>(el: HTMLElement, attrName: string, propName: string, obj: any) {
    // iterate over user properties and set values
    Object.keys(obj).forEach(key => {
        const field = el.querySelector(`[${attrName}=${key}]`) as T;
        if (!field) return;

        // have to cast to any, else TS will complain
        (field as any)[propName] = obj[key];
    });

    return el;
}
