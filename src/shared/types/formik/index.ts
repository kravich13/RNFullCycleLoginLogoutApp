export interface IHandleFormikChange<T extends string> {
  handleChange: {
    <R extends T>(field: R): R extends React.ChangeEvent
      ? void
      : <E>(e: E | React.ChangeEvent) => void;
  };
}
