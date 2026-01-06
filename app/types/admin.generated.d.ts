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
          Pick<AdminTypes.Customer, 'legacyResourceId' | 'numberOfOrders' | 'displayName'>
          & { defaultEmailAddress?: AdminTypes.Maybe<Pick<AdminTypes.CustomerEmailAddress, 'emailAddress'>>, defaultAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'phone'>> }
        )>, fulfillmentOrders: { nodes: Array<{ lineItems: { nodes: Array<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>> }> } }> } }
      ) }>, pageInfo: Pick<AdminTypes.PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'> } };

export type GetRemainingProductsForFulfillmentQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type GetRemainingProductsForFulfillmentQuery = { order?: AdminTypes.Maybe<{ fulfillmentOrders: { nodes: Array<(
        Pick<AdminTypes.FulfillmentOrder, 'id'>
        & { lineItems: { nodes: Array<(
            Pick<AdminTypes.FulfillmentOrderLineItem, 'remainingQuantity'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, variant?: AdminTypes.Maybe<Pick<AdminTypes.ProductVariant, 'id' | 'displayName' | 'sku'>> }
          )> } }
      )> } }> };

export type GetDeliveryProfilesQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type GetDeliveryProfilesQuery = { deliveryProfiles: { nodes: Array<(
      Pick<AdminTypes.DeliveryProfile, 'name'>
      & { profileLocationGroups: Array<{ locationGroupZones: { nodes: Array<{ zone: (
              Pick<AdminTypes.DeliveryZone, 'name'>
              & { countries: Array<Pick<AdminTypes.DeliveryCountry, 'name'>> }
            ), methodDefinitions: { nodes: Array<Pick<AdminTypes.DeliveryMethodDefinition, 'name'>> } }> } }> }
    )> } };

interface GeneratedQueryTypes {
  "#graphql\n    query CurrentAppInstallation {\n        currentAppInstallation {\n            id\n            activeSubscriptions {\n                id\n                name\n                status\n                test\n            }\n        }\n    }\n": {return: CurrentAppInstallationQuery, variables: CurrentAppInstallationQueryVariables},
  "#graphql\n    query GetShopIsDev {\n        shop {\n            plan{\n                partnerDevelopment\n            }\n        }\n    }\n": {return: GetShopIsDevQuery, variables: GetShopIsDevQueryVariables},
  "#graphql\nquery GetPaginatedOrders($first: Int, $last: Int, $after: String, $before: String, $query: String, $reverse: Boolean, $sortKey: OrderSortKeys) {\n  orders(\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n    query: $query\n    reverse: $reverse\n    sortKey: $sortKey\n  ) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        currencyCode\n        legacyResourceId\n        cancelledAt\n        tags\n        note\n        displayFinancialStatus\n        displayFulfillmentStatus\n        currentSubtotalLineItemsQuantity\n        currentTotalWeight\n        shippingAddress {\n          countryCodeV2\n        }\n        shippingLine {\n          code\n        }\n        currentTotalPriceSet {\n          shopMoney {\n            amount\n          }\n          presentmentMoney {\n            amount\n            currencyCode\n          }\n        }\n        phone\n        customer {\n          legacyResourceId\n          numberOfOrders\n          displayName\n          defaultEmailAddress {\n            emailAddress\n          }\n          defaultAddress {\n            phone\n          }\n        }\n        fulfillmentOrders(first: 1, query: \"status:'OPEN' OR status:'IN_PROGRESS'\") {\n          nodes {\n            lineItems(first: 1) {\n              nodes {\n                image {\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}\n": {return: GetPaginatedOrdersQuery, variables: GetPaginatedOrdersQueryVariables},
  "#graphql\nquery getRemainingProductsForFulfillment($id: ID!) {\n  order(id: $id) {\n    fulfillmentOrders(first: 10, query: \"status:'OPEN' OR status:'IN_PROGRESS'\") {\n      nodes {\n        id\n        lineItems(first: 100) {\n          nodes {\n            remainingQuantity\n            image {\n              url\n            }\n            variant {\n              id\n              displayName\n              sku\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": {return: GetRemainingProductsForFulfillmentQuery, variables: GetRemainingProductsForFulfillmentQueryVariables},
  "#graphql\nquery GetDeliveryProfiles {\n  deliveryProfiles(first: 5) {\n    nodes {\n      name\n      profileLocationGroups {\n        locationGroupZones(first: 25) {\n          nodes {\n            zone {\n              countries {\n                name\n              }\n              name\n            }\n            methodDefinitions(first: 10) {\n              nodes {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": {return: GetDeliveryProfilesQuery, variables: GetDeliveryProfilesQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
