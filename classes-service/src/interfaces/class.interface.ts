export interface IClass {
  id: string;
  name: string;
  teacher?: Record<string, string>;
  student?: Record<string, string>[];
  subject?: string;
}
