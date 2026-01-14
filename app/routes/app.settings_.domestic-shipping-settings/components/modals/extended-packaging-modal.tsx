import React, { useState } from "react";
import "../../../../styles/capacity-table.css";
import { Box } from "../../types";

type Props = {
  boxes: Box[];
  selected: Box | null;
  onSelected: (value: Box | null) => void;
};

export default function ExtendedPackagingModal({
  boxes,
  selected,
  onSelected,
}: Props) {
  const [capacity, setCapacity] = useState("20");
  const [isPackagingSelector, setIsPackagingSelector] = useState(false);

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

  // TODO: Треба змінювати контент модалки за потреби: 1) Змінювати її контект коли обираю коробку, 2) Коли треба подивитись на варіанти

  return (
    <s-modal
      id="extended-packaging-modal"
      heading="Розширене пакування товарів"
      size="large"
      padding="none"
      onHide={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {!isPackagingSelector ? (
        <>
          <s-box padding="base">
            <s-stack direction="block" gap="small-300">
              <s-text>Заповненість коробки</s-text>
              <s-stack direction="inline" gap="small-300">
                <s-button
                  icon="minus"
                  onClick={() => {
                    if (Number(capacity) > 20) {
                      setCapacity(String(Number(capacity) - 5));
                    }
                  }}
                />
                <s-box inlineSize="12%">
                  <s-number-field
                    autocomplete="off"
                    min={20}
                    max={100}
                    step={1}
                    readOnly
                    value={capacity}
                    suffix="%"
                    inputMode="numeric"
                  />
                </s-box>
                <s-button
                  icon="plus"
                  onClick={() => {
                    if (Number(capacity) < 100) {
                      setCapacity(String(Number(capacity) + 5));
                    }
                  }}
                />
              </s-stack>
            </s-stack>
          </s-box>
          <s-box padding="none">
            <s-stack direction="block" gap="small-300">
              <s-box paddingInlineStart="small-300" paddingBlockEnd="small-300">
                <s-heading>Продукти</s-heading>
              </s-box>

              <s-table>
                <s-table-header-row>
                  <s-table-header>Назва товару</s-table-header>
                  <s-table-header>Варіанти</s-table-header>
                  <s-table-header>Пакування</s-table-header>
                  <s-table-header>Ємність</s-table-header>
                </s-table-header-row>
                <s-table-body>
                  <s-table-row>
                    {/* Назва товару */}
                    <s-table-cell>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <s-thumbnail size="small" />
                        <span className="product-name">Тестовий продукт</span>
                      </div>
                    </s-table-cell>

                    {/* Варіанти */}
                    <s-table-cell>
                      <s-clickable-chip color="strong">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <s-text>4 варіанти</s-text>
                          <s-icon type="select" />
                        </div>
                      </s-clickable-chip>
                    </s-table-cell>

                    {/* Пакування */}
                    <s-table-cell>
                      <s-clickable
                        border="base"
                        padding="small-300"
                        background="base"
                        borderColor="strong"
                        borderRadius="small"
                        onClick={() => setIsPackagingSelector(true)}
                      >
                        <s-stack
                          direction="inline"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <s-text>Обрати пакування</s-text>
                          <s-icon type="chevron-down" />
                        </s-stack>
                      </s-clickable>
                    </s-table-cell>

                    {/* Ємність (вузька колонка) */}
                    <s-table-cell>
                      <s-number-field
                        min={1}
                        autocomplete="off"
                      ></s-number-field>
                    </s-table-cell>
                  </s-table-row>
                </s-table-body>
              </s-table>
            </s-stack>
          </s-box>
        </>
      ) : (
        <s-box padding="base">
          <s-stack direction="block" gap="base">
            <s-search-field
              placeholder={"Шукати коробки"}
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
                    setIsPackagingSelector(false);
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
                        <s-stack
                          direction="inline"
                          gap="small-300"
                          alignItems="center"
                        >
                          <s-text>Стакування</s-text>
                          <s-box inlineSize="80px">
                            <s-number-field
                              onFocus={(e) => e.stopPropagation()}
                              autocomplete="off"
                            ></s-number-field>
                          </s-box>
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
      )}
    </s-modal>
  );
}
