import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const { items, total, clear } = useCart();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed!", { description: "Thank you for your purchase." });
    clear();
  };

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Checkout - Foodie | Food ordering app</title>
        <meta name="description" content="Secure checkout for your food order on Foodie." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Delivery details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={onSubmit}>
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required placeholder="(555) 123-4567" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required placeholder="123 Main St, Apt 4" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required placeholder="Your city" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP code</Label>
                  <Input id="zip" required placeholder="12345" />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" variant="hero" className="w-full">Place order</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.length === 0 ? (
                <p className="text-muted-foreground">No items in your order.</p>
              ) : (
                items.map((i) => (
                  <div key={i.id} className="flex items-center justify-between text-sm">
                    <span>{i.name} × {i.qty}</span>
                    <span className="font-medium">${(i.qty * i.price).toFixed(2)}</span>
                  </div>
                ))
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="text-xl font-semibold">${total.toFixed(2)}</span>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
