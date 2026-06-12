// src/domains/pdf/workers/pdf-merger.worker.ts
/// <reference lib="webworker" />

import { PDFDocument } from 'pdf-lib';
import type { WorkerInput, WorkerOutput } from '../types';

// Força o TypeScript a entender que este arquivo roda no contexto de um Web Worker
const workerScope = self as unknown as DedicatedWorkerGlobalScope;

workerScope.onmessage = async (event: MessageEvent<WorkerInput>) => {
  const { files, options } = event.data;

  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      if (file.type === 'application/pdf') {
        await appendPdf(mergedPdf, file.rawBuffer);
        continue;
      }

      let bufferToEmbed = file.rawBuffer;

      if (options.compressImages && file.type.startsWith('image/')) {
        bufferToEmbed = await compressImageBuffer(file.rawBuffer, file.type);
      }

      await embedImageIntoPdf(mergedPdf, bufferToEmbed, file.type, options.compressImages);
    }

    const pdfBytes = await mergedPdf.save();
    const response: WorkerOutput = { success: true, pdfBytes };
    
    // Casting estrito para ArrayBuffer para satisfazer a interface Transferable do TS
    workerScope.postMessage(response, [pdfBytes.buffer as ArrayBuffer]);
  } catch (error: any) {
    const response: WorkerOutput = { 
      success: false, 
      error: error.message || 'Erro interno durante o processamento dos arquivos.' 
    };
    workerScope.postMessage(response);
  }
};

async function appendPdf(targetDoc: PDFDocument, buffer: ArrayBuffer): Promise<void> {
  const srcDoc = await PDFDocument.load(buffer);
  const copiedPages = await targetDoc.copyPages(srcDoc, srcDoc.getPageIndices());
  copiedPages.forEach((page) => targetDoc.addPage(page));
}

async function compressImageBuffer(buffer: ArrayBuffer, type: string): Promise<ArrayBuffer> {
  try {
    const blob = new Blob([buffer], { type });
    const bitmap = await createImageBitmap(blob);
    
    const MAX_WIDTH = 1920;
    const MAX_HEIGHT = 1080;
    let width = bitmap.width;
    let height = bitmap.height;

    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
      const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return buffer;

    ctx.drawImage(bitmap, 0, 0, width, height);
    
    const compressedBlob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.75 });
    return await compressedBlob.arrayBuffer();
  } catch {
    return buffer;
  }
}

async function embedImageIntoPdf(
  targetDoc: PDFDocument, 
  buffer: ArrayBuffer, 
  originalType: string,
  wasCompressed: boolean
): Promise<void> {
  const isPng = originalType === 'image/png' && !wasCompressed;
  
  if (isPng) {
    const imagePng = await targetDoc.embedPng(buffer);
    addPageWithImage(targetDoc, imagePng);
    return;
  }
  
  const imageJpg = await targetDoc.embedJpg(buffer);
  addPageWithImage(targetDoc, imageJpg);
}

function addPageWithImage(targetDoc: PDFDocument, image: any): void {
  const { width, height } = image.scale(1);
  const page = targetDoc.addPage([width, height]);
  page.drawImage(image, { x: 0, y: 0, width, height });
}