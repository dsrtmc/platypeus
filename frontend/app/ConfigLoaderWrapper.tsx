"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { ConfigType } from "@/shared/types/configTypes";
import { THEMES } from "@/shared/constants/themes";

interface Props {}

const defaultConfig: ConfigType = {
  placeholder: "placeholder",
  themeConfig: THEMES.default,
};

// for fun, makes me lean towards going back to client side rendering
export const ConfigLoaderWrapper: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [visible, setVisible] = useState(false);
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
    setVisible(true);
  }, []);
  return visible && children;
};
