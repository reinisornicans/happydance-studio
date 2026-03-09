import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InquiryForm } from "@/components/InquiryForm";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { Check, MapPin, Clock, Users } from "lucide-react";

// Women dance class image
const womenHeroImg = "/assets/images/women-hero.jpg";
const danceMovementImg = "/assets/images/dance-movement.jpg";

export default function Women() {
  const { t } = useLanguage();

  const experienceItems = [
    t("women.experience.item1"),
    t("women.experience.item2"),
    t("women.experience.item3"),
    t("women.experience.item4"),
    t("women.experience.item5"),
    t("women.experience.item6"),
  ];

  return (
    <div className="w-full bg-background">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <img 
          src={womenHeroImg}
          alt="Women's movement class" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-3">{t("women.hero.title")}</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-4 font-light">
            {t("women.hero.subtitle")}
          </p>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto italic">Kad deja kļūst par Tava ķermeņa dziesmu.</p>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-5xl py-20 md:py-28">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-20">
          <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-6">
            {t("women.intro.text1")}
          </p>
          <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-6">
            {t("women.intro.text2")}
          </p>
          <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-6">
            {t("women.intro.text3")}
          </p>
          <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9]">
            {t("women.intro.text4")}
          </p>
        </div>

        {/* What You'll Experience */}
        <div className="mb-20">
          <SectionHeading title={t("women.experience.title")} centered />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {experienceItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground/90 text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who This Is For */}
        <div className="bg-sage-50/40 rounded-md p-8 md:p-12 mb-20">
          <h2 className="font-serif text-2xl md:text-3xl font-medium mb-6 text-center">{t("women.forWhom.title")}</h2>
          <div className="space-y-5 max-w-3xl mx-auto">
            <p className="text-foreground text-lg md:text-xl font-medium leading-relaxed">
              {t("women.forWhom.intro")}
            </p>
            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9]">
              {t("women.forWhom.text1")}
            </p>
            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9]">
              {t("women.forWhom.text2")}
            </p>
            <p className="text-foreground text-lg font-medium mt-6">
              {t("women.forWhom.ageTitle")}
            </p>
            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9]">
              {t("women.forWhom.text3")}
            </p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <section className="relative py-24 md:py-32 lg:py-40 w-full overflow-hidden flex items-center justify-center">
        <img 
          src={danceMovementImg}
          alt="Dance movement" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center max-w-3xl px-8 md:px-16 py-12">
          <p className="font-serif text-xl md:text-2xl lg:text-3xl font-normal leading-snug md:leading-relaxed text-white/95 italic">
            {t("women.quote.text")}
          </p>
          <p className="mt-8 text-base md:text-lg font-light text-white/70">— {t("women.quote.source")}</p>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-5xl py-20 md:py-28">
        {/* Join the Class */}
        <div className="mb-20">
          <SectionHeading title={t("women.join.title")} centered />
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-foreground text-lg font-medium mb-4">
              {t("women.join.intro")}
            </p>
            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-8">
              {t("women.join.text")}
            </p>
            
            <div className="bg-muted/30 rounded-md p-6 mb-8 space-y-3 text-left">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-foreground">{t("women.join.location")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground">{t("women.join.duration")}</span>
              </div>
              <div className="pt-2 border-t border-border/50">
                <p className="font-serif text-lg">{t("women.join.price")}</p>
              </div>
              <p className="text-muted-foreground text-sm pt-2">{t("women.join.language")}</p>
            </div>

            <p className="text-muted-foreground text-sm mb-6">
              {t("women.join.limited")}
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="mb-2" data-testid="button-join-waitlist">
                  {t("women.join.cta")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <InquiryForm defaultSubject="Sievietēm" />
              </DialogContent>
            </Dialog>
            <p className="text-muted-foreground text-xs">{t("women.join.noPayment")}</p>
          </div>
        </div>

        {/* Video Gallery */}
        <div className="mb-20">
          <SectionHeading title={t("women.videos.title")} centered />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-video rounded-md overflow-hidden bg-muted">
              <iframe 
                src="https://www.youtube.com/embed/bBEuudUM2MY"
                title="Dance Me Alive Video 1"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video rounded-md overflow-hidden bg-muted">
              <iframe 
                src="https://www.youtube.com/embed/Ixba9S31r2U"
                title="Dance Me Alive Video 2"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video rounded-md overflow-hidden bg-muted">
              <iframe 
                src="https://www.youtube.com/embed/A6kHkH24J0Y"
                title="Dance Me Alive Video 3"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video rounded-md overflow-hidden bg-muted">
              <iframe 
                src="https://www.youtube.com/embed/Nakt9QtCL_k"
                title="Dance Me Alive Video 4"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-border/50 mb-20" />

        {/* Private Lessons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="font-serif text-xl font-medium mb-4">{t("women.private.title")}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {t("women.private.text")}
              </p>
              <div className="space-y-2 mb-6">
                <p className="font-serif text-lg">{t("women.private.price")}</p>
                <p className="text-muted-foreground text-sm">{t("women.private.format")}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" data-testid="button-book-private">
                    {t("women.private.cta")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <InquiryForm defaultSubject="Sievietēm" />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Dance with Friends */}
          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="font-serif text-xl font-medium mb-4">{t("women.friends.title")}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {t("women.friends.text")}
              </p>
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{t("women.friends.group")}</span>
                </div>
                <p className="font-serif text-lg">{t("women.friends.price")}</p>
                <p className="text-muted-foreground">{t("women.friends.format")}</p>
                <p className="text-muted-foreground">{t("women.friends.duration")}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" data-testid="button-request-group">
                    {t("women.friends.cta")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <InquiryForm defaultSubject="Sievietēm" />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
