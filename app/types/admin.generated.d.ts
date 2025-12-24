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

export type GetPaginatedOrdersQueryVariables = AdminTypes.Exact<{
  first?: AdminTypes.InputMaybe<AdminTypes.Scalars['Int']['input']>;
  last?: AdminTypes.InputMaybe<AdminTypes.Scalars['Int']['input']>;
  after?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
  before?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
  query?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
  reverse?: AdminTypes.InputMaybe<AdminTypes.Scalars['Boolean']['input']>;
  sortKey?: AdminTypes.InputMaybe<AdminTypes.OrderSortKeys>;
}>;


export type GetPaginatedOrdersQuery = { orders: { edges: Array<{ node: (
        Pick<AdminTypes.Order, 'id' | 'name' | 'createdAt' | 'currencyCode' | 'legacyResourceId' | 'cancelledAt' | 'tags' | 'note' | 'displayFinancialStatus' | 'displayFulfillmentStatus' | 'currentSubtotalLineItemsQuantity' | 'currentTotalWeight' | 'phone'>
        & { shippingAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'countryCodeV2'>>, shippingLine?: AdminTypes.Maybe<Pick<AdminTypes.ShippingLine, 'code'>>, currentTotalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount'>, presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, customer?: AdminTypes.Maybe<(
          Pick<AdminTypes.Customer, 'legacyResourceId' | 'numberOfOrders' | 'displayName' | 'email'>
          & { defaultAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'phone'>> }
        )>, lineItems: { nodes: Array<(
            Pick<AdminTypes.LineItem, 'sku'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>> }
          )> } }
      ) }>, pageInfo: Pick<AdminTypes.PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'> } };

interface GeneratedQueryTypes {
  "\n    #graphql\n    query CurrentAppInstallation {\n        currentAppInstallation {\n            id\n            activeSubscriptions {\n                id\n                name\n                status\n                test\n            }\n        }\n    }\n": {return: CurrentAppInstallationQuery, variables: CurrentAppInstallationQueryVariables},
  "\n    #graphql\n    query GetShopIsDev {\n        shop {\n            plan{\n                partnerDevelopment\n            }\n        }\n    }\n": {return: GetShopIsDevQuery, variables: GetShopIsDevQueryVariables},
  "#graphql\nquery GetPaginatedOrders($first: Int, $last: Int, $after: String, $before: String $query: String, $reverse: Boolean, $sortKey: OrderSortKeys) {\n  orders(first: $first, last: $last, after: $after, before: $before, query: $query, reverse: $reverse, sortKey: $sortKey) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        currencyCode\n        legacyResourceId\n        cancelledAt\n        tags\n        note\n        displayFinancialStatus\n        displayFulfillmentStatus\n        currentSubtotalLineItemsQuantity\n        currentTotalWeight\n        shippingAddress {\n          countryCodeV2\n        }\n        shippingLine {\n          code\n        }\n        currentTotalPriceSet {\n          shopMoney {\n            amount\n          }\n          presentmentMoney {\n            amount\n            currencyCode\n          }\n        }\n        phone\n        customer {\n          legacyResourceId\n          numberOfOrders\n          displayName\n          email\n          defaultAddress {\n            phone\n          }\n        }\n        lineItems(first: 1) {\n          nodes {\n            sku\n            image {\n              url\n            }\n          }\n        }\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}\n": {return: GetPaginatedOrdersQuery, variables: GetPaginatedOrdersQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
