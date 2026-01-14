import { UseFormSetValue } from "react-hook-form";
import { FormValues } from "../../types";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  id: string;
  heading: string;
  placeholder: string;
  options: { label: string; value: string }[];
  defaultOptions: { label: string; value: string }[];
  selected: { label: string; value: string } | null;
  onSelected: (value: { label: string; value: string } | null) => void;
};

export default function AutocompleteModal({
  id,
  heading,
  placeholder,
  options,
  defaultOptions,
  selected,
  onSelected,
}: Props) {
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState<
    { label: string; value: string }[] | []
  >();
  const isSelected = (value: string) => {
    return selected?.value === value;
  };

  const updateText = useCallback(
    (value: string) => {
      setSearch(value);
      onSelected(null);
      if (value === "") {
        setShowOptions(defaultOptions);
        return;
      }
      const tempDeselectedOptions = [...options];

      let strictOptions: { label: string; value: string }[] = [];
      const stringFilter = (regExp: string) => {
        const strictFilterRegex = new RegExp(regExp, "i");
        strictOptions = [
          ...strictOptions,
          ...tempDeselectedOptions.filter((option, i) => {
            const valid = option.label.match(strictFilterRegex);
            if (valid) {
              delete tempDeselectedOptions[i];
            }
            return valid;
          }),
        ];
      };
      stringFilter(`Відділення №?${value}:? `);
      stringFilter(`Поштомат .+? №?${value}:`);
      const exactStr = `(^${value}|\b${value}\b)`;
      const exactFilterRegex = new RegExp(exactStr, "i");
      const aproxFilterRegex = new RegExp(value, "i");

      const fixedOptions = tempDeselectedOptions.filter((option, i) => {
        const valid = option.label.match(exactFilterRegex);
        if (valid) {
          delete tempDeselectedOptions[i];
        }
        return valid;
      });

      const aproxOptions = tempDeselectedOptions.filter((option, i) => {
        const valid = option.label.match(aproxFilterRegex);
        if (valid) {
          delete tempDeselectedOptions[i];
        }
        return valid;
      });
      const resultOptions = [
        ...strictOptions,
        ...fixedOptions,
        ...aproxOptions,
      ];

      if (
        resultOptions[0]?.label?.toLowerCase() === value.toLowerCase() ||
        resultOptions.length === 1
      ) {
        onSelected(resultOptions[0]);
      }
      if (strictOptions.length === 1) {
        onSelected(strictOptions[0]);
      }
      setShowOptions(resultOptions.slice(0, 50));
    },
    [options],
  );

  return (
    <s-modal
      id={id}
      heading={heading}
      onShow={() => {
        updateText(selected?.label || "");
        //@ts-ignore
        searchRef.current.focus();
      }}
    >
      <s-box paddingInline="small-200" paddingBlock="small-300">
        <s-stack direction="block" gap="large">
          <s-search-field
            ref={searchRef}
            placeholder={placeholder}
            value={selected?.label || search || ""}
            onInput={(e) => updateText(e.currentTarget.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (selected) {
                  e.currentTarget.closest("s-modal")?.hideOverlay();
                }
              }
            }}
            autocomplete="off"
          />
          <s-stack direction="block" gap="small-300">
            {showOptions?.map((option, i) => (
              <s-clickable
                key={`option-${id}-${i}`}
                borderRadius="small-100"
                background="strong"
                commandFor={id}
                command="--hide"
                onClick={() => onSelected(option)}
              >
                <s-box paddingBlock="small-300" paddingInline="small-100">
                  <s-stack direction="inline" justifyContent="space-between">
                    {isSelected(option.value) ? (
                      <s-heading>{option.label}</s-heading>
                    ) : (
                      <s-text type={"strong"}>{option.label}</s-text>
                    )}
                    {isSelected(option.value) && <s-icon type="check" />}
                  </s-stack>
                </s-box>
              </s-clickable>
            ))}
          </s-stack>
        </s-stack>
      </s-box>
    </s-modal>
  );
}
