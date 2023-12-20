import { ReadStream } from 'fs-capacitor';

export type VisibleStatus = 'VISIBLE' | 'NONE';

export type DateType = 'YEAR' | 'MONTH' | 'FULL';

export type EndTime = 'CURRENT' | 'NORMAL';

export type HistoryMode = 'IMPACT' | 'DETAIL';

export type ProjectMode = 'MAIN' | 'NORMAL';

export type SectionType =
  | 'INTRODUCE'
  | 'HISTORY'
  | 'SKILL'
  | 'KEYWORD'
  | 'PROJECT'
  | 'CONTACT';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}

export class Upload {
  promise: Promise<FileUpload>;
  file?: FileUpload;
}
