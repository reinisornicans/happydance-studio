import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu, X, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InquiryForm } from "./InquiryForm";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t, language } = useLanguage();

  // Pages without dark hero backgrounds need scrolled header style
  const needsScrolledHeader = location.startsWith("/blog/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 || needsScrolledHeader);
      setShowScrollTop(window.scrollY > window.innerHeight * 2);
    };
    // Set initial state
    setIsScrolled(window.scrollY > 50 || needsScrolledHeader);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [needsScrolledHeader]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/women", label: t("nav.women") },
    { href: "/couples", label: t("nav.couples") },
    { href: "/wedding-dance", label: t("nav.wedding") },
    { href: "/teachers", label: t("nav.teachers") },
    { href: "/blog", label: t("nav.blog") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-6 md:px-12 lg:px-16",
          isScrolled 
            ? "py-4 bg-background/95 backdrop-blur-md border-b border-border/30" 
            : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="z-50 group">
            <span className={cn(
              "font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              Happy Dance<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-all duration-200 relative",
                  isScrolled 
                    ? location === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    : location === link.href ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            <a href="#contact">
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "transition-all duration-300",
                  isScrolled 
                    ? "border-border text-foreground hover:bg-muted" 
                    : "border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                )}
              >
                {t("nav.contact")}
              </Button>
            </a>
            
            <div className={cn(
              "transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              <LanguageToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden z-50">
            <button
              className={cn(
                "p-2 transition-colors",
                isMobileMenuOpen ? "text-foreground" : isScrolled ? "text-foreground" : "text-white"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Nav Overlay */}
          <div
            className={cn(
              "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-6 transition-all duration-500 md:hidden",
              isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-2xl font-serif font-medium transition-all duration-300",
                  location === link.href ? "text-primary" : "text-foreground hover:text-primary"
                )}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : '0ms',
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isMobileMenuOpen ? 1 : 0
                }}
              >
                {link.label}
              </Link>
            ))}
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 400);
              }}
              style={{ 
                transitionDelay: isMobileMenuOpen ? '200ms' : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0
              }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="mt-6 px-8"
              >
                {t("nav.contact")}
              </Button>
            </a>
            <div 
              className="mt-4"
              style={{ 
                transitionDelay: isMobileMenuOpen ? '250ms' : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0
              }}
            >
              <LanguageToggle variant="mobile" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-sage-50/50 pt-20 pb-10 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">
            <div className="col-span-1 md:col-span-2">
              <span className="font-serif text-xl font-semibold tracking-tight mb-5 block">
                Happy Dance<span className="text-primary">.</span>
              </span>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                {language === "lv" 
                  ? "Deja, kas stiprina un iedvesmo."
                  : "Where dance becomes expression - and something in you begins to move."}
              </p>
            </div>
            
            <div>
              <h4 className="font-serif font-medium text-base mb-5">
                {language === "lv" ? "Nodarbības" : "Classes"}
              </h4>
              <ul className="space-y-3">
                <li><Link href="/women" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav.women")}</Link></li>
                <li><Link href="/couples" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav.couples")}</Link></li>
                <li><Link href="/wedding-dance" className="text-sm text-muted-foreground hover:text-primary transition-colors">{language === "lv" ? "Kāzu deja" : "Wedding Dance"}</Link></li>
                <li><Link href="/teachers" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav.teachers")}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-medium text-base mb-5">
                {language === "lv" ? "Studija" : "Studio"}
              </h4>
              <ul className="space-y-3">
                <li><Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {language === "lv" ? "Par Mums" : "About"}
                </Link></li>
                <li>
                  <a 
                    href="https://blog.mindfuldanceclass.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {language === "lv" ? "Blogs" : "Blog"}
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {language === "lv" ? "Kontakti" : "Contact"}
                  </a>
                </li>
              </ul>
            </div>

            <div id="contact">
              <h4 className="font-serif font-medium text-base mb-5">
                {language === "lv" ? "Sazinies" : "Get in Touch"}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {language === "lv" 
                  ? "Pievienojies mums un atklāj sevī dzīvu dejotprieku."
                  : "Join us and discover a living dance joy within yourself."}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "lv" 
                  ? "Zvani 29388148 vai raksti liva@happydance.lv"
                  : "Call 29388148 or write to liva@happydance.lv"}
              </p>
              <a 
                href="https://wa.me/37129388148" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                {language === "lv" ? "Rakstīt WhatsApp" : "Message on WhatsApp"}
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/30 text-xs text-muted-foreground/60 gap-4">
            <p>&copy; {new Date().getFullYear()} Happy Dance Studio. {language === "lv" ? "Visas tiesības aizsargātas." : "All rights reserved."}</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                {language === "lv" ? "Privātums" : "Privacy"}
              </Link>
              <a href="#" className="hover:text-foreground transition-colors">
                {language === "lv" ? "Noteikumi" : "Terms"}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 p-3 rounded-full bg-foreground/10 backdrop-blur-sm border border-border/30 text-foreground/60 hover:bg-foreground/20 hover:text-foreground transition-all duration-300",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll to top"
        data-testid="button-scroll-top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
