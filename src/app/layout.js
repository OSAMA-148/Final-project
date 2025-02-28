
import "./globals.css";



export const metadata = {
    title: "DR-PLANT",
    description: "تطبيق كشف أمراض النباتات",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
