type Props = { id: string; options: { label: string; value: string }[] };

export default function AutocompletePopover({ id, options }: Props) {
  return (
    <s-popover id={id} maxInlineSize="100%" minInlineSize="25%">
      <s-box paddingInline="small-200" paddingBlock="small-300">
        <s-stack gap="small-300">
          {options.map((option, i) => (
            <s-clickable
              key={`option-${id}`}
              borderRadius="small-100"
              background="strong"
              commandFor={id}
              command="--hide"
            >
              <s-box paddingBlock="small-300" paddingInline="small-100">
                <s-text>{option.label}</s-text>
              </s-box>
            </s-clickable>
          ))}
        </s-stack>
      </s-box>
    </s-popover>
  );
}
