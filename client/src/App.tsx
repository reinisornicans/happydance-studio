import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartSidebar } from "@/components/CartSidebar";
import Home from "@/pages/Home";
import Teachers from "@/pages/Teachers";
import Women from "@/pages/Women";
import Couples from "@/pages/Couples";
import WeddingDance from "@/pages/WeddingDance";
import Shop from "@/pages/Shop";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Privacy from "@/pages/Privacy";
import Checkout from "@/pages/Checkout";
import Admin from "@/pages/Admin";
import BookingSuccess from "@/pages/BookingSuccess";
import ShopSuccess from "@/pages/ShopSuccess";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/teachers" component={Teachers} />
      <Route path="/women" component={Women} />
      <Route path="/couples" component={Couples} />
      <Route path="/wedding-dance" component={WeddingDance} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/shop" component={Shop} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/admin" component={Admin} />
      <Route path="/booking/success" component={BookingSuccess} />
      <Route path="/shop/success" component={ShopSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <ScrollToTop />
          <Layout>
            <Router />
          </Layout>
          <CartSidebar />
          <Toaster />
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
