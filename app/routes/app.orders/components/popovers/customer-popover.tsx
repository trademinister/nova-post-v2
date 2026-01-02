import React from "react";
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
              shopify.toast.show("Ім'я та прізвище скопійовано");
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
              Number(customer?.numberOfOrders) >= 5 ? "замовлень" : "замовлення"
            }`}</s-link>
          ) : (
            <s-link
              onClick={() =>
                navigate(`?customerId=${customer?.legacyResourceId}`)
              }
            >{`${customer?.numberOfOrders} ${
              Number(customer?.numberOfOrders) >= 5 ? "замовлень" : "замовлення"
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
                shopify.toast.show("Пошту скопійовано");
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
                shopify.toast.show("Номер телфону скопійовано");
              }}
            />
          </s-stack>
        )}
      </s-stack>
    </s-popover>
  );
}
