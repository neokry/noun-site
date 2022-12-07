import { useTheme } from "@/hooks/useTheme";
import NavigationItemComponent from "./NavigationItem";

export default function Footer() {
  const [theme] = useTheme();

  return (
    <div className="flex justify-around py-16">
      <div className="flex flex-wrap items-center">
        {theme.nav.secondary.map((item, i) => (
          <NavigationItemComponent
            key={i}
            item={item}
            className="mr-0 sm:mr-4 rounded-xl px-4 sm:px-6 text-sm sm:text-md h-10 flex items-center justify-around text-skin-muted hover:text-skin-base"
          />
        ))}
      </div>
    </div>
  );
}
