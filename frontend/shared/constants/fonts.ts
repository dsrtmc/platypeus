import { IBM_Plex_Mono, Inter, Itim, JetBrains_Mono } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const itim = Itim({ weight: "400", subsets: ["latin"], variable: "--font-itim", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const availableFonts: { [name: string]: NextFont & { variable: string } } = {
  Inter: inter,
  Itim: itim,
  "JetBrains Mono": jetBrainsMono,
  "IBM Plex Mono": ibmPlexMono,
};
