import React from "react";

export interface ButtonOrLinkProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  [key: string]: any;
}

export const ButtonOrLink: React.FC<ButtonOrLinkProps> = ({
  href,
  className,
  children,
  onClick,
  ...props
}) => {
  const Component = href ? "a" : "button";
  return (
    <Component href={href} className={className} onClick={onClick} {...props}>
      {children}
    </Component>
  );
};
