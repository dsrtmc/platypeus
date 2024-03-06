import React, { useEffect, useState } from "react";
import { availableFonts } from "@/shared/constants/fonts";
import { FontSelectionItem } from "@/app/settings/FontSelectionItem";
import styles from "./Settings.module.css";
import { DEFAULT_CONFIG, getConfig, setConfig } from "@/utils/configUtils";

interface Props {}

export const FontSelection: React.FC<Props> = ({}) => {
  const [fontFamily, setFontFamily] = useState("monospace");

  function handleFontChange(font: string) {
    return () => {
      let config = getConfig();
      if (!config) {
        console.error("`config` has not been found in the local storage.");
        return;
      }
      config.fontFamily = font;
      setConfig(config);

      const root = document.documentElement;
      root.style.setProperty("--font-family", font);
      setFontFamily(font);
    };
  }

  function removeWhitespace(s: string): string {
    return s.replace(/[\s']/g, "");
  }

  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    setFontFamily(cs.fontFamily);
  }, []);

  return (
    <div className={styles.fontSelection}>
      {Object.entries(availableFonts).map(([name, font]) => {
        console.log("Font:", font.style.fontFamily);
        console.log("Font family:", fontFamily);
        return (
          <FontSelectionItem
            // The variables inside CSS remove single quotation marks from the font names, whereas our object keeps them.
            selected={removeWhitespace(font.style.fontFamily) === removeWhitespace(fontFamily)}
            handleFontChange={handleFontChange(font.style.fontFamily)}
          >
            {name}
          </FontSelectionItem>
        );
      })}
    </div>
  );
};
