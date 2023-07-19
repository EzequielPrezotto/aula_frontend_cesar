import { TextInput } from "@/components/text-input";

interface Props {
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
}

export function EditableTextInput({ value, isEditing, onChange }: Props) {
  if (isEditing) {
    return (
      <TextInput placeholder="Editing..." value={value} onChange={onChange} />
    );
  }

  return value;
}
