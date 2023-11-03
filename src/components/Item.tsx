import Image from "next/image";
import { Images } from "./List";
import { MouseEventHandler, useState } from "react";

type ItemProps = {
  item?: Images;
  size: "small" | "medium" | "large";
  onClick?: (
    item: Images | undefined,
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => void;
  onInput?: (
    item: Images | undefined,
    event: React.FormEvent<HTMLInputElement>,
  ) => void;
};

export function Item({ item, size, onClick, onInput }: ItemProps) {
  const [image, setImage] = useState<Images | undefined>(item);
  const sizes = {
    small: {
      width: 200,
      height: 200,
    },
    medium: {
      width: 500,
      height: 500,
    },
    large: {
      width: 1000,
      height: 1000,
    },
  };

  const click: MouseEventHandler<HTMLImageElement> = (event) => {
    onClick?.(image, event);
  };

  return (
    <div>
      {image ? (
        <Image
          src={image.url}
          {...sizes[size]}
          alt={image.alt}
          onClick={click}
        />
      ) : (
        <input
          type="file"
          onInput={(event) => {
            const file = event.currentTarget.files?.[0];
            if (file) {
              const newItem = {
                url: URL.createObjectURL(file),
                alt: "",
              };
              setImage(newItem);
              onInput?.(newItem, event);
            }
          }}
        />
      )}
    </div>
  );
}
