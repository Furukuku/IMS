export interface PostData {
  _method?: string;
  id?: number;
  title: string;
  description: string;
  is_uploadable: boolean;
  removed_files?: number[];
  files: File[];
}