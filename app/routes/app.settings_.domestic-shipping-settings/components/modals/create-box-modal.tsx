import React from "react";

type Props = {};

export default function CreateBoxModal({}: Props) {
  return (
    <s-modal id="create-box-modal" heading="Створити коробку">
      <s-grid gridTemplateColumns="repeat(12, 1fr)" gap="base">
        <s-grid-item gridColumn="span 12" gridRow="span 1">
          <s-text-field label="Назва" />
        </s-grid-item>
        <s-grid-item gridColumn="span 4" gridRow="span 2">
          <s-text-field label="Довжина" />
        </s-grid-item>
        <s-grid-item gridColumn="span 4" gridRow="span 2">
          <s-text-field label="Ширина"></s-text-field>
        </s-grid-item>
        <s-grid-item gridColumn="span 4" gridRow="span 2">
          <s-text-field label="Висота"></s-text-field>
        </s-grid-item>
      </s-grid>
      <s-button
        slot="primary-action"
        variant="primary"
        commandFor="create-box-modal"
        command="--hide"
      >
        Зберегти
      </s-button>
    </s-modal>
  );
}
