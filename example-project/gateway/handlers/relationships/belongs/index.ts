import {RestfulRouter} from '../../../../shared/low-level/restful-router';
import {get} from './get';
import {del} from './delete';
import {post} from './post';

export async function handler(event){
    return await new RestfulRouter({get, del, post}).handle(event);
}