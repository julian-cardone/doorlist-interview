export type EventHostRowProps = {
  hosts: string[];
  onAdd: (name: string) => void;
  onRemove: (index: number) => void;
};
