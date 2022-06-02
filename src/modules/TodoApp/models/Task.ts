export interface Task {
  id: string;
  title: string;
  description: string;
  complete: boolean;
}

export interface PropsCompletedAction {
  id: string;
  val: boolean;
}

export interface PropsCompletedMutation {
  index: number;
  val: boolean;
}
