import {MetaIndicator} from "../constants";

export function isMeta(prop: string){
    return prop.indexOf(MetaIndicator) === 0;
}

export function isDeepMeta(prop: string){
    return prop.indexOf(`${MetaIndicator}${MetaIndicator}`) === 0;
}

export function stripMetaIndicator(prop: string): string{
    if (isDeepMeta(prop)){
        return prop.substring(2);
    }
    if (isMeta(prop)){
        return prop.substring(1);
    }
    return prop;
}