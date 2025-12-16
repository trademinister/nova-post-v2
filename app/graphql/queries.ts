export const getAppSubscription = `
    #graphql
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

export const getShopIsDev = `
    #graphql
    query GetShopIsDev {
        shop {
            plan{
                partnerDevelopment
            }
        }
    }
`;
