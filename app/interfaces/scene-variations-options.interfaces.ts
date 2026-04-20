export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  marks?: { value: number; label: string }[];
}

export interface DropdownOption<T> {
  label: string;
  value: T;
}
