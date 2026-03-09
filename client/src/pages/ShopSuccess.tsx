import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ShopSuccess() {
  const { language } = useLanguage();
  const searchParams = new URLSearchParams(window.location.search);
  const isFree = searchParams.get("free") === "true";

  const title = language === "lv"
    ? (isFree ? "Lejupielāde Gatava!" : "Paldies par Jūsu Pirkumu!")
    : (isFree ? "Download Ready!" : "Thank You for Your Purchase!");

  const subtitle = language === "lv"
    ? (isFree 
        ? "Jūsu bezmaksas resursi ir gatavi lejupielādei."
        : "Jūsu pasūtījums ir apstiprināts. Pārbaudiet e-pastu lejupielādes saitēm.")
    : (isFree 
        ? "Your free resources are ready to download."
        : "Your order has been confirmed. Check your email for download links.");

  const whatsNextTitle = language === "lv" ? "Kas Tālāk?" : "What's Next?";
  const checkEmailTitle = language === "lv" ? "Pārbaudiet E-pastu" : "Check Your Email";
  const checkEmailText = language === "lv" 
    ? "Mēs nosūtījām lejupielādes saites uz jūsu e-pasta adresi."
    : "We've sent your download links to your email address.";
  const downloadTitle = language === "lv" ? "Lejupielādējiet Failus" : "Download Your Files";
  const downloadText = language === "lv"
    ? "Noklikšķiniet uz saitēm e-pastā, lai lejupielādētu digitālos produktus."
    : "Click the links in your email to download your digital products.";
  const returnHomeText = language === "lv" ? "Atgriezties Sākumā" : "Return Home";
  const continueShoppingText = language === "lv" ? "Turpināt Iepirkties" : "Continue Shopping";

  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-2xl">
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground mb-8">
              {subtitle}
            </p>

            <div className="bg-muted/50 rounded-md p-6 mb-8 text-left">
              <h3 className="font-serif text-xl mb-4">{whatsNextTitle}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{checkEmailTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {checkEmailText}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{downloadTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {downloadText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/">{returnHomeText}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/shop">{continueShoppingText}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
