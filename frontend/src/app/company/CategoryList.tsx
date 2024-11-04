import { getCategories, usePromise } from "@/app/api";

export function CategoryList({ chosenCategories, setChosenCategories }: { chosenCategories: any[], setChosenCategories: (categories: any[]) => void }) {
  const [categoriesDone, categories, categoriesError] = usePromise(getCategories);


  return categoriesDone && categories && categories.map((category) => <div
    key={category.id}
    className={"rounded-md p-2 m-1" + (chosenCategories.includes(category) ? " bg-gray-200 text-black" : " bg-gray-800 text-white")}
    onClick={() => {
      if (chosenCategories.includes(category)) {
        setChosenCategories(chosenCategories.filter((c) => c !== category));
      } else {
        setChosenCategories([...chosenCategories, category]);
      }
    }}
  >{category.name}</div>)
}