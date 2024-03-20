"use client";

import React, { useEffect } from "react";
import { DEFAULT_CONFIG, getConfig, makeConfig, setConfig } from "@/utils/configUtils";
import { ThemeConfigType, ConfigCssVariable } from "@/shared/types/configTypes";
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
    root.style.setProperty(ConfigCssVariable.FontSize, config.fontSize + "px");
    root.style.setProperty(ConfigCssVariable.TestFontSizeMultiplier, config.testFontSizeMultiplier.toString());
    root.style.setProperty(ConfigCssVariable.FontFamily, config.fontFamily);

    root.style.setProperty(ConfigCssVariable.WrapperWidth, config.wrapperWidth + "px");

    console.log("Config loaded.");
  }, []);

  return null;
};
