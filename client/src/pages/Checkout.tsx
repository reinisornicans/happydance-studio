import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { ArrowLeft, Loader2, CreditCard } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/shop/checkout", {
        items: items.map(item => ({ id: item.id, quantity: item.quantity })),
        customerEmail: email
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.freeItems) {
        clearCart();
        toast({ title: "Your free items have been added!" });
        window.location.href = "/shop/success?free=true";
      } else if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    },
    onError: (error: any) => {
      toast({ 
        title: "Checkout failed", 
        description: error.message || "Please try again",
        variant: "destructive" 
      });
    }
  });

  const handleCheckout = () => {
    if (!email) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }
    checkoutMutation.mutate();
  };

  if (items.length === 0) {
    return (
      <div className="w-full bg-background min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-2xl text-center">
          <h1 className="font-serif text-3xl md:text-4xl mb-6">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some products to your cart before checking out.
          </p>
          <Button asChild>
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl">
        <Link href="/shop" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>
        
        <h1 className="font-serif text-3xl md:text-4xl mb-10">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="jane@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-testid="input-email" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Your digital products will be sent to this email
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-6">
                  Secure payment is processed through Stripe. You will be redirected to complete your purchase.
                </p>
                <div className="flex items-center gap-3 p-4 rounded-md bg-muted/50">
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-background rounded">Visa</span>
                    <span className="px-2 py-1 bg-background rounded">Mastercard</span>
                    <span className="px-2 py-1 bg-background rounded">Apple Pay</span>
                    <span className="px-2 py-1 bg-background rounded">Google Pay</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3" data-testid={`checkout-item-${item.id}`}>
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} x {item.price === 0 ? "Free" : `€${item.price.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span className="font-serif" data-testid="text-checkout-total">€{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={checkoutMutation.isPending || !email}
                  data-testid="button-complete-purchase"
                >
                  {checkoutMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Purchase"
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout powered by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
