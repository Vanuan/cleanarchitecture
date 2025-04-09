import {
  Plus,
  X,
  Tag as TagIcon,
  Trash2 as TrashIcon,
  CheckCircle2 as CheckIcon,
  Circle as CircleIcon,
  Edit as EditLucideIcon,
  Clock as ClockIconLucide,
  SquarePen as SquarePenIcon,
  CheckCircle2 as CircleCheckIconLucide,
  Circle as CircleIconLucide,
} from "lucide-react";
import tw from "tailwind-styled-components";
import { ComponentProps } from "react";

const iconSizes = {
  xs: "h-2.5 w-2.5",
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

export const EditIcon = (props: ComponentProps<typeof EditLucideIcon>) => (
  <IconWrapper $size="md">
    <EditLucideIcon className="text-gray-400 hover:text-blue-500" {...props} />
  </IconWrapper>
);

export const BoardCheckIcon = (
  props: ComponentProps<typeof CircleCheckIconLucide>,
) => (
  <IconWrapper $size="md">
    <CircleCheckIconLucide
      className={"text-emerald-500 hover:text-emerald-600"}
      {...props}
    />
  </IconWrapper>
);

export const BoardCircleIcon = (
  props: ComponentProps<typeof CircleIconLucide>,
) => (
  <IconWrapper $size="md">
    <CircleIconLucide
      className={"text-gray-400 hover:text-blue-500"}
      {...props}
    />
  </IconWrapper>
);

export const BoardTagIcon = (props: ComponentProps<typeof TagIcon>) => (
  <IconWrapper $size="sm" className="mr-1">
    <TagIcon className="h-full w-full" {...props} />
  </IconWrapper>
);

export const BoardClockIcon = (props: ComponentProps<typeof ClockIconLucide>) => (
  <IconWrapper $size="sm" className="mr-0.5">
    <ClockIconLucide className="h-full w-full" {...props} />
  </IconWrapper>
);

export const BoardEditIcon = (props: ComponentProps<typeof SquarePenIcon>) => (
  <IconWrapper $size="sm" className="mr-0.5">
    <SquarePenIcon className="h-full w-full" {...props} />
  </IconWrapper>
);

export const BoardDeleteIcon = (props: ComponentProps<typeof TrashIcon>) => (
  <IconWrapper $size="sm" className="mr-0.5">
    <TrashIcon className="h-full w-full" {...props} />
  </IconWrapper>
);
