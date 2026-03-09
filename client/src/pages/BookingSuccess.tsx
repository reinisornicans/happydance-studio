import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Calendar, Clock, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/context/LanguageContext";

export default function BookingSuccess() {
  const [location] = useLocation();
  const [confirmed, setConfirmed] = useState(false);
  const { t, language } = useLanguage();
  
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get("session_id");

  const confirmMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/booking/confirm", { sessionId });
      return res.json();
    },
    onSuccess: () => {
      setConfirmed(true);
    }
  });

  const { data, isLoading } = useQuery<{ booking: any; slot: any }>({
    queryKey: ["/api/booking", sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/booking/${sessionId}`);
      return res.json();
    },
    enabled: !!sessionId
  });

  useEffect(() => {
    if (sessionId && !confirmed) {
      confirmMutation.mutate();
    }
  }, [sessionId]);

  const invalidText = language === "lv" ? "Nederīga Sesija" : "Invalid Session";
  const returnCouplesText = language === "lv" ? "Atgriezties Pāru Lapā" : "Return to Couples Page";
  const confirmedTitle = language === "lv" ? "Rezervācija Apstiprināta!" : "Booking Confirmed!";
  const confirmedText = language === "lv" 
    ? "Paldies par dejas sesijas rezervāciju. Apstiprinājuma e-pasts nosūtīts uz jūsu pastkasti."
    : "Thank you for booking your dance session. We've sent a confirmation email to your inbox.";
  const detailsTitle = language === "lv" ? "Sesijas Detaļas" : "Session Details";
  const minutesText = language === "lv" ? "minūtes" : "minutes";
  const returnHomeText = language === "lv" ? "Atgriezties Sākumā" : "Return Home";

  if (!sessionId) {
    return (
      <div className="w-full bg-background min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl mb-4">{invalidText}</h1>
          <Button asChild>
            <Link href="/couples">{returnCouplesText}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || confirmMutation.isPending) {
    return (
      <div className="w-full bg-background min-h-screen pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const booking = data?.booking;
  const slot = data?.slot;

  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-2xl">
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl mb-4">{confirmedTitle}</h1>
            <p className="text-muted-foreground mb-8">
              {confirmedText}
            </p>

            {slot && (
              <div className="bg-muted/50 rounded-md p-6 mb-8 text-left">
                <h3 className="font-serif text-xl mb-4">{detailsTitle}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span>
                      {new Date(slot.startAt).toLocaleDateString(language === "lv" ? "lv-LV" : "en-US", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>
                      {new Date(slot.startAt).toLocaleTimeString(language === "lv" ? "lv-LV" : "en-US", {
                        hour: '2-digit',
                        minute: '2-digit'
                      })} ({slot.durationMinutes} {minutesText})
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button asChild size="lg">
              <Link href="/">{returnHomeText}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
