import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  children?: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { items, updateQty, removeItem, total, count } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children ?? (
          <Button variant="hero" size="sm" aria-label="Open cart">
            <ShoppingCart />
            Cart ({count})
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your order</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex-1 space-y-4 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center border-b pb-3">
                {item.image && (
                  <img src={item.image} alt={`${item.name} photo`} className="h-16 w-16 rounded-md object-cover" loading="lazy" />
                )}
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                    <Minus />
                  </Button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <Button variant="outline" size="icon" onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                    <Plus />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label="Remove from cart">
                  <Trash2 />
                </Button>
              </div>
            ))
          )}
        </div>
        <SheetFooter className="mt-4">
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <Button asChild variant="hero" disabled={count === 0}>
              <Link to="/checkout">Go to checkout</Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
