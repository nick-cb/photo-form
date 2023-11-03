"use client";

import { useState } from "react";
import { Item } from "./Item";
import { Images, List } from "./List";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { UseFormReturn, FieldValues } from "react-hook-form";

type PhotoFormProps = {
  form: UseFormReturn<FieldValues, any, undefined>;
};
export function PhotoForm({ form }: PhotoFormProps) {
  const [selected, setSelected] = useState<Images | null>(null);
  const [list, setList] = useState<Images[]>([]);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    height: 100,
    width: 100,
  });

  return (
    <div className="flex w-full">
      <div className="w-1/3">
        <List
          count={10}
          column={"2"}
          list={list}
          renderItem={function ({ item, index }) {
            return (
              <Item
                key={item?.url || index}
                item={item}
                size="small"
                onInput={(newItem) => {
                  if (newItem) {
                    setList((prev) => {
                      return [...prev, newItem];
                    });
                    setSelected(newItem);
                    form.setValue("images", [...list, newItem]);
                  }
                }}
                onClick={(item) => {
                  if (item) {
                    setSelected(item);
                  }
                }}
              />
            );
          }}
        />
      </div>
      <div className="w-2/3">
        {selected ? (
          <ReactCrop crop={crop} onChange={setCrop} aspect={4 / 3} ruleOfThirds>
            <Image
              src={selected.url}
              width={500}
              height={400}
              alt={selected.alt}
            />
          </ReactCrop>
        ) : null}
      </div>
    </div>
  );
}
