import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const FoodCard = ({ id, name, price, image, category }: FoodItem) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id, name, price, image });
    toast.success(`${name} added to cart`, { description: `Subtotal updated` });
  };

  return (
    <Card className="overflow-hidden group">
      <CardHeader className="p-0">
        <div className="relative h-44 w-full overflow-hidden">
          <img src={image} alt={`${name} - ${category}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{category}</p>
          </div>
          <p className="font-semibold">${price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="hero" onClick={handleAdd} className="w-full">Add to cart</Button>
      </CardFooter>
    </Card>
  );
};
