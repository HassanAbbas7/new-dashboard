import "./globals.css";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
    </html>
  );
}
