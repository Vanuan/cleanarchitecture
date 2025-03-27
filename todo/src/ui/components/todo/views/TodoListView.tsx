import React from "react";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";
import { List } from "../../molecules/List";

interface TodoListViewProps {
  items: TodoViewModel[];
  config: any;
  getItemId: (item: TodoViewModel) => string;
  renderItem: (item: TodoViewModel) => React.ReactNode;
}

const TodoListView: React.FC<TodoListViewProps> = ({
  items,
  config,
  getItemId,
  renderItem,
}) => {
  return <List items={items} renderItem={renderItem} />;
};

export default TodoListView;
