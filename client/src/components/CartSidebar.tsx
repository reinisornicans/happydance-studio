import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { t, language } = useLanguage();

  const cartTitle = language === "lv" ? `Jūsu Grozs (${totalItems})` : `Your Cart (${totalItems})`;
  const emptyText = language === "lv" ? "Jūsu grozs ir tukšs" : "Your cart is empty";
  const browseText = language === "lv" ? "Pārlūkot Produktus" : "Browse Products";
  const totalText = language === "lv" ? "Kopā" : "Total";
  const checkoutText = language === "lv" ? "Turpināt uz Kasi" : "Proceed to Checkout";
  const continueText = language === "lv" ? "Turpināt Iepirkties" : "Continue Shopping";
  const freeText = language === "lv" ? "Bezmaksas" : "Free";

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">{cartTitle}</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-6">{emptyText}</p>
            <Button variant="outline" onClick={() => setIsCartOpen(false)} asChild>
              <Link href="/shop">{browseText}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-4 rounded-md bg-muted/50"
                  data-testid={`cart-item-${item.id}`}
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={language === "lv" ? item.nameLv || item.name : item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                      {language === "lv" ? item.nameLv || item.name : item.name}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-2">
                      {item.price === 0 ? freeText : `€${item.price.toFixed(2)}`}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        data-testid={`button-decrease-${item.id}`}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm w-8 text-center" data-testid={`text-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        data-testid={`button-increase-${item.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-7 w-7 ml-auto text-muted-foreground"
                        onClick={() => removeFromCart(item.id)}
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">{totalText}</span>
                <span className="font-serif text-xl" data-testid="text-cart-total">
                  €{totalPrice.toFixed(2)}
                </span>
              </div>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={() => setIsCartOpen(false)}
                asChild
              >
                <Link href="/checkout" data-testid="button-checkout">
                  {checkoutText}
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setIsCartOpen(false)}
              >
                {continueText}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
