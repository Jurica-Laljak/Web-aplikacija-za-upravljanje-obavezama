export type CheckboxArgs = {
  customKey: number;
  checked: boolean;
  setChecked: (key: number) => void;
};

export type CheckboxFormData = {
  key: number;
  value: string;
  checked: boolean;
};
