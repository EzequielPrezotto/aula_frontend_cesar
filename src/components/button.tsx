import { classnames } from "@/utils/classnames";

interface Props {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export function Button({ className, disabled, children, onClick }: Props) {
  return (
    <button
      className={classnames(
        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white shadow transition active:brightness-75 disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
