"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@/constant";

const Categories = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleTags = (item: string) => {
    router.push(`${pathname}?category=${item}`);
  };

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => handleTags(filter.name)}
            className={`${
              category === filter.name
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
