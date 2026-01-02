import { DebouncedFunction } from "debounce";
import { UseFormSetValue } from "react-hook-form";
import { useNavigate } from "react-router";
import { toggleInArray } from "../../functions";
import { FormValues } from "../../types";

type Props = {
  id: "payment-status-popover" | "fulfillment-status-popover";
  resourceName: "paymentStatusesFilter" | "fulfillmentStatusesFilter";
  selectedStatuses: string[];
  search: string;
  setValue: UseFormSetValue<FormValues>;
  searchDebounce: DebouncedFunction<
    (
      query: string,
      filterName?: string,
      filters?: string[],
      filter?: string,
    ) => void
  >;
};

export default function StatusesFilterSelector({
  id,
  resourceName,
  selectedStatuses,
  search,
  setValue,
  searchDebounce,
}: Props) {
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const statuses =
    resourceName === "paymentStatusesFilter"
      ? [
          ["Authorized", "Authorized"],
          ["Expired", "Expired"],
          ["Paid", "Paid"],
          ["Pending", "Pending"],
          ["Partially paid", "Partially paid"],
          ["Refunded", "Refunded"],
          ["Voided", "Voided"],
        ]
      : [
          ["Fulfilled", "shipped"],
          ["Unfulfilled", "unshipped"],
          ["Partially fulfilled", "partial"],
        ];

  return (
    <s-popover id={id}>
      <s-box
        padding="base"
        paddingBlockEnd="none"
        paddingBlockStart="small-500"
        paddingInlineStart="small-200"
      >
        {statuses.map(([key, value]) => (
          <s-checkbox
            key={key}
            label={key}
            checked={selectedStatuses.includes(value)}
            value={value}
            onInput={(e) => {
              const value = e.currentTarget.value;
              const newStatuses = toggleInArray(selectedStatuses, value);
              searchDebounce(
                search,
                resourceName.replace("Filter", ""),
                newStatuses,
              );
              setValue(resourceName, newStatuses, {
                shouldDirty: true,
              });
            }}
          />
        ))}
      </s-box>
      <s-divider />
      <s-box paddingInlineStart="base">
        <s-link
          commandFor={id}
          command="--hide"
          onClick={() => {
            setValue(`${resourceName}Visibility`, false, {
              shouldDirty: true,
            });
            setValue("paymentStatusesFilter", [], {
              shouldDirty: true,
            });
            params.delete("paymentStatuses");
            navigate(`?${params.toString()}`);
          }}
        >
          Очистити
        </s-link>
      </s-box>
    </s-popover>
  );
}
