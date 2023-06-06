export default class NoResourceError extends Error {
    constructor(detail, param, message){
        super();
        this.message = message || 'no_res_error';
        this.name = 'NoResourceError';
        this.statusCode = 400;
        if (param){
            this.param = param;
        }
        if (detail){
            this.detail = detail;
        }
    }
}