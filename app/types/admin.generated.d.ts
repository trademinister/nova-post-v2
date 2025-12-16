/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type CurrentAppInstallationQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type CurrentAppInstallationQuery = { currentAppInstallation: (
    Pick<AdminTypes.AppInstallation, 'id'>
    & { activeSubscriptions: Array<Pick<AdminTypes.AppSubscription, 'id' | 'name' | 'status' | 'test'>> }
  ) };

export type GetShopIsDevQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type GetShopIsDevQuery = { shop: { plan: Pick<AdminTypes.ShopPlan, 'partnerDevelopment'> } };

interface GeneratedQueryTypes {
  "\n    #graphql\n    query CurrentAppInstallation {\n        currentAppInstallation {\n            id\n            activeSubscriptions {\n                id\n                name\n                status\n                test\n            }\n        }\n    }\n": {return: CurrentAppInstallationQuery, variables: CurrentAppInstallationQueryVariables},
  "\n    #graphql\n    query GetShopIsDev {\n        shop {\n            plan{\n                partnerDevelopment\n            }\n        }\n    }\n": {return: GetShopIsDevQuery, variables: GetShopIsDevQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
