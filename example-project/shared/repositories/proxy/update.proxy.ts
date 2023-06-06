import {isMeta} from "../utils/meta";
import {MetaContainer} from "../constants";

export class UpdateProxy {
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
            if (isMeta(prop)){
                return true;
            }
            if (prop === MetaContainer){
                return true;
            }
            obj[prop] = value;
            return true;
        }
    }
}