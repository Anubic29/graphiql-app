import { SMiniType } from '../types/SchemaType';

function schemaGetType(type: SMiniType) {
  let typeName = '';
  const typeKinds = [];
  let currType: SMiniType | null = type;
  while (currType !== null) {
    if (currType.name !== null) typeName = currType.name;
    else typeKinds.push(currType.kind);
    currType = currType.ofType;
  }
  const mainType = typeKinds.reverse().reduce((acc, kind) => {
    switch (kind) {
      case 'LIST':
        return `[${acc}]`;
      case 'NON_NULL':
        return `${acc}!`;
      default:
        return acc;
    }
  }, typeName);
  return [mainType, typeName] as [string, string];
}

export default schemaGetType;
