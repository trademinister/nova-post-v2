import { useRef, useState } from "react";
import { Box } from "../../types";

type Props = {
  heading: string;
  placeholder: string;
  boxes: Box[];
  selected: Box | null;
  onSelected: (value: Box | null) => void;
};

export default function UniformPackageModal({
  heading,
  placeholder,
  selected,
  onSelected,
  boxes,
}: Props) {
  const searchRef = useRef(null);
  const modalRef = useRef(null);
  const [search, setSearch] = useState(selected?.description || "");
  const [showOptions, setShowOptions] = useState<Box[] | []>();
  const isSelected = (id: string) => {
    return selected?.id === id;
  };

  const escapeRegExp = (text: string) =>
    text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const updateText = (value: string) => {
    setSearch(value);

    if (value === "") {
      setShowOptions(boxes);
      return;
    }

    const escapedValue = escapeRegExp(value);
    const filterRegex = new RegExp(escapedValue, "i");

    const resultOptions = boxes.filter((option) =>
      filterRegex.test(option.description),
    );

    setShowOptions(resultOptions);
  };

  return (
    <s-modal
      id="uniform-package-modal"
      ref={modalRef}
      heading={heading}
      onShow={() => {
        updateText(selected?.description || "");
        //@ts-ignore
        searchRef.current.focus();
      }}
    >
      <s-box paddingInline="small-200" paddingBlock="small-300">
        <s-stack direction="block" gap="base">
          <s-search-field
            ref={searchRef}
            placeholder={placeholder}
            value={search || ""}
            onInput={(e) => updateText(e.currentTarget.value)}
            autocomplete="off"
          />
          <s-stack direction="block" gap="small-300">
            {showOptions?.map((box) => (
              <s-clickable
                borderRadius="small-100"
                background="strong"
                onClick={() => {
                  onSelected(box);
                  //@ts-ignore
                  modalRef.current.hideOverlay();
                }}
              >
                <s-box paddingBlock="small-300" paddingInline="small-100">
                  <s-stack
                    direction="inline"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <s-stack
                      direction="inline"
                      gap="base"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <s-icon type="package" />
                      <s-stack direction="block">
                        {isSelected(box.id) ? (
                          <s-heading>{box.description}</s-heading>
                        ) : (
                          <s-text>{box.description}</s-text>
                        )}
                        <s-text color="subdued">{`${box.length}x${box.width}x${box.height}см Об'єм: ${box.volumetricWeight}кг`}</s-text>
                      </s-stack>
                    </s-stack>
                    <div
                      style={{
                        width: "25px",
                        height: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isSelected(box.id) && !box.external && (
                        <s-icon type="check" />
                      )}

                      {box.external && (
                        <s-button
                          icon="delete"
                          tone="critical"
                          variant="tertiary"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                        />
                      )}
                    </div>
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
