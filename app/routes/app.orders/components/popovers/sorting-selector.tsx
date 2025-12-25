import React from "react";

type Props = {
  sortDirection: "asc" | "desc";
  search: string;
  filter(
    query: string,
    filterName?: string | undefined,
    value?: string[] | string | undefined,
  ): void;
  setValue: (
    name: "sortDirection",
    value: "asc" | "desc",
    options?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
          shouldTouch: boolean;
        }>
      | undefined,
  ) => void;
};

export default function SortingSelector({
  sortDirection,
  search,
  filter,
  setValue,
}: Props) {
  return (
    <s-popover id="sort-popover">
      <s-box padding="small-500">
        <s-stack direction="block" gap="small-500">
          <s-box padding="small-300" paddingInlineStart="small-100">
            <s-choice-list name="sort-key-choice-list" label="Сортувати за">
              <s-choice selected>Номер замовлення</s-choice>
            </s-choice-list>
          </s-box>
          <s-divider />
          <s-stack direction="block" gap="small-500">
            <s-clickable
              padding="small-500"
              commandFor={sortDirection === "asc" ? "sort-popover" : undefined}
              background={sortDirection === "asc" ? "strong" : "transparent"}
              onClick={(e) => {
                console.log(sortDirection);
                if (sortDirection === "asc") {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                setValue("sortDirection", "asc", {
                  shouldDirty: true,
                });
                filter(search, "sortDirection", "asc");
              }}
            >
              <s-stack
                direction="inline"
                gap="small-500"
                paddingInlineStart="small-100"
              >
                <s-icon type="sort-ascending" />
                <s-text type={sortDirection === "asc" ? "strong" : "generic"}>
                  За зростанням
                </s-text>
              </s-stack>
            </s-clickable>
            <s-clickable
              padding="small-500"
              commandFor="sort-popover"
              background={sortDirection === "desc" ? "strong" : "transparent"}
              onClick={(e) => {
                if (sortDirection === "desc") {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                setValue("sortDirection", "desc", {
                  shouldDirty: true,
                });
                filter(search, "sortDirection", "desc");
              }}
            >
              <s-stack
                direction="inline"
                gap="small-500"
                paddingInlineStart="small-100"
              >
                <s-icon type="sort-descending" />
                <s-text type={sortDirection === "desc" ? "strong" : "generic"}>
                  За спаданням
                </s-text>
              </s-stack>
            </s-clickable>
          </s-stack>
        </s-stack>
      </s-box>
    </s-popover>
  );
}
