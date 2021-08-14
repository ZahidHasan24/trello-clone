import { useDrag } from "react-dnd";
import { useAppState } from "./useAppState";
import { DragItem } from "../Drag/DragItem";
import { setDraggedItem } from "../state/action";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });
  return { drag };
};
