import "./globals.css";

export const metadata = {
  title: "Content Manager",
  description: "Simple Content Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav
          style={{ padding: "20px", backgroundColor: "#333", color: "white" }}>
          <h1>📝 Content Manager</h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
