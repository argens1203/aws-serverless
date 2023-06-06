import {NodeApi} from "../api/node.api";
import {LinkApi} from "../api/link.api";

export class NodeService {
    static async getNode(id){
        const node = await NodeApi.get(id);
        node._children = await NodeService.getChildren(node._id);
        return node;
    }

    static async getByTitle(title){
        const node = await NodeApi.getByTitle(title);
        node._children = await NodeService.getChildren(node._id);
        return node;
    }

    static async getChildren(id){
        const links = await LinkApi.getBackLink(id);
        let _children = [];
        if (links){
            _children = await Promise.all(links.map (link => NodeApi.get(link._from)));
        }
        return _children;
    }
}