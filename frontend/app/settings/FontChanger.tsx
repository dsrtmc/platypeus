"use client";

import React, { useEffect, useState } from "react";

interface Props {}

export const FontChanger: React.FC<Props> = ({}) => {
  const [fontFamily, setFontFamily] = useState("monospace");

  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    setFontFamily(cs.fontFamily);
  }, []);

  function handleFontChange(font: string) {
    return () => {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const fontValue = cs.getPropertyValue(font);
      setFontFamily(fontValue);
      root.style.setProperty("font-family", fontValue);
    };
  }

  // TODO: this entire file doesn't work, just prepared for the future
  return (
    <div>
      <div>current font: {fontFamily}</div>
      <button onClick={handleFontChange("--font-inter")}>change font to inter</button>
      <button onClick={handleFontChange("--font-itim")}>change font to itim</button>on
      <button onClick={handleFontChange("--font-ibm-plex-mono")}>change font to ibm plex monoon</button>
      <button
        onClick={() => {
          const root = document.documentElement;
          const cs = getComputedStyle(root);
          // actually returns the correct value
          console.log(cs.fontFamily);
        }}
      >
        log root style font-family
      </button>
    </div>
  );
};
