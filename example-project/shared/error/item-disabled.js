export default class ItemDisabled extends Error {
  constructor(message, data){
    super();
    this.message = message || 'item_disabled';
    this.name = 'ItemDisabled';
    this.statusCode = 404;
    this.data= data;
  }
}