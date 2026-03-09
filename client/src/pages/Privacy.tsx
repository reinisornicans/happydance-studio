import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8 -ml-4" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "lv" ? "Atpakaļ uz sākumu" : "Back to Home"}
          </Button>
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl font-medium mb-8" data-testid="text-privacy-title">
          {language === "lv" ? "Privātuma Politika" : "Privacy Policy"}
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
          {language === "lv" ? (
            <>
              <p className="text-sm text-muted-foreground/60">
                Pēdējoreiz atjaunināts: {new Date().toLocaleDateString("lv-LV")}
              </p>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">1. Ievads</h2>
                <p>
                  Happy Dance Studio ("mēs", "mūsu" vai "studija") ciena jūsu privātumu un ir apņēmies aizsargāt jūsu personas datus. Šī privātuma politika izskaidro, kā mēs apkopojam, izmantojam un aizsargājam jūsu informāciju, kad apmeklējat mūsu vietni vai izmantojat mūsu pakalpojumus.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">2. Kādus datus mēs apkopojam</h2>
                <p>Mēs varam apkopot šādu informāciju:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kontaktinformācija (vārds, e-pasta adrese, tālruņa numurs)</li>
                  <li>Informācija par nodarbību rezervācijām un apmeklējumiem</li>
                  <li>Maksājumu informācija (apstrādāta caur drošiem trešo pušu pakalpojumiem)</li>
                  <li>Saziņas vēsture ar mūsu studiju</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">3. Kā mēs izmantojam jūsu datus</h2>
                <p>Jūsu personas datus mēs izmantojam, lai:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nodrošinātu un pārvaldītu deju nodarbības</li>
                  <li>Sazinātos ar jums par rezervācijām un izmaiņām grafikā</li>
                  <li>Nosūtītu jums informāciju par jaunumiem un piedāvājumiem (ar jūsu piekrišanu)</li>
                  <li>Uzlabotu mūsu pakalpojumus un vietni</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">4. Datu glabāšana un drošība</h2>
                <p>
                  Mēs glabājam jūsu personas datus tikai tik ilgi, cik nepieciešams šajā politikā aprakstītajiem mērķiem. Mēs izmantojam atbilstošus tehniskus un organizatoriskus pasākumus, lai aizsargātu jūsu datus pret nesankcionētu piekļuvi, zudumu vai bojājumiem.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">5. Jūsu tiesības</h2>
                <p>Saskaņā ar GDPR jums ir tiesības:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Piekļūt saviem personas datiem</li>
                  <li>Labot neprecīzus datus</li>
                  <li>Pieprasīt datu dzēšanu</li>
                  <li>Iebilst pret datu apstrādi</li>
                  <li>Pieprasīt datu pārnesamību</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">6. Sīkdatnes</h2>
                <p>
                  Mūsu vietne var izmantot sīkdatnes, lai uzlabotu jūsu pārlūkošanas pieredzi. Sīkdatnes ir nelieli teksta faili, kas tiek saglabāti jūsu ierīcē. Jūs varat pārvaldīt sīkdatņu iestatījumus savā pārlūkprogrammā.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">7. Saziņa</h2>
                <p>
                  Ja jums ir jautājumi par šo privātuma politiku vai vēlaties izmantot savas tiesības, lūdzu, sazinieties ar mums:
                </p>
                <p className="mt-4">
                  <strong>E-pasts:</strong> liva@happydance.lv<br />
                  <strong>Tālrunis:</strong> +371 29388148
                </p>
              </section>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground/60">
                Last updated: {new Date().toLocaleDateString("en-US")}
              </p>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">1. Introduction</h2>
                <p>
                  Happy Dance Studio ("we", "our", or "studio") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">2. Information We Collect</h2>
                <p>We may collect the following information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Class booking and attendance information</li>
                  <li>Payment information (processed through secure third-party services)</li>
                  <li>Communication history with our studio</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">3. How We Use Your Information</h2>
                <p>We use your personal data to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and manage dance classes</li>
                  <li>Communicate with you about bookings and schedule changes</li>
                  <li>Send you updates and offers (with your consent)</li>
                  <li>Improve our services and website</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">4. Data Storage and Security</h2>
                <p>
                  We retain your personal data only for as long as necessary for the purposes described in this policy. We use appropriate technical and organizational measures to protect your data against unauthorized access, loss, or damage.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">5. Your Rights</h2>
                <p>Under GDPR, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request data deletion</li>
                  <li>Object to data processing</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">6. Cookies</h2>
                <p>
                  Our website may use cookies to enhance your browsing experience. Cookies are small text files stored on your device. You can manage cookie settings in your browser.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-4">7. Contact Us</h2>
                <p>
                  If you have questions about this privacy policy or wish to exercise your rights, please contact us:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> liva@happydance.lv<br />
                  <strong>Phone:</strong> +371 29388148
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
