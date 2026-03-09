import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Hero image - teacher with students
const teachersHeroImg = "/assets/images/teachers-guide.jpg";
const bookCoverImg = "/assets/images/book-cover.jpg";
const livaPortraitImg = "/assets/images/liva-portrait.jpeg";
const freeGuideImg = "/assets/images/teachers/free-guide.jpg";
const studioBundleImg = "/assets/images/teachers/studio-bundle.jpg";
const outdoorDanceImg = "/assets/images/teachers/outdoor-dance.jpg";
const teacherContemplationImg = "/assets/images/teachers/teacher-contemplation.jpg";

export default function Teachers() {
  const { language } = useLanguage();

  const forTeacherItems = language === "lv" ? [
    "Izmantot deju kā ceļu uz veselumu un prieku",
    "Plānot nodarbības ar dziļāku un tālejošāku nodomu",
    "Veicināt veselīgu pārliecību savos audzēkņos ikdienas gaitās",
    "Izmantot psiholoģisko izpratni praktiskajā darbā",
    "Ieviest nodarbībās pētniecībā balstītus vingrinājumus"
  ] : [
    "Use movement as a path toward wholeness and joy",
    "Plan with calm intention, not pressure",
    "Encourage self-trust through everyday practice",
    "Weave emotional insight into technical work",
    "Bring research-based support into real studio life"
  ];

  const bookFeatures = language === "lv" ? [
    "Psiholoģijā balstītas nodaļas par fokusu, pārliecību, domāšanas veidu un motivāciju",
    "Skolotāju refleksijas un praktiskus piemērus",
    "Rīkus, kurus var izmantot jau nākamajā nodarbībā",
    "Cheat sheetus, plānotājus, darba lapas un praktiskus vingrinājumus",
    "Pieejama drukātā un PDF formātā"
  ] : [
    "Psychology-backed chapters on focus, confidence, mindset, and motivation",
    "Teacher reflections and real-world examples",
    "Practical tools you can apply in your next class immediately",
    "Includes planning templates, cheat sheets, and mindful activity ideas",
    "Available in print and PDF formats"
  ];

  const freeGuideFeatures = language === "lv" ? [
    "7 īsas nodarbību ievades, kas veido uzticību un uzmanību",
    "Psiholoģiski pamatotas, nodarbībās pārbaudītas",
    "Izdrukājamas, praktiskas un viegli lietojamas uzreiz",
    "Aizņem tikai 2–5 minūtes katrā nodarbībā"
  ] : [
    "7 short classroom openers that build trust and attention",
    "Psychology-informed, classroom-tested",
    "Printable, practical, and easy to use right away",
    "Takes just 2–5 minutes per class"
  ];

  const companionPackFeatures = language === "lv" ? [
    "nodarbību plānotāji",
    "refleksijas uzdevumi",
    "skolēnu novērošanas un progresa lapas",
    "interaktīvi plakāti, ko aizpildīt kopā ar skolēniem - pārliecībai, fokusam un grupas saliedētībai",
    "īsi, pētniecībā balstīti vingrinājumi dejotāju emocionālajai un mentālajai veselībai"
  ] : [
    "Teacher's Journal (PDF) – Plan and reflect with intention",
    "Interactive Poster Set (5 Designs) – Build a supportive classroom culture",
    "The Attuned Class – 7-Day Starters – Start each class with mindful focus and grounding"
  ];

  const heroTitle = language === "lv" 
    ? "Māci ar izpratni.\nVadi ar sirdi."
    : "Teach with Insight.\nLead with Care.";
  
  const heroSubtitle = language === "lv"
    ? "Psiholoģijā balstīti rīki deju pedagogiem, kuri vēlas skolot pārliecinātus, stiprus un iedvesmotus audzēkņus."
    : "Empowering dance educators with psychology-based tools to nurture confident, connected, and resilient students.";

  return (
    <div className="w-full bg-background">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <img 
          src={teachersHeroImg}
          alt="Dance teacher guiding students" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-5 whitespace-pre-line">{heroTitle}</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-light">
            {heroSubtitle}
          </p>
        </div>
      </div>

      {/* This is for the dance teacher who... */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
                {language === "lv" ? "Šis ir deju skolotājam, kurš..." : "This is for the dance teacher who..."}
              </h2>
              <p className="text-xl text-muted-foreground mb-4 italic">
                {language === "lv" ? "…… deju izjūt kā daudz dziļāku procesu nekā mākslinieciska un sportiska aktivitāte." : "…sees dance as more than motion and performance."}
              </p>
              <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-6">
                {language === "lv" 
                  ? "Tu saproti, ka katra nodarbība ir iespēja palīdzēt skolēnam augt - veicināt pārliecību, klātbūtni, interesi un emocionālo līdzsvaru."
                  : "You understand that each class is a chance to guide growth — to awaken confidence, restore presence, and stir something deeper in your students."}
              </p>
              <p className="font-medium text-foreground mb-4">
                {language === "lv" ? "Šie rīki ir skolotājam, kurš vēlas:" : "These tools are for the teacher who wants to:"}
              </p>
              <ul className="space-y-3 mb-6">
                {forTeacherItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground font-serif text-lg italic">
                {"\"Your teaching holds quiet power. Let's make it intentional.\""}
              </p>
            </div>
            <div>
              <img 
                src={outdoorDanceImg}
                alt="Dance teacher leading students outdoors"
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside The Book */}
      <section className="py-20 md:py-28 bg-sage-50/40">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={bookCoverImg}
                alt="The Mindful Dance Teacher book cover"
                className="w-full max-w-sm mx-auto h-auto rounded-md shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
                {language === "lv" ? "Grāmata \"The Mindful Dance Teacher\"" : "What's Inside The Book..."}
              </h2>
              <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-6">
                {language === "lv" 
                  ? "piedāvā psiholoģijā balstītus rīkus, kas palīdz nodarbībās dejotājos attīstīt veselīgu pašpārliecinātību, spēju noturēt fokusu, stiprināt motivāciju, emocionālu līdzsvaru un iekšējo spēku. Balstīta pētniecībā un reālā deju studijas pieredzē, tā palīdz pedagogiem attīstīt audzēkņu potenciālu ar skaidrību, rūpību un ilgtermiņa pieeju."
                  : "The Mindful Dance Teacher offers psychology-based tools to help you grow confident, focused, and emotionally resilient dancers. Grounded in research and real classroom practice, this guide supports educators in unlocking student potential with clarity, care, and lasting influence."}
              </p>
              <p className="font-medium text-foreground mb-4">
                {language === "lv" ? "Grāmatā atradīsi:" : "Core Features:"}
              </p>
              <ul className="space-y-3 mb-8">
                {bookFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <a href="https://www.amazon.com/Mindful-Dance-Teacher-Psychology-Based-Inspiring/dp/B0FB3YMP79" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    {language === "lv" ? "Apskatīt Grāmatu" : "See the Book"}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://payhip.com/LivaOrnicane" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    {language === "lv" ? "Izpētīt Citus Resursus" : "Explore Other Resources"}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Printable Companion Pack */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
                {language === "lv" ? "Mindful Dance Teacher: printējamie palīgmateriāli" : "Mindful Dance Teacher: Printable Companion Pack"}
              </h2>
              <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-6">
                {language === "lv" 
                  ? "Šeit atradīsi psiholoģijā balstītu materiālu klāstu, kas palīdz veidot skaidras, strukturētas un jēgpilnas deju nodarbības:"
                  : "This companion pack provides practical, ready-to-use resources to enhance your dance classes and turn theory into action."}
              </p>
              <p className="font-medium text-foreground mb-4">
                {language === "lv" ? "Starp tiem:" : "Included are:"}
              </p>
              <ul className="space-y-3 mb-6">
                {companionPackFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-base mb-6">
                {language === "lv" 
                  ? "Printējamie materiāli, kas praktiski palīdz veidot nodarbības apzinātāk, skaidrāk un efektīgāk."
                  : "Perfect for teachers who want to spark reflection, support goal-setting, and encourage emotional awareness in their students."}
              </p>
              <p className="text-foreground font-serif text-lg italic mb-6">
                "When we start with intention, we teach from a deeper place."
              </p>
              <Button asChild>
                <a href="https://payhip.com/b/6pXaE" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  {language === "lv" ? "Iegūt Resursus" : "Get the Resources"}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
            <div>
              <img 
                src={studioBundleImg}
                alt="Complete Studio Bundle resources"
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why I Created These Tools */}
      <section className="py-20 md:py-28 bg-sage-50/40">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={livaPortraitImg}
                alt="Līva Ornicāne"
                className="w-full max-w-md mx-auto h-auto rounded-md"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
                {language === "lv" ? "Kāpēc radīju šos rīkus" : "Why I Created These Tools"}
              </h2>
              <div className="space-y-4 text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9]">
                <p>
                  {language === "lv" 
                    ? "Gadu gaitā esmu redzējusi, kā deja veicina pārliecību, fokusu, harmoniju un iekšējo spēku - un cik daudz tiek zaudēts, ja mācīšanā pietrūkst rūpības un izpratnes."
                    : "Over the years, I've seen how dance quietly shapes confidence, focus, and inner strength — and how much is lost when teaching lacks care or awareness."}
                </p>
                <p className="font-medium text-foreground">
                  {language === "lv" 
                    ? "Kļuva skaidrs: deja ir daudz spēcīgāka, nekā to bieži var pamanīt."
                    : "That's when I realized: Dance is more powerful than we often recognize."}
                </p>
                <p>
                  {language === "lv" 
                    ? "Tā savieno ķermeni, prātu, emocijas un kaut ko dziļāku: identitāti un jēgu."
                    : "It connects body, mind, and something deeper — identity, meaning, and connection."}
                </p>
                <p>
                  {language === "lv" 
                    ? <>Šī grāmata un rīki veidojās no jautājuma, kas man ilgstoši nodarbināja: <strong className="text-foreground">Kas palīdz dejotājam kļūt veselākam, priecīgākam un "dzīvākam"?</strong> Un tikpat svarīgi: <strong className="text-foreground">Kas palīdz skolotājam šo procesu vadīt ar lielāku skaidrību un rūpību?</strong></>
                    : <>This book began with a question I couldn't ignore: <strong className="text-foreground">What helps a dancer become more whole, resilient, and alive?</strong> And just as importantly: <strong className="text-foreground">What helps me, as a teacher, guide that process with more intention and care?</strong></>}
                </p>
                <p>
                  {language === "lv" 
                    ? "The Mindful Dance Teacher ir mana, dejas psiholoģijā balstīta, atbilde - refleksiju un praktisku vingrinājumu kopums, kas veicina izaugsmi, klātbūtni un jēgpilnu darbu deju nodarbībās."
                    : "The Mindful Dance Teacher is my response — a toolkit of reflections and practices to support growth, awareness, and purpose in the classroom."}
                </p>
              </div>
              <p className="text-foreground font-serif text-lg italic mt-6 mb-8">
                "Insightful teaching turns motion into magic."
              </p>
              <Button asChild>
                <a href="https://payhip.com/LivaOrnicane" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  {language === "lv" ? "Izpētīt Resursus" : "Explore the Resources"}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      </div>
  );
}
