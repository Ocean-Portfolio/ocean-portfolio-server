import { ReadStream } from 'fs-capacitor';

export type VisibleStatus = 'VISIBLE' | 'NONE';

export type DateType = 'YEAR' | 'MONTH' | 'FULL';

export type HistoryMode = 'IMPACT' | 'DETAIL';

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
