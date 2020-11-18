export interface LayoutConfig<T> {
  // label to display
  label: string;
  // column property name
  property: keyof T;
  // showing state
  show: boolean;
}
