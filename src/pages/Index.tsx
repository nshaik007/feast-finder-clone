import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import { CategoryPills } from "@/components/food/CategoryPills";
import { FoodCard, type FoodItem } from "@/components/food/FoodCard";
import heroImg from "@/assets/hero-food.jpg";
import dishBurger from "@/assets/dish-burger.jpg";
import dishSushi from "@/assets/dish-sushi.jpg";
import dishTacos from "@/assets/dish-tacos.jpg";
import dishSalad from "@/assets/dish-salad.jpg";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const MENU: FoodItem[] = [
  { id: "burger", name: "Signature Burger", price: 9.99, image: dishBurger, category: "Burgers" },
  { id: "sushi", name: "Sushi Platter", price: 14.49, image: dishSushi, category: "Sushi" },
  { id: "tacos", name: "Street Tacos", price: 11.25, image: dishTacos, category: "Mexican" },
  { id: "salad", name: "Mediterranean Salad", price: 8.75, image: dishSalad, category: "Healthy" },
];

const Index = () => {
  const categories = useMemo(() => ["All", ...Array.from(new Set(MENU.map((m) => m.category)))], []);
  const [activeCat, setActiveCat] = useState<string>("All");
  const filtered = activeCat === "All" ? MENU : MENU.filter((m) => m.category === activeCat);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Foodie - Order delicious food online</title>
        <meta name="description" content="Foodie: the tastiest way to order food online. Browse dishes, add to cart, and checkout fast." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 surface-gradient" aria-hidden="true" />
          <img src={heroImg} alt="Assortment of delicious dishes on a table" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-2xl bg-background/70 backdrop-blur rounded-2xl p-6 md:p-8 shadow-elevated animate-reveal">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Crave it. Tap it. Get it.</h1>
              <p className="mt-3 text-lg text-muted-foreground">From juicy burgers to fresh sushi — order your favorites in minutes.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg"><Link to="#menu">Browse menu</Link></Button>
                <Button asChild variant="outline" size="lg"><Link to="/checkout">Go to checkout</Link></Button>
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="container mx-auto px-4 py-10 md:py-14">
          <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Popular near you</h2>
            <CategoryPills categories={categories} active={activeCat} onChange={setActiveCat} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <FoodCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
