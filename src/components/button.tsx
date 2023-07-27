import { classnames } from "@/utils/classnames";

type ButtonPrimitiveProps = React.ComponentPropsWithoutRef<"button">;

type Props = ButtonPrimitiveProps;

export function Button({ className, ...rest }: Props) {
  return (
    <button
      className={classnames(
        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white shadow transition active:brightness-75 disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
      {...rest}
    />
  );
}
