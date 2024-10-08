export type TodoType = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type TodoResponse =
  | {
      todos: TodoType[];
      page: string;
      totalPages: string;
    }
  | undefined;

export type TodoSearchParams = {
  search?: string;
  page?: string;
  limit?: string;
};
