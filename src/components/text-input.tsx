import { classnames } from "@/utils/classnames";

type TextInputPrimitiveProps = React.ComponentPropsWithoutRef<"input">;
type OmittedProps = "onChange";

interface Props extends Omit<TextInputPrimitiveProps, OmittedProps> {
  onChange: (value: string) => void;
}

export function TextInput({ className, onChange, ...rest }: Props) {
  return (
    <input
      type="text"
      className={classnames(
        "w-full rounded border border-gray-700 bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onChange={(event) => onChange(event.currentTarget.value)}
      {...rest}
    />
  );
}
