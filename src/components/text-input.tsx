interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ placeholder, value, onChange }: Props) {
  return (
    <input
      type="text"
      className="w-full rounded border border-gray-700 bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}
