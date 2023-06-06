export class QueryHelper {
  constructor(TableName, IndexName) {
    this.itr = 0;
    this.expr = [];
    this.names = {};
    this.values = {};
    this.TableName = TableName;
    this.IndexName = IndexName;
  }

  addExactKeys(keys) {
    if (keys) {
      this.addKeysGivenQueryParamFunc(keys, getExactMatchQueryParam);
    }
    return this;
  }

  addLargerThanKeys(keys) {
    if (keys) {
      this.addKeysGivenQueryParamFunc(keys, getLargerThanQueryParam);
    }
    return this;
  }

  addSmallerThanKeys(keys) {
    if (keys) {
      this.addKeysGivenQueryParamFunc(keys, getSmallerThanQueryParam);
    }
    return this;
  }

  addKeysGivenQueryParamFunc(keys, getParamFunc) {
    const { expr, names, values, itr } = getParamFunc(keys, this.itr);
    this.expr.push(expr);
    Object.assign(this.names, names);
    Object.assign(this.values, values);
    this.itr = itr;
  }

  getParam() {
    return {
      TableName: this.TableName,
      IndexName: this.IndexName,
      KeyConditionExpression: this.expr.join(" and "),
      ExpressionAttributeNames: this.names,
      ExpressionAttributeValues: this.values
    };
  }
}

function getExactMatchQueryParam(obj, itr) {
  return getExprNamesValuesItr(obj, itr, "=");
}

function getLargerThanQueryParam(obj, itr) {
  return getExprNamesValuesItr(obj, itr, ">");
}

function getSmallerThanQueryParam(obj, itr) {
  return getExprNamesValuesItr(obj, itr, "<");
}

function getExprNamesValuesItr(obj, itr, operator) {
  console.log(obj, itr, operator);
  const exprs = [];
  const names = {};
  const values = {};

  Object
    .entries(obj)
    .filter(([k, v]) => v !== undefined)
    .forEach(([k, v]) => {
      exprs.push(`#${itr} ${operator} :${itr}`);
      names[`#${itr}`] = k;
      values[`:${itr}`] = v;
      itr += 1;
    });

  const retObj = {
    expr: exprs.join(' and '),
    names,
    values,
    itr
  };
  console.log('retObj', retObj);
  return retObj;
}