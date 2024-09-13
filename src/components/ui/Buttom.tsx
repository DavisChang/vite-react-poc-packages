import { cva, VariantProps } from "class-variance-authority";
import { ButtonOrLink, ButtonOrLinkProps } from "./ButtonOrLink";

const buttonStyles = cva(
  "flex items-center justify-center px-4 py-2 rounded font-medium focus:outline-none focus:ring",
  {
    variants: {
      intent: {
        primary: "bg-brand-500 text-white",
        secondary:
          "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
        danger: "bg-red-500 text-white focus:ring-red-500",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export interface Props
  extends ButtonOrLinkProps,
    VariantProps<typeof buttonStyles> {}

export function Button({ intent, fullWidth, ...props }: Props) {
  return (
    <ButtonOrLink className={buttonStyles({ intent, fullWidth })} {...props} />
  );
}
