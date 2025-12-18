import React from "react";
import { useLoaderData, useSubmit } from "react-router";
import { loader } from "./route";

export default function Plans() {
  const { plans } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleActivateSubscription = async (plan: string) => {
    submit(
      { action: "subscribe", plan },
      { method: "POST", encType: "application/json" },
    );
  };

  const handleCancelSubscription = async () => {
    submit(
      { action: "cancel" },
      { method: "POST", encType: "application/json" },
    );
  };

  return (
    <s-page>
      <s-stack>
        {plans.map((plan) => (
          <s-button
            key={plan.name}
            onClick={() => handleActivateSubscription(plan.name)}
          >
            {plan.name}
          </s-button>
        ))}
        <s-button onClick={handleCancelSubscription}>
          cancel subscription
        </s-button>
      </s-stack>
    </s-page>
  );
}
