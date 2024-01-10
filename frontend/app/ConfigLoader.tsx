"use client";

import React, { useEffect } from "react";
import { ConfigType } from "@/shared/types/configTypes";
import { THEMES } from "@/shared/constants/themes";

interface Props {}

const defaultConfig: ConfigType = {
  placeholder: "placeholder",
  themeConfig: THEMES.default,
};

/*
 * NOTE: Not sure whether that component is required, but for now I think it's
 * a good way to ensure something happens on every page on the client,
 * after the server-side render.
 */
export const ConfigLoader: React.FC<Props> = ({}) => {
  useEffect(() => {
    console.log("Config loaded.");
    let config: ConfigType = JSON.parse(localStorage.getItem("config"));
    if (!config) {
      localStorage.setItem("config", JSON.stringify(defaultConfig));
      config = defaultConfig;
    }
    for (const property in config.themeConfig) {
      document.documentElement.style.setProperty(property, config.themeConfig[property]);
    }
  }, []);
  return <></>;
};
