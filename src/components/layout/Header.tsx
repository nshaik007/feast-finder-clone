import { ShoppingBag, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Link, NavLink } from "react-router-dom";
import { LocationSheet } from "@/components/location/LocationSheet";
import { useLocation } from "@/context/LocationContext";

const Header = () => {
  const { address, coords } = useLocation();
  const locationLabel = address ?? (coords ? `${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}` : "Set location");

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary shadow-elevated animate-float">
            <ShoppingBag className="text-primary-foreground" />
          </span>
          <span className="text-lg font-semibold">Foodie</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <LocationSheet>
            <Button variant="outline" className="rounded-full">
              <MapPin className="mr-2" />
              {locationLabel}
            </Button>
          </LocationSheet>
          <Button variant="outline" className="rounded-full">
            <Search className="mr-2" />
            Search dishes
          </Button>
        </div>

        <nav className="flex items-center gap-3">
          <NavLink to="/" className={({isActive}) => isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"}>Menu</NavLink>
          <NavLink to="/checkout" className={({isActive}) => isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"}>Checkout</NavLink>
          <CartDrawer />
        </nav>
      </div>
    </header>
  );
};

export default Header;