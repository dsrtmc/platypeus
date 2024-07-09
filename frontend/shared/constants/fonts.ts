import { IBM_Plex_Mono, Inter, Itim, JetBrains_Mono, Space_Mono, Lexend_Deca, Montserrat } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const itim = Itim({ weight: "400", subsets: ["latin"], variable: "--font-itim", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--space-mono",
  display: "swap",
});
const lexendDeca = Lexend_Deca({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--lexend-deca",
  display: "swap",
});
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--lexend-deca",
  display: "swap",
})

export const availableFonts: { [name: string]: NextFont & { variable: string } } = {
  Inter: inter,
  Itim: itim,
  "JetBrains Mono": jetBrainsMono,
  "IBM Plex Mono": ibmPlexMono,
  "Space Mono": spaceMono,
  "Lexend Deca": lexendDeca,
  Montserrat: montserrat
};
