export function getUpdateExpression(updates = {}) {
  const exprs = [];
  const names = {};
  const values = {};
  let itr = 0;

  Object.entries(updates).filter(([k, v]) => v !== undefined).forEach(([k, v]) => {
    exprs.push(`#${itr} = :${itr}`);
    names[`#${itr}`] = k;
    values[`:${itr}`] = v;
    itr += 1;
  });

  const retObj = {
    expr: 'set ' + exprs.join(', '),
    names,
    values
  };
  console.log('retObj', retObj);
  return retObj;
}
/**
 * Reminder:
 * 1. Field must already exist
 * 2. Field in updates must have same name with existing field
 *  */
// TO-BE-UPGRADED
export function getNestedUpdateExpression (updates={}){
  const exprs = [];
  const names = {};
  const values = {};

  Object.entries(updates).filter(([k, v]) => v !== undefined).forEach(([rk, rv], ri) => {
      const rId = `r${ri}`;
      // exprs.push(`#${rId} = if_not_exists(#${rId}, {})`);
      names[`#${rId}`] = rk;
      // values[`:${rId}`] = {};
      Object.entries(rv).filter(([k, v]) => v !== undefined).forEach(([k,v], i) => {
          const nId = `${rId}n${i}`;
          exprs.push(`#${rId}.#${nId} = :${nId}`);
          names[`#${nId}`] = k;
          values[`:${nId}`] = v;
      });
  });
  if (exprs.length === 0) return {};

  const retObj = {
    expr: 'SET ' + exprs.join(', '),
    names,
    values
  };
  console.log('retObj', retObj);
  return retObj;
}