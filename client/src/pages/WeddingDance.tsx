import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Mail, ExternalLink, Heart, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { InquiryForm } from "@/components/InquiryForm";

// Optimized dance images in consistent artistic style
const weddingHeroImg = "/assets/images/wedding-dance.jpg";
const couplesDancingImg = "/assets/images/couples-dance.jpg";

export default function WeddingDance() {
  const { t, language } = useLanguage();

  const createItems = [
    t("couples.wedding.create.item1"),
    t("couples.wedding.create.item2"),
    t("couples.wedding.create.item3"),
    t("couples.wedding.create.item4"),
    t("couples.wedding.create.item5"),
  ];


  return (
    <main className="min-h-screen bg-background">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={weddingHeroImg}
            alt="Wedding dance"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tight">
            {language === "lv" ? "Kad divi kļūst par vienu." : "When Two Begin as One."}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            {t("couples.wedding.subtitle")}
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              {t("couples.wedding.text1")}
            </p>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-medium">
              {t("couples.wedding.text2")}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t("couples.wedding.text3")}
            </p>
            <p className="text-foreground/70 italic">
              {t("couples.wedding.text4")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title={t("couples.wedding.create.title")}
          />
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mt-8"
          >
            {createItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </span>
                <span className="text-foreground/80">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title={t("couples.wedding.why.title")}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 mt-8"
          >
            <p className="text-foreground/80 leading-relaxed">
              {t("couples.wedding.why.text1")}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t("couples.wedding.why.text2")}
            </p>
            <p className="text-foreground/80 leading-relaxed italic">
              {t("couples.wedding.why.text3")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title={t("couples.wedding.how.title")}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <Card className="border-none bg-card/50">
              <CardContent className="p-8 space-y-4">
                <p className="text-foreground/90 leading-relaxed">
                  {t("couples.wedding.how.text1")}
                </p>
                <div className="flex items-center gap-2 text-foreground/70">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{t("couples.wedding.how.location")}</span>
                </div>
                <p className="text-lg font-medium text-primary">
                  {t("couples.wedding.how.price")}
                </p>
                <div className="border-t border-border/50 pt-4 space-y-2">
                  <p className="text-sm text-foreground/70 font-medium">{t("couples.wedding.how.packages")}</p>
                  <p className="text-sm">{t("couples.wedding.how.package4")}</p>
                  <p className="text-sm">{t("couples.wedding.how.package8")}</p>
                  <p className="text-xs text-foreground/60">{t("couples.wedding.how.packageNote")}</p>
                </div>
                <p className="text-foreground/70">
                  {t("couples.wedding.how.sessions")}
                </p>
                <p className="text-foreground/70 italic">
                  {t("couples.wedding.how.continue")}
                </p>
                <p className="text-foreground/60 text-sm">
                  {t("couples.wedding.how.language")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-16 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              {t("couples.wedding.start.title")}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2" data-testid="button-book-wedding">
                    <Heart className="w-4 h-4" />
                    {t("couples.wedding.start.cta")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <InquiryForm defaultSubject="Kāzu deja" />
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                asChild
                data-testid="link-email-wedding"
              >
                <a href="mailto:info@happydance.lv">
                  <Mail className="w-4 h-4" />
                  {t("couples.wedding.start.email")}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">
              {t("couples.wedding.article.title")}
            </h3>
            <p className="text-foreground/70 mb-4">
              {t("couples.wedding.article.subtitle")}
            </p>
            <p className="text-foreground/80 mb-6">
              {t("couples.wedding.article.text")}
            </p>
            <Button variant="outline" className="gap-2" asChild data-testid="link-article">
              <a
                href="https://payhip.com/LivaOrnicane/blog/news"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                {t("couples.wedding.article.link")}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title={t("couples.wedding.video.title")}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <div className="max-w-3xl mx-auto">
              <div className="aspect-video rounded-md overflow-hidden bg-muted">
                <iframe 
                  src="https://www.youtube.com/embed/Ie2vscccKxo"
                  title="Wedding Dance Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={couplesDancingImg}
            alt="Couples dancing"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-8 h-8 text-primary mx-auto mb-6" />
            <p className="font-serif text-2xl md:text-3xl text-foreground/90 leading-relaxed">
              {t("couples.wedding.tagline")}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
