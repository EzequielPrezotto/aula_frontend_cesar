interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function Checkbox({ checked, onChange }: Props) {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-gray-700 bg-background text-blue-800 transition focus:ring-0"
      checked={checked}
      onChange={(event) => onChange(event.currentTarget.checked)}
    />
  );
}
