export interface JobActionState {
  success: boolean;
  errors?: { [key: string]: string };
  message: string;
  values?: { [key: string]: string };
}
