import tw from "tailwind-styled-components";

export const TodoListContainer = tw.div``;

export const TodoGridLayout = tw.div`
  grid grid-cols-1 md:grid-cols-2 gap-6
`;

export const TodoItemLayout = tw.div`
  flex items-start gap-3
`;

export const TodoContentArea = tw.div`
  flex-1 min-w-0
`;

export const TagsContainer = tw.div`
  flex items-center gap-2 flex-wrap mt-2
`;

export const EmptyStateContainer = tw.div`
  text-center py-12
`;

export const ControlBar = tw.div`
  flex items-center justify-between mb-6
`;

export const ViewModeToggleGroup = tw.div`
  flex items-center gap-2
`;

export const LoadingState = tw.div`
  flex items-center justify-center h-64
`;

export const Spinner = tw.div`
  animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500
`;

// Todo Item Components
export const TodoCard = tw.div<{ $completed: boolean }>`
  bg-white rounded-lg shadow-sm p-4 transition-all duration-200
  hover:shadow-md border border-gray-100
  ${({ $completed }) => $completed && "bg-gray-50"}
`;

export const TodoToggleButton = tw.button<{ $completed: boolean }>`
  mt-1 text-gray-400 hover:text-blue-500 transition-colors
  ${({ $completed }) => $completed && "text-green-500 hover:text-green-600"}
`;

export const TodoTitle = tw.h3<{ $completed: boolean }>`
  text-gray-900 font-medium
  ${({ $completed }) => $completed && "line-through text-gray-500"}
`;

export const TodoDescription = tw.p<{ $completed: boolean }>`
  text-gray-600 mt-1 text-sm
  ${({ $completed }) => $completed && "text-gray-400"}
`;

export const TodoStatusBadge = tw.span<{ $completed: boolean }>`
  text-xs px-2 py-1 rounded-full
  ${({ $completed }) => ($completed ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")}
`;

export const TodoTag = tw.span`
  text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700
`;

export const TodoDeleteButton = tw.button`
  text-gray-400 hover:text-red-500 transition-colors
`;
export const TodoEditButton = tw.button`
  text-gray-400 hover:text-blue-500 transition-colors
`;

// Control Components
export const ViewModeButton = tw.button<{ $active: boolean }>`
  p-2 rounded-md
  ${({ $active }) => ($active ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100")}
`;

export const AddTodoButton = tw.button`
  inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500
  text-white hover:bg-blue-600 transition-colors
`;

// Icon Sizes (could also be done with SVG components)
export const SmallIcon = tw.span`h-4 w-4`;
export const MediumIcon = tw.span`h-5 w-5`;

// Add to your existing styles.ts
export const ModalOverlay = tw.div`
  fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50
`;

export const ModalContent = tw.form`
  bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative flex flex-col
`;

export const TitleBar = tw.div`
  flex items-center justify-between mb-4
`;

export const CloseButton = tw.button`
  text-gray-400 hover:text-gray-600
`;

export const ModalTitle = tw.h2`
  text-xl font-semibold
`;

export const FormFieldContainer = tw.div`
  space-y-4
`;

export const InputField = tw.input`
  w-full px-3 py-2 border border-gray-300 rounded-md
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  placeholder:text-gray-400
`;

export const TextAreaField = tw.textarea`
  w-full px-3 py-2 border border-gray-300 rounded-md
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  placeholder:text-gray-400
  min-h-[80px] resize-y
`;

export const SubmitButton = tw.button<{ $disabled: boolean }>`
  inline-flex items-center gap-2 px-4 py-2 rounded-md
  bg-blue-500 text-white font-medium
  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  transition-colors duration-200
  ${({ $disabled }) => $disabled && "opacity-50 cursor-not-allowed"}
`;
