import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import SvgIcons, { ISvgIcons } from "~/assets/icons/svgIcons";

type links = {
  id: string;
  url: string;
  name: string;
};

interface ISettingBlock {
  title: string;
  iconName: ISvgIcons["name"];
  links: links[];
  disabled?: boolean;
  disabledMessage?: JSX.Element;
}

function SettingBlock({
  title,
  links,
  iconName,
  disabled,
  disabledMessage,
}: ISettingBlock) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const navigate = useNavigate();

  const showOverlay = disabled && mouseOver;

  return (
    <div
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className="relative"
    >
      <s-section padding="none">
        <div
          className={`flex flex-col w-full h-36 relative ${
            disabled ? "opacity-90" : ""
          }`}
        >
          <div
            className={`relative w-full h-full overflow-hidden transition-all duration-300 ${
              showOverlay ? "filter blur-sm" : ""
            }`}
          >
            <SvgIcons
              name={iconName}
              className={`absolute inset-x-0 w-full ${
                !disabled
                  ? `transition-all ease-in-out duration-200 ${
                      mouseOver
                        ? links.length >= 2
                          ? `transform scale-50 ${
                              title.length >= 10 ? "top-3" : "top-0"
                            } -left-20`
                          : `transform ${
                              title.length >= 10
                                ? "scale-50 -left-20 top-3"
                                : "scale-75 -left-16 top-3"
                            }`
                        : "top-5"
                    }`
                  : "top-5"
              }`}
            />
            <div
              className={`absolute left-0 right-0 flex justify-center items-center text-2xl ${
                !disabled
                  ? `transition-all ease-in-out duration-200 scale-125 ${
                      mouseOver
                        ? links.length > 2
                          ? "transform scale-150 top-5"
                          : "transform scale-125 top-8"
                        : "top-24"
                    }`
                  : "top-24"
              }`}
            >
              <s-heading>{title}</s-heading>
            </div>
            {!disabled && (
              <div
                className={`transition-all ease-in-out duration-300 h-full ${
                  mouseOver
                    ? "opacity-100 pointer-events-auto translate-y-0"
                    : "opacity-0 pointer-events-none translate-y-12"
                }`}
              >
                <div className="flex flex-col justify-end h-full">
                  {links.map((link) => (
                    <div
                      onClick={() => navigate(link.url)}
                      className={`flex transition-all ease-in-out duration-100 
                        bg-bg-settings px-6 hover:bg-bg-settings-hover cursor-pointer 
                        ${links.length > 1 ? "py-1" : "py-3"}`}
                      key={link.id}
                    >
                      <s-stack
                        gap="none"
                        direction="inline"
                        alignItems="center"
                      >
                        <div className="transform rotate-90">
                          <s-icon type="caret-up" />
                        </div>
                        <s-paragraph>
                          <s-link>{link.name}</s-link>
                        </s-paragraph>
                      </s-stack>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            className={`absolute inset-0 z-10 flex justify-center items-center px-4 text-center pointer-events-none 
    transition-all duration-300 ease-out
    ${showOverlay ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95"} 
    bg-white/40 backdrop-blur-sm`}
          >
            {disabledMessage}
          </div>
        </div>
      </s-section>
    </div>
  );
}

export default function Settings() {
  const { t } = useTranslation(["settings", "global"]);

  return (
    <s-page heading={t("page_title")}>
      <s-box padding="base">
        <s-stack gap="base">
          <s-grid gridTemplateColumns="repeat(4, 1fr)" gap="base">
            <s-grid-item>
              <SettingBlock
                iconName="settings"
                title={t("settings_box.settings.title")}
                links={[
                  {
                    id: "1",
                    name: t("settings_box.settings.links.settings"),
                    url: "app",
                  },
                ]}
              />
            </s-grid-item>
            <s-grid-item>
              <SettingBlock
                iconName="settings"
                title={t("settings_box.nova_poshta.fulfillment_settings.title")}
                links={[
                  {
                    id: "1",
                    name: t(
                      "settings_box.nova_poshta.fulfillment_settings.links.settings",
                    ),
                    url: "fulfillment",
                  },
                ]}
              />
            </s-grid-item>
          </s-grid>
        </s-stack>
      </s-box>
    </s-page>
  );
}
