import {
  Plus,
  X,
  Tag as TagIcon,
  Trash2 as TrashIcon,
  CheckCircle2 as CheckIcon,
  Circle as CircleIcon,
} from "lucide-react";
import tw from "tailwind-styled-components";
import { ComponentProps } from "react";

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const IconWrapper = tw.span<{ $size?: keyof typeof iconSizes }>`
  ${(props: { $size?: keyof typeof iconSizes }) => iconSizes[props.$size || "md"]}
`;

export const CloseIcon = (props: ComponentProps<typeof X>) => {
  return (
    <IconWrapper $size="md">
      <X className="text-gray-400 hover:text-gray-600" {...props} />
    </IconWrapper>
  );
};

export const SubmitIcon = (props: ComponentProps<typeof Plus>) => (
  <IconWrapper $size="md">
    <Plus className="text-white" {...props} />
  </IconWrapper>
);

export const TodoCheckIcon = (
  props: ComponentProps<typeof CheckIcon> & { $completed: boolean },
) => (
  <IconWrapper $size="md">
    <CheckIcon
      className={
        props.$completed
          ? "text-green-500 hover:text-green-600"
          : "text-gray-400 hover:text-blue-500"
      }
      {...props}
    />
  </IconWrapper>
);

export const TodoCircleIcon = (
  props: ComponentProps<typeof CircleIcon> & { $completed: boolean },
) => (
  <IconWrapper $size="md">
    <CircleIcon
      className={
        props.$completed
          ? "text-green-500 hover:text-green-600"
          : "text-gray-400 hover:text-blue-500"
      }
      {...props}
    />
  </IconWrapper>
);

export const TodoTagIcon = (props: ComponentProps<typeof TagIcon>) => (
  <IconWrapper $size="sm">
    <TagIcon className="text-gray-400" {...props} />
  </IconWrapper>
);

export const DeleteIcon = (props: ComponentProps<typeof TrashIcon>) => (
  <IconWrapper $size="md">
    <TrashIcon className="text-gray-400 hover:text-red-500" {...props} />
  </IconWrapper>
);
