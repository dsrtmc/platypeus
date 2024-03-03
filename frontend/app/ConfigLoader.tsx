"use client";

import React, { useEffect } from "react";
import { ConfigType } from "@/shared/types/configTypes";
import { THEMES } from "@/shared/constants/themes";
import { getConfig, setConfig } from "@/utils/getConfig";

interface Props {}

const defaultConfig: ConfigType = {
  placeholder: "placeholder",
  themeName: "default",
  themeConfig: THEMES.default,
  time: 5,
  words: 50,
  mode: "time",
  language: "english",
};

/*
 * NOTE: Not sure whether that component is required, but for now I think it's
 * a good way to ensure something happens on every page on the client,
 * after the server-side render.
 */
export const ConfigLoader: React.FC<Props> = ({}) => {
  useEffect(() => {
    let config = getConfig();
    if (!config) {
      localStorage.setItem("config", JSON.stringify(defaultConfig));
      config = defaultConfig;
    }
    // Updates the config in case there are fields on `ConfigType` that are not defined in the loaded config.
    Object.keys(defaultConfig).forEach((key) => {
      if (!config![key]) {
        config![key] = defaultConfig[key];
      }
    });
    for (const property in config.themeConfig) {
      document.documentElement.style.setProperty(property, config.themeConfig[property]);
    }
    setConfig(config);
    console.log("Config loaded.");
  }, []);
  return null;
};
