import { useDragLayer } from "react-dnd";
import { useAppState } from "../../utils/useAppState";
import { Column } from "../Column";
import { Card } from "../Card";
import { CustomDragLayerContainer, DragPreviewWrapper } from "../../styles";

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => {
    return {
      currentOffset: monitor.getSourceClientOffset(),
    };
  });

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column id={draggedItem.id} text={draggedItem.text} isPreview />
        ) : (
          <Card
            columnId={draggedItem.columnId}
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
