import React, { FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import SortableItem, { Item } from "./sortable-item";
import { Box } from "@mui/material";

export const Container: any = React.forwardRef((props, ref) => {
  const { children, row, style = {} } = props as any

  return (
    <Box
      ref={ref as any}
      sx={{
        ...style,
        border: theme => row ? '' :`1px dashed ${theme.palette.grey[600]}`,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        my: row ? 0 : 2,
        p: row ? 0 : 4,
        flexDirection: row ? "row" : "column",
        gap: 2
      }}
    >
      {children}
    </Box>
  );
});

interface IProps {
  getItems: (index: string) => any
  id: string
  row: boolean
  selectedField: string
  setSelectedField: (v: string) => void
  deleteClicked: (id: string) => void
}

const SortableContainer:FC<IProps> = (props) => {
  const {
    getItems,
    id,
    row,
    selectedField,
    setSelectedField,
    deleteClicked
  } = props;

  const items = getItems(id);
  const itemIds = items.map((item: any) => item.id);

  const { isOver, setNodeRef } = useDroppable({
    id
  });

  if (isOver) {
    console.log("is over", id);
  }

  return (
    <SortableItem
      id={id}
      row={row}
      column={!row}
      selectedField={selectedField}
      setSelectedField={setSelectedField}
      deleteClicked={deleteClicked}
    >
      <Container
        ref={setNodeRef}
        row={row}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        deleteClicked={deleteClicked}
      >
        <SortableContext
          items={itemIds}
          strategy={
            row ? horizontalListSortingStrategy : verticalListSortingStrategy
          }
        >
          {items.map((item: any) => {
            const child = <Item field={item} />;

            if (item.container) {
              return (
                <SortableContainer
                  key={item.id}
                  id={item.id}
                  getItems={getItems}
                  row={item.row}
                  selectedField={selectedField}
                  setSelectedField={setSelectedField}
                  deleteClicked={deleteClicked}
                />
              );
            }

            return (
              <SortableItem
                key={item.id}
                id={item.id}
                selectedField={selectedField}
                setSelectedField={setSelectedField}
                deleteClicked={deleteClicked}
              >
                {child}
              </SortableItem>
            );
          })}
        </SortableContext>
      </Container>
    </SortableItem>
  );
}

export default SortableContainer
