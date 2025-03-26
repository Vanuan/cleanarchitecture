import React from "react";
import tw from "tailwind-styled-components";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";

interface TodoTableViewProps {
  items: TodoViewModel[];
  config: any;
  getItemId: (item: TodoViewModel) => string;
  renderItem: (item: TodoViewModel, viewType: string) => React.ReactNode;
}

const Table = tw.table`
  w-full table-auto
`;

const TableHead = tw.thead`
  bg-gray-100
`;

const TableRow = tw.tr`
  border-b border-gray-200
`;

const TableHeaderCell = tw.th`
  text-left py-2 px-4 font-semibold text-gray-700
`;

const TableBody = tw.tbody``;

const TableDataCell = tw.td`
  py-2 px-4
`;

const TodoTableView: React.FC<TodoTableViewProps> = ({
  items,
  config,
  getItemId,
  renderItem,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Tags</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={getItemId(item)}>
            <TableDataCell>{item.title}</TableDataCell>
            <TableDataCell>{item.displayStatus}</TableDataCell>
            <TableDataCell>{item.tags.join(", ")}</TableDataCell>
            <TableDataCell>{renderItem(item, "table")}</TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoTableView;
