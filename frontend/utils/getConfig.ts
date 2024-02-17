import { ConfigType } from "@/shared/types/configTypes";

export function getConfig(): ConfigType | null {
  if (typeof window === "undefined") return null;
  let config: ConfigType = JSON.parse(localStorage.getItem("config"));
  if (!config) {
    console.error("`config` has not been found in the local storage.");
    return null;
  }
  return config;
}

// TODO: move it to another file
export function setConfig(config: ConfigType) {
  if (typeof window === "undefined") return;
  localStorage.setItem("config", JSON.stringify(config));
}
