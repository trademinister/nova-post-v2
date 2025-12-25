import React from "react";

type Props = { i: number };

export default function TabManager({ i }: Props) {
  return (
    <s-popover id={`tab-manager-${i}`}>
      <s-stack
        direction="block"
        gap="small-500"
        paddingInline="small-300"
        paddingBlock="small-300"
      >
        <s-clickable
          padding="small-400"
          commandFor={`tab-manager-${i}`}
          borderRadius="small"
          onClick={() =>
            document
              .getElementById("rename-tab-modal")
              //@ts-ignore
              ?.showOverlay()
          }
        >
          <s-stack direction="inline" gap="small-500">
            <s-icon type="edit" />
            <s-text>Перейменувати</s-text>
          </s-stack>
        </s-clickable>
        <s-clickable
          padding="small-400"
          commandFor={`tab-manager-${i}`}
          borderRadius="small"
          onClick={() =>
            document
              .getElementById("dublicate-tab-modal")
              //@ts-ignore
              ?.showOverlay()
          }
        >
          <s-stack direction="inline" gap="small-500">
            <s-icon type="note-add" />
            <s-text>Дублювати</s-text>
          </s-stack>
        </s-clickable>
        <s-clickable
          padding="small-400"
          commandFor={`tab-manager-${i}`}
          borderRadius="small"
          onClick={() =>
            document
              .getElementById("tab-delete-confirmation-modal")
              //@ts-ignore
              ?.showOverlay()
          }
        >
          <s-stack direction="inline" gap="small-500">
            <s-icon type="delete" tone="critical" />
            <s-text>Видалити</s-text>
          </s-stack>
        </s-clickable>
      </s-stack>
    </s-popover>
  );
}
