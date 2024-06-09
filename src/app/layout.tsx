import Providers from "@/package/Providers/Providers";
import "./globals.css";
import Header from "@/components/Header/Header";
import FooterBlock from "@/package/FooterBlock/FooterBlock";

// export const metadata: Metadata = {
//   title: "OTT App",
//   description: "OTT application",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black`}>
        <Providers>
          <Header />
          {/* {children} */}
          <FooterBlock />
        </Providers>
      </body>
    </html>
  );
}
