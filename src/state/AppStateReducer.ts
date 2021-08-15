import { nanoid } from "nanoid";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { Action } from "./action";
import { DragItem } from "../Drag/DragItem";

export type Task = {
  id: string;
  text: string;
};

export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

export const appStateReducer = (
  draftState: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case "ADD_LIST": {
      draftState.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;
    }
    case "ADD_TASK": {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draftState.lists, listId);

      draftState.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text,
      });
      break;
    }
    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draftState.lists, draggedId);
      const hoverIndex = findItemIndexById(draftState.lists, hoverId);
      draftState.lists = moveItem(draftState.lists, dragIndex, hoverIndex);
      break;
    }
    case "SET_DRAGGED_ITEM": {
      draftState.draggedItem = action.payload;
      break;
    }
    case "MOVE_TASK": {
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } =
        action.payload;
      const sourceListIndex = findItemIndexById(
        draftState.lists,
        sourceColumnId
      );
      const targetListIndex = findItemIndexById(
        draftState.lists,
        targetColumnId
      );
      const dragIndex = findItemIndexById(
        draftState.lists[sourceListIndex].tasks,
        draggedItemId
      );
      const hoverIndex = hoveredItemId
        ? findItemIndexById(
            draftState.lists[targetListIndex].tasks,
            hoveredItemId
          )
        : 0;
      const item = draftState.lists[sourceListIndex].tasks[dragIndex];

      // Remove the task from the source list
      draftState.lists[sourceListIndex].tasks.splice(dragIndex, 1);

      // Add the task to the target list
      draftState.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);
      break;
    }
    default: {
      break;
    }
  }
};
