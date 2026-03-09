import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

interface LanguageToggleProps {
  variant?: "desktop" | "mobile";
}

export function LanguageToggle({ variant = "desktop" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "lv" ? "en" : "lv")}
      className="font-medium text-sm uppercase tracking-wide text-inherit"
      data-testid={`button-language-toggle-${variant}`}
    >
      {language === "lv" ? "EN" : "LV"}
    </Button>
  );
}
