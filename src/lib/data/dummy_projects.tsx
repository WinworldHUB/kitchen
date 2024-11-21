import { ProjectStatus } from "../constants";

export type DUMMY_PROJECTS = {
  id: string;
  title: string;
  address: string;
  userName: string;
  status: string;
};

export const projects: DUMMY_PROJECTS[] = [
  {
    id: "1",
    title: "Project 1",
    address: "123 Main St",
    userName: "John Doe",
    status: ProjectStatus.designBrief,
  },
  {
    id: "2",
    title: "Project 2",
    address: "456 Elm St",
    userName: "James Anderson",
    status: ProjectStatus.completed,
  },
  {
    id: "3",
    title: "Project 3",
    address: "789 Oak St",
    userName: "James Anderson",
    status: ProjectStatus.completed,
  },
];
