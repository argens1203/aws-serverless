import {NodeTable} from "../../respositories/node-table";
import {Success} from "../../../shared/responses";

export async function getAll(params) {
  console.log('params', params);
  const {sortBy, limit, cursor, ascending} = params || {};

  let res;
  // TODO: other query types and set CONSTANTS
  if (sortBy === "importance"){
    res = await NodeTable.queryByImportance(limit, cursor, ascending);
  } else if (sortBy === "createdAt"){
    res = await NodeTable.queryByCreatedAt(limit, cursor, ascending)
  } else {
    res = await NodeTable.paginatedScan(limit, cursor);
  }
  return Success(res);
}