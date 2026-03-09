import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

// Optimized dance image in consistent artistic style
const shopHeroImg = "/assets/images/teachers/teacher-observing.jpg";

export default function Shop() {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();

  return (
    <div className="w-full bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <img 
          src={shopHeroImg}
          alt="Teaching resources" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-5">
            {language === "lv" ? "Veikals" : "Shop"}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-light">
            {language === "lv" 
              ? "Resursi, kas atbalsta jūsu mācīšanas ceļojumu" 
              : "Resources to support your teaching journey"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl py-20 md:py-28">
        <SectionHeading 
          title={language === "lv" ? "Mācību Resursi" : "Teaching Resources"}
          subtitle={language === "lv" 
            ? "Pārdomāti izstrādāti rīki, kas veicina apzinātu, pārveidojošu mācīšanu."
            : "Thoughtfully designed tools to nurture mindful, transformative teaching."}
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
          {products.map((product) => {
            const isBundle = product.id === "companion-pack";
            
            return (
              <div key={product.id} className="group" data-testid={`card-product-${product.id}`}>
                {/* Product Image */}
                <div className="relative mb-8 flex justify-center" style={{ perspective: '1000px' }}>
                  {isBundle ? (
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full max-w-[320px] h-auto rounded-md shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    <div 
                      className="relative transition-transform duration-500"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: 'rotateY(-8deg) rotateX(2deg)'
                      }}
                    >
                      <div 
                        className="absolute left-0 top-2 bottom-2 w-3 bg-gradient-to-r from-black/30 to-transparent"
                        style={{ transform: 'translateX(-100%)' }}
                      />
                      
                      <div className="relative rounded-sm overflow-hidden shadow-2xl">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full max-w-[280px] h-auto aspect-[3/4] object-cover"
                        />
                        
                        <div 
                          className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-white/20 to-transparent"
                        />
                        
                        <div 
                          className="absolute left-0 right-0 bottom-0 h-2 bg-gradient-to-t from-black/10 to-transparent"
                        />
                        
                        <div 
                          className="absolute top-1 bottom-1 right-0 w-1"
                          style={{
                            background: 'repeating-linear-gradient(to bottom, #f5f5f5 0px, #e0e0e0 1px, #f5f5f5 2px)',
                            transform: 'translateX(100%)'
                          }}
                        />
                      </div>
                      
                      <div 
                        className="absolute -bottom-4 left-4 right-4 h-8 bg-black/20 blur-xl rounded-full"
                        style={{ transform: 'translateZ(-20px)' }}
                      />
                    </div>
                  )}
                  
                  {product.price === 0 && (
                    <Badge className="absolute top-4 right-4 z-10" variant="secondary">
                      {language === "lv" ? "Bezmaksas" : "Free"}
                    </Badge>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="text-center px-4">
                  <h3 className="font-serif text-xl md:text-2xl mb-3 leading-snug" data-testid={`text-product-name-${product.id}`}>
                    {language === "lv" ? product.nameLv || product.name : product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5 max-w-sm mx-auto">
                    {language === "lv" ? product.descriptionLv || product.description : product.description}
                  </p>
                  <div className="flex items-center justify-center gap-6">
                    <span className="font-serif text-2xl text-foreground" data-testid={`text-price-${product.id}`}>
                      {product.price === 0 
                        ? (language === "lv" ? "Bezmaksas" : "Free") 
                        : `€${product.price.toFixed(2)}`}
                    </span>
                    <Button 
                      onClick={() => addToCart(product)}
                      data-testid={`button-add-to-cart-${product.id}`}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {product.price === 0 
                        ? (language === "lv" ? "Iegūt bezmaksas" : "Get Free") 
                        : (language === "lv" ? "Pievienot grozam" : "Add to Cart")}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
