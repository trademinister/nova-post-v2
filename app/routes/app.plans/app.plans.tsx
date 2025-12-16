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
        <s-button onClick={() => handleActivateSubscription(plans[0])}>
          basic monthly
        </s-button>
        <s-button onClick={() => handleActivateSubscription(plans[1])}>
          basic annual
        </s-button>
        <s-button onClick={() => handleActivateSubscription(plans[2])}>
          pro monthly
        </s-button>
        <s-button onClick={() => handleActivateSubscription(plans[3])}>
          pro annual
        </s-button>
        <s-button onClick={() => handleActivateSubscription(plans[4])}>
          enterprise monthly
        </s-button>
        <s-button onClick={() => handleActivateSubscription(plans[5])}>
          enterprise annual
        </s-button>
        <s-button onClick={handleCancelSubscription}>
          cancel subscription
        </s-button>
      </s-stack>
    </s-page>
  );
}
