"use client";

import React, { useEffect } from "react";
import { ConfigType } from "@/shared/types/configTypes";
import { THEMES } from "@/shared/constants/themes";
import { getConfig, setConfig, DEFAULT_CONFIG, makeConfig } from "@/utils/configUtils";
import { Chart } from "chart.js";
import { FontSizeChangeSection } from "@/app/settings/FontSizeChangeSection";

interface Props {}

/*
 * NOTE: Not sure whether that component is required, but for now I think it's
 * a good way to ensure something happens on every page on the client,
 * after the server-side render.
 */
// TODO: fix the funny font flicker, it just flicks through 2 fonts BEFORE selecting the correct one, lol
export const ConfigLoader: React.FC<Props> = ({}) => {
  useEffect(() => {
    let config = getConfig();
    if (!config) {
      config = makeConfig();
    }
    // Updates the config in case there are fields on `ConfigType` that are not defined in the loaded config.
    Object.keys(DEFAULT_CONFIG).forEach((key) => {
      if (!config![key]) {
        config![key] = DEFAULT_CONFIG[key];
      }
    });
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
