// export enum PositionName {
//   'HR',
//   'Backend Developer',
//   'Frontend Developer',
//   'FullStack Developer',
//   'Business Analyst',
// }

export enum MasterPosition {
  Admin = 'Admin',
}

export interface PositionProps {
  name: string;
  code: string;
  createdAt: string;
  updatedAt?: string;
  active: boolean;
}
