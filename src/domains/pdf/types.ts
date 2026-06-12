export type FileType = 'application/pdf' | 'image/jpeg' | 'image/png';

export interface MergeableFile {
  id: string;
  name: string;
  size: number;
  type: FileType;
  rawBuffer: ArrayBuffer;
  previewUrl?: string;
}

export interface WorkerInput {
  files: Array<{
    id: string;
    name: string;
    type: FileType;
    rawBuffer: ArrayBuffer;
  }>;
  options: {
    compressImages: boolean;
  };
}

export interface WorkerOutput {
  success: boolean;
  pdfBytes?: Uint8Array;
  error?: string;
}