import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  Customer,
  CustomerEmailAddress,
  MailingAddress,
  Maybe,
} from "~/types/admin.types";

type Props = {
  customer:
    | (Maybe<
        Pick<
          Customer,
          "legacyResourceId" | "numberOfOrders" | "displayName"
        > & {
          defaultEmailAddress?: Maybe<
            Pick<CustomerEmailAddress, "emailAddress">
          >;
          defaultAddress?: Maybe<Pick<MailingAddress, "phone">>;
        }
      > & { phone?: Maybe<string> })
    | undefined;
  i: number;
};

export default function CustomerPopover({ customer, i }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation(["global"]);

  return (
    <s-popover id={`customer-popover-${i}`}>
      <s-stack direction="block" padding="small-300" paddingInlineStart="base">
        <s-stack
          gap="base"
          direction="inline"
          justifyContent="space-between"
          alignItems="center"
        >
          <s-link
            href={`shopify://admin/customers/${customer?.legacyResourceId}`}
          >
            {customer?.displayName}
          </s-link>
          <s-button
            accessibilityLabel="name-clipboard=button"
            variant="tertiary"
            icon="clipboard"
            onClick={() => {
              navigator.clipboard.writeText(customer?.displayName!);
              shopify.toast.show(t("popovers.customer-popover.name-copied"));
            }}
          />
        </s-stack>
        <s-stack>
          {Number(customer?.numberOfOrders) === 0 ? (
            // <s-text>{`${customer?.numberOfOrders} замовлень`}</s-text>
            <s-link
              commandFor={`customer-popover-${i}`}
              onClick={() =>
                navigate(`?customerId=${customer?.legacyResourceId}`)
              }
            >{`${customer?.numberOfOrders} ${
              Number(customer?.numberOfOrders) >= 5 ? t("orders.plural") : t("orders.singular")
            }`}</s-link>
          ) : (
            <s-link
              onClick={() =>
                navigate(`?customerId=${customer?.legacyResourceId}`)
              }
            >{`${customer?.numberOfOrders} ${
              Number(customer?.numberOfOrders) >= 5 ? t("orders.plural") : t("orders.singular")
            }`}</s-link>
          )}
        </s-stack>
        {customer?.defaultEmailAddress?.emailAddress && (
          <s-stack
            gap="base"
            direction="inline"
            justifyContent="space-between"
            alignItems="center"
          >
            <s-text>{customer?.defaultEmailAddress?.emailAddress}</s-text>
            <s-button
              accessibilityLabel="email-clipboard-button"
              variant="tertiary"
              icon="clipboard"
              onClick={() => {
                navigator.clipboard.writeText(
                  customer?.defaultEmailAddress?.emailAddress!,
                );
                shopify.toast.show(t("popovers.customer-popover.email-copied"));
              }}
            />
          </s-stack>
        )}
        {(customer?.defaultAddress?.phone || customer?.phone) && (
          <s-stack
            gap="base"
            direction="inline"
            justifyContent="space-between"
            alignItems="center"
          >
            <s-text>{customer?.defaultAddress?.phone || customer.phone}</s-text>
            <s-button
              accessibilityLabel="phone-clipboard-button"
              variant="tertiary"
              icon="clipboard"
              onClick={() => {
                const phone = customer?.defaultAddress?.phone || customer.phone;
                navigator.clipboard.writeText(phone!);
                shopify.toast.show(t("popovers.customer-popover.phone-copied"));
              }}
            />
          </s-stack>
        )}
      </s-stack>
    </s-popover>
  );
}
