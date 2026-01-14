import { UseFormSetValue } from "react-hook-form";
import { FormValues } from "../types";
import AutocompleteModal from "./modals/autocomplete-modal";

type Props = {
  id: string;
  label: string;
  modalHeading: string;
  placeholder: string;
  searchPlaceholder: string;
  selected: { label: string; value: string } | null;
  options: { label: string; value: string }[];
  defaultOptions: { label: string; value: string }[];
  shortcuts?: { label: string; value: string }[];
  required?: boolean;
  onSelected: (value: { label: string; value: string } | null) => void;
};

export default function Autocomplete({
  id,
  label,
  modalHeading,
  placeholder,
  searchPlaceholder,
  selected,
  options,
  defaultOptions,
  shortcuts,
  required = false,
  onSelected,
}: Props) {
  return (
    <s-stack direction="block" gap="small-400">
      <s-text>{`${label}${required ? " *" : ""}`}</s-text>
      <s-stack direction="block">
        <s-clickable
          commandFor={id}
          border="base"
          borderColor="strong"
          padding="small-300"
          background="base"
          borderRadius="small"
        >
          <s-stack direction="inline" justifyContent="space-between">
            {selected?.label ? selected.label : placeholder}
            <s-icon type="chevron-down" />
          </s-stack>
        </s-clickable>
        {shortcuts && shortcuts.length > 0 && (
          <s-stack direction="inline" justifyContent={"space-between"}>
            {shortcuts.map((shortcut) => (
              <s-link onClick={() => onSelected(shortcut)}>
                {shortcut.label}
              </s-link>
            ))}
          </s-stack>
        )}
      </s-stack>
      <AutocompleteModal
        id={id}
        heading={modalHeading}
        placeholder={searchPlaceholder}
        options={options}
        defaultOptions={defaultOptions}
        onSelected={onSelected}
        selected={selected}
      />
    </s-stack>
  );
}
