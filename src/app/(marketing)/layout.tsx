import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

/**
 * Deliberately does not read the session cookie: the navbar resolves auth on the
 * client, so every marketing page can be statically rendered and cached.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
