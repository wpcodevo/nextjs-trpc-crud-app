export type INote = {
  id: string;
  title: string;
  content: string;
  category: string | null;
  published: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};
