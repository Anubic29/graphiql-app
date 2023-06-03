import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SchemaType, SArgType } from 'types/SchemaType';

type SchemaStackElem = {
  name: string;
  description: string;
  type: [string, string];
  args: SArgType[];
};

interface SchemaDocumentationContext {
  str: string;
  schema?: SchemaType;
  loadSchemaFromServer: (url: string) => void;
  schemaStack: SchemaStackElem[];
  pushToStack: (elem: SchemaStackElem) => void;
  popFromStack: () => void;
  resetStack: () => void;
  getCurrentElem: () => SchemaStackElem;
}

export const SchemaDocumentationContext = createContext<SchemaDocumentationContext>({
  str: '',
  schema: undefined,
  loadSchemaFromServer: () => undefined,
  schemaStack: [],
  pushToStack: () => undefined,
  popFromStack: () => undefined,
  resetStack: () => undefined,
  getCurrentElem: () => ({ name: 'Error', description: 'Default func', type: ['', ''], args: [] }),
});

const query =
  'query IntrospectionQuery {\n  __schema {\n    queryType {\n      name\n    }\n    mutationType {\n      name\n    }\n    subscriptionType {\n      name\n    }\n    types {\n      ...FullType\n    }\n    directives {\n      name\n      description\n      locations\n      args {\n        ...InputValue\n      }\n    }\n  }\n}\n\nfragment FullType on __Type {\n  kind\n  name\n  description\n  fields(includeDeprecated: true) {\n    name\n    description\n    args {\n      ...InputValue\n    }\n    type {\n      ...TypeRef\n    }\n    isDeprecated\n    deprecationReason\n  }\n  inputFields {\n    ...InputValue\n  }\n  interfaces {\n    ...TypeRef\n  }\n  enumValues(includeDeprecated: true) {\n    name\n    description\n    isDeprecated\n    deprecationReason\n  }\n  possibleTypes {\n    ...TypeRef\n  }\n}\n\nfragment InputValue on __InputValue {\n  name\n  description\n  type {\n    ...TypeRef\n  }\n  defaultValue\n}\n\nfragment TypeRef on __Type {\n  kind\n  name\n  ofType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n';

export const SchemaDocumentationProvider = (props: { children: React.ReactNode }) => {
  const [str] = useState('');
  const [schema, setSchema] = useState<SchemaType>();
  const [schemaStack, setSchemaStack] = useState<SchemaStackElem[]>([]);

  const loadSchemaFromServer = useCallback(async (url: string) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    setSchema(data['data']['__schema']);
  }, []);

  const pushToStack = useCallback((elem: SchemaStackElem) => {
    setSchemaStack((prev) => [...prev, elem]);
  }, []);

  const popFromStack = useCallback(() => {
    setSchemaStack((prev) => prev.slice(0, prev.length - 1));
  }, []);

  const resetStack = useCallback(() => {
    setSchemaStack([]);
  }, []);

  const getCurrentElem = useCallback(() => {
    return schemaStack[schemaStack.length - 1];
  }, [schemaStack]);

  const value = useMemo(
    () => ({
      str,
      schema,
      loadSchemaFromServer,
      schemaStack,
      pushToStack,
      popFromStack,
      resetStack,
      getCurrentElem,
    }),
    [
      str,
      schema,
      loadSchemaFromServer,
      schemaStack,
      pushToStack,
      popFromStack,
      resetStack,
      getCurrentElem,
    ]
  );

  return (
    <SchemaDocumentationContext.Provider value={value}>
      {props.children}
    </SchemaDocumentationContext.Provider>
  );
};

export function useSchemaDocumentation() {
  return useContext(SchemaDocumentationContext);
}
