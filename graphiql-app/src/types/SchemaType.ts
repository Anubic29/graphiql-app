import { GraphQLObjectType } from 'graphql';

type SEnumType = {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: null;
};

export type SMiniType = {
  kind: string;
  name: string | null;
  ofType: SMiniType | null;
};

export type SArgType = {
  name: string;
  description: string;
  type: SMiniType;
  defaultValue: null;
};

export type SFieldType = {
  name: string;
  description: string;
  args: SArgType[];
  type: SMiniType;
  isDeprecated: boolean;
  deprecationReason: null;
};

export type SType = {
  kind: string;
  name: string;
  description: string;
  fields: SFieldType[] | null;
  inputFields: SArgType[] | null;
  enumValues: SEnumType[] | null;
  interfaces: [] | null;
  possibleTypes: null;
};

export type SchemaType = {
  types: SType[];
  subscriptionType: null;
  mutationType: null;
  queryType: GraphQLObjectType;
  directives: [];
};
