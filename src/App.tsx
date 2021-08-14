import { useAppState } from "./utils/useAppState";
import { Column } from "./component/Column";
import { AddNewItem } from "./component/AddNewItem";
import { addList } from "./state/action";
import { AppContainer } from "./styles";

export const App = () => {
  const { lists, dispatch } = useAppState();
  console.log(lists)
  return (
    <AppContainer>
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={text => dispatch(addList(text))} />
    </AppContainer>
  );
};
