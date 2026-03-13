import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight, Heart, Users, Sparkles, MapPin, Mail, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InquiryForm } from "@/components/InquiryForm";
import { useLanguage } from "@/context/LanguageContext";

// Import local images
const livaPortraitImg = "/assets/images/liva-portrait.jpeg";
const studioDancersImg = "/assets/images/studio-dancers.jpeg";

// Optimized dance images in consistent artistic style
const homeHeroImg = "/assets/images/home-hero.jpg";
const womenClassImg = "/assets/images/women-class.jpg";
const womenHeroImg = "/assets/images/women-hero.jpg";
const couplesDanceImg = "/assets/images/couples-dance.jpg";
const teachersImg = "/assets/images/teachers-guide.jpg";
const danceMovementImg = "/assets/images/dance-movement-new.png";
const weddingDanceImg = "/assets/images/wedding-dance.jpg";
const outdoorDanceImg = "/assets/images/teachers/outdoor-dance.jpg";

// CSS class for black and white images
const bwImageClass = "absolute inset-0 w-full h-full object-cover grayscale";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const { t, language } = useLanguage();
  
  const heroTitle = language === "lv" 
    ? "Happy Dance Studio"
    : "Happy Dance Studio";
    
  const heroText = language === "lv" 
    ? "Kad kustība satiekas ar mūziku,\nkad ķermenis satiekas ar dvēseli,\nkad prāts satiekas ar sirdi.\nTas ir jāpiedzīvo.\n\nPievienojies mums, un atklāj sevī dzīvu dejotprieku!"
    : "When movement meets music,\nwhen the body meets the soul,\nwhen the mind meets the heart.\nIt's something you have to experience.\n\nJoin us — and discover a dance joy that feels alive within you.";

  const womenCard = {
    title: language === "lv" ? "Sievietēm" : "For Women",
    text: language === "lv"
      ? "Attīstām kustības kvalitāti, muzikalitāti un brīvu, dzīvu klātbūtni dejā."
      : "Technique, expression, identity. A space to dance your story into strength and light."
  };

  const couplesCard = {
    title: language === "lv" ? "Pāriem" : "For Couples",
    text: language === "lv"
      ? "Attīstām kustības kvalitāti, muzikalitāti un dzīvu saskaņu dejā vienam ar otru."
      : "Movement that strengthens connection, trust, and the way you meet each other."
  };

  const teachersCard = {
    title: language === "lv" ? "Skolotājiem" : "For Teachers",
    text: language === "lv"
      ? "Resursi deju skolotājiem jēgpilnam, apzinātam un iedvesmojošam darbam."
      : "Digital resources for thoughtful, inspiring, and creative teaching."
  };

  const weddingCard = {
    title: language === "lv" ? "Kāzu deja" : "Wedding Dance",
    text: language === "lv"
      ? "Pārliecināta deja. Dabiska saskaņa. Jūsu stāsts, jūsu ritms, jūsu brīdis."
      : "Confident movement. Natural harmony. Your story, your rhythm, your moment."
  };

  const aboutTitle = language === "lv" ? "Par Happy Dance Studio" : "About Happy Dance Studio";
  const aboutSubtitle = language === "lv" 
    ? "Deja, kas stiprina un iedvesmo."
    : "Dance that strengthens and inspires.";
  const aboutIntro1 = language === "lv" 
    ? "Mēs ticam, ka deja nav tikai mākslinieciska izpausme vai tehnikas apgūšana."
    : "We believe that dance is not just artistic expression or mastering technique.";
  const aboutIntro2 = language === "lv"
    ? "Tā var būt ceļš, kā kļūt patiesākam, dzīvākam, veselīgākam, brīvākam un laimīgam."
    : "It can be a path to becoming more authentic, more alive, healthier, freer, and happier.";
  const aboutListTitle = language === "lv" 
    ? "Happy Dance Studio nodarbībās mēs:"
    : "In Happy Dance Studio classes we:";
  const aboutListItems = language === "lv" ? [
    "mācām dejot ar pārliecību un izpratni,",
    "palīdzam sajust ķermeni un kustēties brīvi, graciozi un droši,",
    "radām vidi, kurā ir viegli mācīties, kļūdīties un augt,",
    "izmantojam rīkus, kas padziļina koncentrēšanos, uzlabo saskaņu un emocionālo labsajūtu."
  ] : [
    "teach dancing with confidence and understanding,",
    "help you feel your body and move freely, gracefully, and confidently,",
    "create an environment where it's easy to learn, make mistakes, and grow,",
    "use tools that deepen focus, improve harmony, and emotional well-being."
  ];
  const aboutCTA = language === "lv" 
    ? "Pievienojies mums un atklāj sevī dzīvu dejotprieku."
    : "Join us and discover a living dance joy within yourself.";
  const aboutContact = language === "lv"
    ? "Zvani 29388148 vai raksti liva@happydance.lv"
    : "Call 29388148 or write to liva@happydance.lv";

  // About Me - Līva
  const aboutMeTitle = language === "lv" ? "Par mani - Līva Ornicāne" : "About Me - Līva Ornicāne";
  const aboutMeIntro = language === "lv"
    ? "Esmu deju pedagoģe, horeogrāfe un grāmatas The Mindful Dance Teacher autore."
    : "I am a dance educator, choreographer, and author of the book The Mindful Dance Teacher.";
  const aboutMeText1 = language === "lv"
    ? "Mans profesionālais ceļš pēdējos 10+ gadus ir fokusējies uz abiem šiem virzieniem - deja kā radoša skatuves māksla un deja kā instruments cilvēka attīstībai un veselumam."
    : "My professional path over the past 10+ years has focused on both directions - dance as creative stage art and dance as a tool for human development and wholeness.";
  const aboutMeText2 = language === "lv"
    ? "Ilgu laiku mana sirds piederēja skatuvei. Veidoju deju un multimediju izrādes, specializējos Audiovizuālajā māksla, iegūstot maģistra grādu."
    : "For a long time, my heart belonged to the stage. I created dance and multimedia performances, specializing in Audiovisual Art and earning a master's degree.";
  const aboutMeText3 = language === "lv"
    ? "Taču paralēli tam arvien spēcīgāks kļuva otrs jautājums - kā deja ietekmē pašu cilvēku, un kā es kā deju skolotājs varu izmantot deju, lai palīdzētu cilvēkam kļūt veselākam, dzīvākam un priecīgākam?"
    : "But alongside that, another question grew stronger - how does dance affect the person themselves, and how can I as a dance teacher use dance to help people become healthier, more alive, and happier?";
  const aboutMeText4 = language === "lv"
    ? "Šī interese mani aizveda pie papildus studijām - dejas terapijas, dejas psiholoģijas, pāru un ģimenes psiholoģijas, kā arī teoloģijas un kalpošanas programmas, lai varētu strādāt ar cilvēkiem dziļāk, plašāk un atbildīgāk."
    : "This interest led me to additional studies - dance therapy, dance psychology, couples and family psychology, as well as theology and ministry programs, to be able to work with people more deeply, broadly, and responsibly.";
  const aboutMeText5 = language === "lv"
    ? "Arvien biežāk redzu, ka deja var palīdzēt atraisīt to, kas bija iestrēdzis, stiprināt to, kas bija sašūpojies, un palīdzēt cilvēkam atgūt savu iekšējo spēku un iemīlēt sevi."
    : "More and more often I see that dance can help release what was stuck, strengthen what was shaken, and help a person regain their inner strength and fall in love with themselves.";
  const aboutMeClosing = language === "lv"
    ? "Es ticu, ka katram ir savs ritms, savs spēks un savs stāsts. Un mans uzdevums ir palīdzēt to atklāt kustībā - tā, lai deja kļūst ne tikai skaista, bet arī jēgpilna un stiprinoša."
    : "I believe that everyone has their own rhythm, their own strength, and their own story. And my task is to help discover it through movement - so that dance becomes not only beautiful, but also meaningful and strengthening.";

  const philosophyTitle = language === "lv" ? "Mūsu Pieeja" : "Our Approach";
  const philosophyItems = language === "lv" ? [
    { icon: Sparkles, title: "Tehnika ar Dziļumu", text: "Katra nodarbība ietver fizisku treniņu, kas stiprina stāju un veido stabilas dejas prasmes." },
    { icon: Heart, title: "Izpausme un Stāsts", text: "Horeogrāfijas, kas ļauj izdejot emocijas, piedzīvojumus un pašas būtību." },
    { icon: Users, title: "Atbalstoša Vide", text: "Silta, neformāla un radoša telpa, kur katrs var augt savā tempā." }
  ] : [
    { icon: Sparkles, title: "Technique with Depth", text: "Every session includes physical training that strengthens posture and builds real dance skills." },
    { icon: Heart, title: "Expression and Story", text: "Choreography that allows you to express emotions, experiences, and your own essence." },
    { icon: Users, title: "Supportive Environment", text: "A warm, informal, and creative space where everyone can grow at their own pace." }
  ];

  const quoteText = language === "lv" 
    ? "\"Kungs, mans Dievs, Tu pārvērti manu raudāšanu dejā; Tu noņēmi manu sēru tērpu un apjozi mani ar prieku.\""
    : "\"Lord my God, you turned my wailing into dancing; you removed my sackcloth and clothed me with joy.\"";
  const quoteSource = language === "lv" ? "Psalms 30:11" : "Psalm 30:11";

  const ctaTitle = language === "lv" ? "Sāciet savu deju piedzīvojumu!" : "Begin your journey";
  const ctaText = language === "lv"
    ? "Izvēlies to, kas Tev šobrīd nepieciešams - telpu sev vai kustību kopā."
    : "If you feel drawn to dance, movement, and connection — you're warmly invited to get in touch.";
  const ctaButton = language === "lv" ? "Sazināties" : "Get in Touch";

  const locationTitle = language === "lv" ? "Atrašanās Vieta" : "Location";
  const locationText = language === "lv" ? "Ģertrūdes iela 8, Rīga" : "Ģertrūdes street 8, Riga";
  const languageNote = language === "lv" 
    ? "Nodarbības notiek latviešu valodā, ar angļu valodas atbalstu pēc nepieciešamības."
    : "Classes are held primarily in Latvian, with English used whenever helpful.";

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={homeHeroImg}
            alt="Dance studio with warm atmosphere" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/55" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 py-32 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <motion.h1 
              variants={fadeIn}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white/95 mb-6"
            >
              {heroTitle}
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-white/85 mb-16 max-w-2xl mx-auto leading-relaxed font-light whitespace-pre-line"
            >
              {heroText}
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/women">
                <span className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium tracking-wide text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 hover:bg-white/20 hover:text-white w-full sm:w-auto">
                  {t("nav.women")}
                  <ArrowRight className="w-4 h-4 ml-2 opacity-60" />
                </span>
              </Link>
              <Link href="/couples">
                <span className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium tracking-wide text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 hover:bg-white/20 hover:text-white w-full sm:w-auto">
                  {t("nav.couples")}
                  <ArrowRight className="w-4 h-4 ml-2 opacity-60" />
                </span>
              </Link>
              <Link href="/teachers">
                <span className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium tracking-wide text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 hover:bg-white/20 hover:text-white w-full sm:w-auto">
                  {t("nav.teachers")}
                  <ArrowRight className="w-4 h-4 ml-2 opacity-60" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. AUDIENCE PATHS */}
      <section className="py-28 md:py-36 lg:py-44 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Link href="/women" className="group cursor-pointer block">
              <div className="relative overflow-hidden rounded-md aspect-[4/5] bg-muted flex items-center justify-center">
                <img 
                  src={womenHeroImg}
                  alt="Women Dancing" 
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/75 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl mb-3">{womenCard.title}</h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {womenCard.text}
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/couples" className="group cursor-pointer block">
              <div className="relative overflow-hidden rounded-md aspect-[4/5] bg-muted flex items-center justify-center">
                <img 
                  src={couplesDanceImg}
                  alt="Couple Dancing" 
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/75 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl mb-3">{couplesCard.title}</h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {couplesCard.text}
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/wedding-dance" className="group cursor-pointer block">
              <div className="relative overflow-hidden rounded-md aspect-[4/5] bg-muted flex items-center justify-center">
                <img 
                  src={weddingDanceImg}
                  alt="Wedding Dance" 
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/75 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl mb-3">{weddingCard.title}</h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {weddingCard.text}
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/teachers" className="group cursor-pointer block">
              <div className="relative overflow-hidden rounded-md aspect-[4/5] bg-muted flex items-center justify-center">
                <img 
                  src={teachersImg}
                  alt="Dance Teacher" 
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/75 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl mb-3">{teachersCard.title}</h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {teachersCard.text}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE STUDIO */}
      <section className="py-28 md:py-36 lg:py-44 bg-sage-50/40" id="about">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
          {/* About Studio Content */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">{aboutTitle}</h2>
            <p className="text-primary font-medium text-lg mb-6">{aboutSubtitle}</p>
            <div className="space-y-4 text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9]">
              <p>{aboutIntro1}</p>
              <p>{aboutIntro2}</p>
            </div>
          </div>

          {/* Happy Dance Studio nodarbībās mēs - Horizontal Icons */}
          <div className="mb-20">
            <p className="font-medium text-foreground text-center text-lg mb-10">{aboutListTitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {aboutListItems.map((item, i) => {
                const icons = [Sparkles, Heart, Users, Check];
                const Icon = icons[i] || Check;
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary mb-4 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* About Me - Līva */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="flex flex-col justify-center lg:justify-start">
              <img 
                src={outdoorDanceImg}
                alt="Līva Ornicāne"
                className="w-full max-w-md h-auto rounded-md grayscale"
              />
              <p className="font-serif text-lg italic text-muted-foreground mt-6 max-w-md leading-relaxed">
                {language === "lv" 
                  ? "\"Es ticu, ka katram ir savs ritms, savs spēks un savs stāsts. Un mans uzdevums ir palīdzēt to atklāt kustībā - tā, lai deja kļūst ne tikai skaista, bet arī jēgpilna un stiprinoša.\""
                  : "\"I believe that everyone has their own rhythm, their own strength, and their own story. And my task is to help discover it through movement - so that dance becomes not only beautiful, but also meaningful and strengthening.\""}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium mb-6">{aboutMeTitle}</h3>
              <p className="text-primary font-medium mb-4">{aboutMeIntro}</p>
              <div className="space-y-4 text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9]">
                <p>{aboutMeText1}</p>
                <p>{aboutMeText2}</p>
                <p>{aboutMeText3}</p>
                <p>{aboutMeText4}</p>
                <p>{aboutMeText5}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUOTE SECTION */}
      <section className="relative py-24 md:py-32 lg:py-40 w-full overflow-hidden flex items-center justify-center">
        <img 
          src={danceMovementImg}
          alt="Dance movement" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center max-w-3xl px-8 md:px-16 py-12">
          <p className="font-serif text-xl md:text-2xl lg:text-3xl font-normal leading-snug md:leading-relaxed text-white/95 italic">
            {quoteText}
          </p>
          <p className="mt-8 text-base md:text-lg font-light text-white/70">— {quoteSource}</p>
        </div>
      </section>

      {/* 6. LOCATION & CONTACT */}
      <section className="py-28 md:py-36 lg:py-44 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium mb-6">{locationTitle}</h2>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-foreground text-lg">{locationText}</p>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                {languageNote}
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium mb-6">{t("home.contact.title")}</h2>
              <p className="text-foreground text-lg mb-4">{aboutCTA}</p>
              <p className="text-muted-foreground mb-6">{aboutContact}</p>
              <div className="flex items-start gap-3 mb-6">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-foreground">liva@happydance.lv</p>
              </div>
              <a href="https://wa.me/37129388148" target="_blank" rel="noopener noreferrer">
                <Button data-testid="button-contact-whatsapp">
                  {language === "lv" ? "Rakstīt WhatsApp" : "Message on WhatsApp"}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRIMARY CTA */}
      <section className="py-24 md:py-32 lg:py-40 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-texture-grain" />
        <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center relative z-10 max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6 leading-snug">
            {ctaTitle}
          </h2>
          <p className="text-lg md:text-xl opacity-85 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            {ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/women">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium px-8" data-testid="button-cta-women">
                {t("nav.women")}
              </Button>
            </Link>
            <Link href="/couples">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-medium px-8" data-testid="button-cta-couples">
                {t("nav.couples")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
