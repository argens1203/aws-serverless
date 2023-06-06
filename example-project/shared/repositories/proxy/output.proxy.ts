import {isMeta, stripMetaIndicator} from "../utils/meta";
import {MetaContainer} from "../constants";

export class OutputProxy {
    private readonly hidden;
    private readonly proxy;

    constructor(dbValue) {
        this.hidden = {};
        this.proxy = new Proxy(this.hidden, this.handler);
        Object.assign(this.proxy, dbValue);
    }

    print(){
        return this.proxy;
    }

    handler = {
        set: (obj, prop, value) => {
            if (!obj[MetaContainer]){
                obj[MetaContainer] = {};
            }

            if (isMeta(prop)){
                obj[MetaContainer][stripMetaIndicator(prop)] = value;
            } else {
                obj[prop] = value;
            }
            return true;
        }
    }
}