import type { HeadersFunction } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";

export default function Index() {

  return (
    <s-page heading="Shopify app template">
      <s-section heading="Congrats on creating a new Shopify app 🎉">asd</s-section>

      <s-section slot="aside" heading="Test">
        <s-paragraph>Test</s-paragraph>
      </s-section>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
