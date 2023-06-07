export interface IAction {
  filter: string;
  sort: 'asc' | 'desc';
}

export type ActionContextType = {
  action: IAction;
  setAction: (val: IAction) => void;
};
