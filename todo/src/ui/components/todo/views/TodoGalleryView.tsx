import React from "react";
import tw from "tailwind-styled-components";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";

interface TodoGalleryViewProps {
  items: TodoViewModel[];
  config: any;
  getItemId: (item: TodoViewModel) => string;
}

const GalleryContainer = tw.div`
  grid grid-cols-3 gap-6
`;

const GalleryItem = tw.div`
  p-4 bg-white rounded-lg shadow-sm
`;

const TodoGalleryView: React.FC<TodoGalleryViewProps> = ({
  items,
  config,
  getItemId,
}) => {
  return (
    <GalleryContainer>
      {items.map((item) => (
        <GalleryItem key={getItemId(item)}>
          <h3>{item.title}</h3>
          <p>{item.displayStatus}</p>
          {/* Add image or other content here */}
        </GalleryItem>
      ))}
    </GalleryContainer>
  );
};

export default TodoGalleryView;
