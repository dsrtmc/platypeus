"use client";

import React, { useEffect } from "react";
import { DEFAULT_CONFIG, getConfig, makeConfig, setConfig } from "@/utils/configUtils";
import { ThemeCssVariablesType, ThemeConfigType, ConfigCssVariables } from "@/shared/types/configTypes";
import Config from "chart.js/dist/core/core.config";

interface Props {}

export const ConfigLoader: React.FC<Props> = ({}) => {
  useEffect(() => {
    let config = getConfig();
    if (!config) {
      config = makeConfig();
    }
    // Updates the config in case there are fields on `ConfigType` that are not defined in the loaded config.
    config = { ...DEFAULT_CONFIG, ...config };
    setConfig(config);

    const root = document.documentElement;
    for (const property in config.themeConfig) {
      root.style.setProperty(property, config.themeConfig[property as keyof ThemeConfigType]);
    }
    root.style.setProperty(ConfigCssVariables.FontSize, config.fontSize + "px");
    root.style.setProperty(ConfigCssVariables.TestFontSizeMultiplier, config.testFontSizeMultiplier.toString());
    root.style.setProperty(ConfigCssVariables.FontFamily, config.fontFamily);

    root.style.setProperty(ConfigCssVariables.WrapperWidth, config.wrapperWidth + "px");

    console.log("Config loaded.");
  }, []);

  return null;
};
