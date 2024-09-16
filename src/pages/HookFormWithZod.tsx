import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// use zod validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
// use zod type
type FromFields = z.infer<typeof schema>;

function HookFormWithZod() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FromFields>({
    defaultValues: {
      email: "default@email.com",
    },
    // use zodResolver
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FromFields> = async (data) => {
    console.log(data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error("This is email is already token.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Safe to access properties like message and name
        setError("email", {
          message: error.message,
        });

        // root error
        setError("root", {
          message: "I'm a root error message.",
        });
      } else {
        // Handle unknown error types (e.g., strings, objects, or anything unexpected)
        console.error("An unknown error occurred", error);
      }
    }
  };
  console.log("errors:", errors);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">React Hook Form With Zod</h1>
      <div className="flex flex-col items-center">
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            className="my-4 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div className="block text-red-500 my-2">
            {errors.email && errors.email.message}
          </div>

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="my-4 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div className="block text-red-500 my-2">
            {errors.password && errors.password.message}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="my-4 pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          <div className="block text-red-500 my-2">
            {errors.root && errors.root.message}
          </div>
        </form>
      </div>
      <div className="p-4 w-full my-4 text-left">
        <h2 className="text-xl font-bold">
          Using React Hook Form and Zod together allows you to build efficient,
          type-safe, and easily maintainable forms in React.
        </h2>
        <pre>
          {`
            import { SubmitHandler, useForm } from "react-hook-form";
            import { z } from "zod";
            import { zodResolver } from "@hookform/resolvers/zod";

            // use zod validation
            const schema = z.object({
              email: z.string().email(),
              password: z.string().min(8),
            });
            // use zod type
            type FromFields = z.infer<typeof schema>;
          

            const {
              register,
              handleSubmit,
              setError,
              formState: { errors, isSubmitting },
            } = useForm<FromFields>({
              defaultValues: {
                email: "default@email.com",
              },
              // use zodResolver
              resolver: zodResolver(schema),
            });
            
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("email")}
                type="text"
                placeholder="Email"
                className="my-4 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="block text-red-500 my-2">
                {errors.email && errors.email.message}
              </div>

              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="my-4 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="block text-red-500 my-2">
                {errors.password && errors.password.message}
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="my-4 pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
              >
                {isSubmitting ? "Loading..." : "Submit"}
              </button>
              <div className="block text-red-500 my-2">
                {errors.root && errors.root.message}
              </div>
            </form>

          `}
        </pre>
      </div>
      <div>
        <p className="text-left text-base leading-2 tracking-tight text-black-400">
          * Declarative Validation: Zod allows you to declaratively define the
          schema for form validation, ensuring that your form input is validated
          against the correct types and constraints.
        </p>
        <p className="text-left text-base leading-2 tracking-tight text-black-400">
          * TypeScript Support: Both libraries work seamlessly with TypeScript,
          enabling you to enforce type safety both during development and at
          runtime.
        </p>
        <p className="text-left text-base leading-2 tracking-tight text-black-400">
          * Performance: React Hook Form reduces unnecessary re-renders by using
          uncontrolled inputs, making forms more performant, even in large
          applications.
        </p>
        <p className="text-left text-base leading-2 tracking-tight text-black-400">
          * Minimal Boilerplate: React Hook Form minimizes the amount of code
          needed to handle form state and validation compared to traditional
          methods.
        </p>
        <div>
          <p className="my-10 text-center text-base font-bold leading-9 tracking-tight text-gray-900">
            TypeScript-first schema validation with static type inference
            <a
              className="pl-2 border-transparent text-teal-700
             hover:text-teal-500 underline hover:underline-offset-2 hover:cursor-pointer"
              href="https://zod.dev/"
              aria-label="link to function zod.dev"
              target="_blank"
            >
              zod.dev
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default HookFormWithZod;
