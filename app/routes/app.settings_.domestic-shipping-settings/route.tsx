import { LoaderFunctionArgs } from "react-router";
import DomesticShippingSettingsPage from "./app.settings.domestic-shipping-settings";

export { DomesticShippingSettingsPage as default };

export async function loader({ request }: LoaderFunctionArgs) {
  return {};
}
