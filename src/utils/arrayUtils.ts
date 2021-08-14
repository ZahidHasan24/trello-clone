type Item = {
  id: string;
};

export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string
) => {
  return items.findIndex((item: TItem) => item.id === id);
};

export const moveItem = <TItem>(arr: TItem[], from: number, to: number) => {
  const item = arr[from];
  return insertItemAtIndex(removeItemAtIndex(arr, from), item, to);
};

export const removeItemAtIndex = <TItem>(arr: TItem[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

export const insertItemAtIndex = <TItem>(
  arr: TItem[],
  item: TItem,
  index: number
) => {
  return [...arr.slice(0, index), item, ...arr.slice(index)];
};
