import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useAppState } from "./useAppState";
import { DragItem } from "../Drag/DragItem";
import { setDraggedItem } from "../state/action";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
