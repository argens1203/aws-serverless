import {isMeta} from "../utils/meta";
import {MetaContainer, ReservedProps} from "../constants";

// Transforms what end-users see (eg. type) to what db stores (_type)
export class MetaUpdateProxy {
    private readonly hidden;
    private readonly proxy;

    constructor(update) {
        this.hidden = {};
        this.proxy = new Proxy(this.hidden, this.handler);
        Object.assign(this.proxy, update);
    }

    print(){
        return this.proxy;
    }

    handler = {
        set: (obj, prop, value) => {
            if (prop === MetaContainer){
                return true;
            }
            if (!ReservedProps.includes(prop)){
                obj[`_${prop}`] = value;
            }
            return true;
        }
    }
}