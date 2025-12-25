export const getAppSubscription = `#graphql
    query CurrentAppInstallation {
        currentAppInstallation {
            id
            activeSubscriptions {
                id
                name
                status
                test
            }
        }
    }
`;

export const getShopIsDev = `#graphql
    query GetShopIsDev {
        shop {
            plan{
                partnerDevelopment
            }
        }
    }
`;

export const getPaginatedOrders = `#graphql
query GetPaginatedOrders($first: Int, $last: Int, $after: String, $before: String $query: String, $reverse: Boolean, $sortKey: OrderSortKeys) {
  orders(first: $first, last: $last, after: $after, before: $before, query: $query, reverse: $reverse, sortKey: $sortKey) {
    edges {
      node {
        id
        name
        createdAt
        currencyCode
        legacyResourceId
        cancelledAt
        tags
        note
        displayFinancialStatus
        displayFulfillmentStatus
        currentSubtotalLineItemsQuantity
        currentTotalWeight
        shippingAddress {
          countryCodeV2
        }
        shippingLine {
          code
        }
        currentTotalPriceSet {
          shopMoney {
            amount
          }
          presentmentMoney {
            amount
            currencyCode
          }
        }
        phone
        customer {
          legacyResourceId
          numberOfOrders
          displayName
          email
          defaultAddress {
            phone
          }
        }
        lineItems(first: 1) {
          nodes {
            sku
            image {
              url
            }
          }
        }
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
`;
