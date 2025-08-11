import { Button } from "@/components/ui/button";

interface CategoryPillsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export const CategoryPills = ({ categories, active, onChange }: CategoryPillsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={"pill"}
          onClick={() => onChange(cat)}
          className={active === cat ? "ring-2 ring-ring" : ""}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};
