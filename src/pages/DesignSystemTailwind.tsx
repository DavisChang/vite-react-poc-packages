import React from "react";
import { Button } from "../components/ui/Buttom";

const DesignSystemTailwind = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Design System - Tailwind</h1>
      <div>
        <p className="my-10 text-center text-base font-bold leading-9 tracking-tight text-gray-900">
          Tailwind CSS
          <a
            className="pl-2 border-transparent text-teal-700
             hover:text-teal-500 underline hover:underline-offset-2 hover:cursor-pointer"
            href="https://github.com/tailwindlabs/tailwindcss/blob/main/stubs/config.full.js"
            aria-label="link to function headingsTreeview"
            target="_blank"
          >
            Default Config
          </a>
        </p>
      </div>
      <div className="flex flex-col justify-center gap-x-6 py-5">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-brand-500">
          My Brand Color (text-brand-500)
        </h2>
        <div className="text-left">
          <pre>
            {`
              const colors = require("tailwindcss/colors");
              const brandColor = colors.sky;

              export default {
                content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
                theme: {
                  extend: {
                    colors: {
                      brand: brandColor,
                    },
                  },
                },
                plugins: [],
              };


              <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-brand-500">
                My Brand Color (text-brand-500)
              </h2>
              `}
          </pre>
        </div>
        <br />
      </div>

      <div className="flex flex-col justify-center gap-x-6 py-5">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-brand-500">
          Variants and styling configurations - Custom Button - cva
        </h2>
        <div className="flex">
          <Button href="#" intent="primary">
            Primary Button
          </Button>
          <br />
          <Button intent="secondary" fullWidth>
            Secondary Button
          </Button>
        </div>
        <div className="text-left">
          <p className="my-4 text-brand-500">
            The cva function from the class-variance-authority package is used
            to create a dynamic set of CSS class names based on props. It allows
            you to define variants (such as intent and fullWidth) and their
            respective class names, as well as default variants that are applied
            if no props are provided.
          </p>
          <pre>
            {`
              <Button href="#" intent="primary">
                Primary Button
              </Button>
              <Button intent="secondary" fullWidth>
                Secondary Button
              </Button>


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
            `}
          </pre>
        </div>
        <br />
      </div>
    </div>
  );
};

export default DesignSystemTailwind;
