import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "MovieVault | Discover the Cinema",
  description: "Explore thousands of movies, check ratings, and find your next favorite film on MovieVault.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.className} antialiased bg-[#0f0f0f]`}>
        {children}
      </body>
    </html>
  );
}

