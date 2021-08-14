import { nanoid } from "nanoid";
import { findItemIndexById } from "../utils/arrayUtils";
import { Action } from "./action";

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
    default: {
      break;
    }
  }
};
