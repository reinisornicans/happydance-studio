import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Check, MapPin, Globe, ExternalLink } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { InquiryForm } from "@/components/InquiryForm";
import type { TimeSlot } from "@shared/schema";

// Optimized dance image in consistent artistic style
const couplesHeroImg = "/assets/images/couples-dance.jpg";

export default function Couples() {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const twoMonthsLater = new Date();
  twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

  const { data: slots = [], isLoading } = useQuery<TimeSlot[]>({
    queryKey: ["/api/booking/availability"],
    queryFn: async () => {
      const res = await fetch(`/api/booking/availability?from=${today.toISOString()}&to=${twoMonthsLater.toISOString()}`);
      return res.json();
    },
    staleTime: 30000,
    refetchInterval: false
  });

  const checkoutMutation = useMutation({
    mutationFn: async (data: { slotId: number; customerName: string; customerEmail: string }) => {
      const res = await apiRequest("POST", "/api/booking/checkout", data);
      return res.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error: any) => {
      toast({ 
        title: t("couples.booking.failed"), 
        description: error.message || t("couples.booking.tryAgain"),
        variant: "destructive" 
      });
    }
  });

  const datesWithSlots = new Set(
    slots.map(s => new Date(s.startAt).toDateString())
  );

  const slotsForSelectedDate = selectedDate
    ? slots.filter(s => new Date(s.startAt).toDateString() === selectedDate.toDateString())
    : [];

  const handleBookSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setBookingOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot || !customerInfo.name || !customerInfo.email) return;
    
    checkoutMutation.mutate({
      slotId: selectedSlot.id,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString(language === "lv" ? "lv-LV" : "en-US", {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const learnItems = [
    t("couples.learn.item1"),
    t("couples.learn.item2"),
    t("couples.learn.item3"),
    t("couples.learn.item4"),
    t("couples.learn.item5"),
    t("couples.learn.item6"),
  ];

  return (
    <div className="w-full bg-background">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <img 
          src={couplesHeroImg}
          alt="Romantic couple dancing" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-3">{t("couples.hero.title")}</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-4 font-light">
            {t("couples.hero.subtitle")}
          </p>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto">
            {t("couples.hero.tagline")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-5xl py-20 md:py-28">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-20">
          <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-6">
            {t("couples.intro.text1")}
          </p>
          <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-6">
            {t("couples.intro.text2")}
          </p>
          <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-6">
            {t("couples.intro.text3")}
          </p>
          <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9]">
            {t("couples.intro.text4")}
          </p>
        </div>

        {/* What You'll Learn */}
        <div className="mb-20">
          <SectionHeading title={t("couples.learn.title")} centered />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {learnItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground/90 text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who This Is For */}
        <div className="bg-sage-50/40 rounded-md p-8 md:p-12 mb-20">
          <h2 className="font-serif text-2xl md:text-3xl font-medium mb-6 text-center">{t("couples.forWhom.title")}</h2>
          <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] text-center max-w-3xl mx-auto">
            {t("couples.forWhom.text")}
          </p>
        </div>

        {/* Dance Styles */}
        <div className="mb-20">
          <SectionHeading title={t("couples.styles.title")} centered />
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-foreground text-lg font-medium text-center">
              {t("couples.styles.intro")}
            </p>
            <div className="text-center space-y-1">
              <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] italic">
                {t("couples.styles.rumba")}
              </p>
              <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] italic">
                {t("couples.styles.waltz")}
              </p>
              <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] italic">
                {t("couples.styles.lindy")}
              </p>
            </div>
            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] text-center pt-4">
              {t("couples.styles.text1")}
            </p>
            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] text-center">
              {t("couples.styles.text2")}
            </p>
          </div>
        </div>

        {/* Booking Section */}
        <div id="booking" className="mb-20">
          <SectionHeading 
            title={t("couples.booking.title")} 
            subtitle={t("couples.booking.subtitle")}
            centered 
          />
          
          <div className="max-w-2xl mx-auto">
            {/* Pricing Info */}
            <div className="bg-muted/30 rounded-md p-6 mb-8">
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{t("couples.booking.location")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{t("couples.booking.language")}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">{t("couples.booking.arrange")}</p>
              
              <div className="border-t border-border/50 pt-4 space-y-2">
                <p className="font-serif text-lg">{t("couples.booking.privatePrice")}</p>
                <p className="text-sm text-muted-foreground font-medium mt-4">{t("couples.booking.packages")}</p>
                <p className="text-sm">{t("couples.booking.package4")}</p>
                <p className="text-sm">{t("couples.booking.package8")}</p>
                <p className="text-xs text-muted-foreground">{t("couples.booking.packageNote")}</p>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : slots.length === 0 ? (
              <div className="text-center py-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button data-testid="button-book-private-couples">
                      {t("couples.booking.cta")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <InquiryForm defaultSubject="Pāriem" />
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-8">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const dateStr = date.toDateString();
                    return date < today || !datesWithSlots.has(dateStr);
                  }}
                  modifiers={{
                    available: (date) => datesWithSlots.has(date.toDateString())
                  }}
                  modifiersClassNames={{
                    available: "bg-primary/10 font-medium"
                  }}
                  className="rounded-md border mx-auto"
                />

                {selectedDate && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg text-center">
                      {selectedDate.toLocaleDateString(language === "lv" ? "lv-LV" : "en-US", { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    {slotsForSelectedDate.length === 0 ? (
                      <p className="text-muted-foreground text-center text-sm">
                        {t("couples.booking.selectDate")}
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {slotsForSelectedDate.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => handleBookSlot(slot)}
                            className="p-4 rounded-md border bg-background hover:bg-muted/50 transition-colors text-center"
                            data-testid={`button-book-slot-${slot.id}`}
                          >
                            <p className="font-medium">{formatTime(slot.startAt)}</p>
                            <p className="text-sm text-muted-foreground">
                              {slot.durationMinutes} {t("couples.booking.min")}
                            </p>
                            <p className="font-serif text-lg mt-1">
                              €{(slot.priceEur / 100).toFixed(0)}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Blog Section */}
        <Card className="border-border/50 mb-20">
          <CardContent className="p-8 text-center">
            <h3 className="font-serif text-xl font-medium mb-2">{t("couples.blog.title")}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t("couples.blog.intro")}</p>
            <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-2xl mx-auto">
              {t("couples.blog.text")}
            </p>
            <Button variant="outline" asChild>
              <a 
                href="https://payhip.com/LivaOrnicane/blog/news" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                data-testid="link-blog-post"
              >
                {t("couples.blog.cta")}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Video Section */}
        <div className="mb-20">
          <SectionHeading title={t("couples.video.title")} centered />
          <div className="max-w-3xl mx-auto">
            <div className="aspect-video rounded-md overflow-hidden bg-muted">
              <iframe 
                src="https://www.youtube.com/embed/Ie2vscccKxo"
                title="Couples Dance Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{t("couples.booking.complete")}</DialogTitle>
          </DialogHeader>
          
          {selectedSlot && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-md p-4">
                <p className="font-medium">
                  {new Date(selectedSlot.startAt).toLocaleDateString(language === "lv" ? "lv-LV" : "en-US", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-muted-foreground">
                  {formatTime(selectedSlot.startAt)} - {selectedSlot.durationMinutes} {t("couples.booking.min")}
                </p>
                <p className="font-serif text-xl mt-2">
                  €{(selectedSlot.priceEur / 100).toFixed(2)}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("couples.booking.yourName")}</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="John & Jane Smith"
                    data-testid="input-customer-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("couples.booking.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="you@example.com"
                    data-testid="input-customer-email"
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleConfirmBooking}
                disabled={!customerInfo.name || !customerInfo.email || checkoutMutation.isPending}
                data-testid="button-proceed-to-payment"
              >
                {checkoutMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("couples.booking.processing")}
                  </>
                ) : (
                  t("couples.booking.proceed")
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {t("couples.booking.redirect")}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
