import { TextInput } from "@/components/text-input";

interface Props {
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  completed: boolean;
}

export function EditableTextInput({ value, isEditing, onChange, completed }: Props) {
  if (isEditing) {
    return (
      <TextInput placeholder="Editing..." value={value} onChange={onChange} />
    );
  }

  return (
    <span className={(completed ? 'line-through decoration-gray-400 decoration-2' : '')}>{value}</span>
  );
}
