import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <div className="flex h-screen overflow-hidden flex-col bg-moz-white">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
}

