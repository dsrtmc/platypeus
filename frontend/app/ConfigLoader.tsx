"use client";

import React, { useEffect } from "react";
import { ConfigType } from "@/shared/types/configTypes";
import { getConfig, setConfig, DEFAULT_CONFIG, makeConfig } from "@/utils/configUtils";

interface Props {}

/*
 * NOTE: Not sure whether that component is required, but for now I think it's
 * a good way to ensure something happens on every page on the client,
 * after the server-side render.
 */
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
      root.style.setProperty(property, config.themeConfig[property]);
    }
    root.style.setProperty("--font-size", config.fontSize + "px");
    root.style.setProperty("--test-font-size-multiplier", config.testFontSizeMultiplier.toString());
    root.style.setProperty("--font-family", config.fontFamily);

    console.log("Config loaded.");
  }, []);
  return null;
};
