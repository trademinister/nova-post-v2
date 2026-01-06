import { LoaderFunctionArgs } from "react-router";
import DomesticDeliveryMethods from "./app.settings.domestic-delivery-methods";
import { authenticate } from "~/shopify.server";
import { getDeliveryProfiles } from "~/graphql/queries";

export { DomesticDeliveryMethods as default };

export async function loader({ request }: LoaderFunctionArgs) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(getDeliveryProfiles);
  const json = await response.json();
  const ukraineProfile = (json.data?.deliveryProfiles?.nodes ?? [])
    .flatMap((profile) => profile.profileLocationGroups ?? [])
    .flatMap((group) => group.locationGroupZones?.nodes ?? [])
    .map((zoneNode) => {
      const zoneName = zoneNode.zone?.name ?? "";

      const hasUkraine = (zoneNode.zone?.countries ?? []).some(
        (c) => c.name === "Ukraine",
      );

      if (!zoneName || !hasUkraine) return null;

      return {
        zoneName,
        countryName: "Ukraine",
        deliveryMethods: (zoneNode.methodDefinitions?.nodes ?? []).map(
          (md) => ({
            name: md.name,
          }),
        ),
      };
    })
    .find(Boolean);
  
  // TODO: Зупинився на отриманні методів доставки для України
  
  console.log(JSON.stringify(ukraineProfile));

  return {};
}
