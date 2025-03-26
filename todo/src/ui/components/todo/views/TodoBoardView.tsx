import React from "react";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";
import { Board } from "../../molecules/Board";
import { TodoItem } from "../TodoItem";

interface TodoBoardViewProps {
  items: TodoViewModel[];
  config: any;
  getItemId: (item: TodoViewModel) => string;
  onItemUpdate?: (id: string, columnId: string) => void;
  renderItem: (item: TodoViewModel) => React.ReactNode;
}

const TodoBoardView: React.FC<TodoBoardViewProps> = ({
  items,
  config,
  getItemId,
  onItemUpdate,
  renderItem,
}) => {
  const boardColumns = [
    {
      id: "todo",
      title: "To Do",
      filter: (viewModel: TodoViewModel) => !viewModel.completed,
    },
    {
      id: "completed",
      title: "Done",
      filter: (viewModel: TodoViewModel) => viewModel.completed,
    },
  ];

  return (
    <Board
      items={items}
      columns={boardColumns}
      onItemUpdate={onItemUpdate}
      renderItem={renderItem}
      getItemId={getItemId}
    />
  );
};

export default TodoBoardView;
