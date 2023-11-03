"use client";

export type Images = {
  url: string;
  alt: string;
};
type ListProps = {
  count: number;
  column: "2" | "3" | "6" | "9" | "12";
  list?: Images[];
  renderItem(param: {
    item: Images | undefined;
    index: number;
  }): React.ReactNode;
};
export function List({ list = [], count, column, renderItem }: ListProps) {
  const containerClassName = {
    "2": "grid-cols-2",
    "3": "grid-cols-3",
    "6": "grid-cols-6",
    "9": "grid-cols-9",
    "12": "grid-cols-12",
  };
  return (
    <div className={"grid " + containerClassName[column]}>
      {Array(count)
        .fill(undefined)
        .map((_, index) => {
          return renderItem({ item: list[index], index });
        })}
    </div>
  );
}
