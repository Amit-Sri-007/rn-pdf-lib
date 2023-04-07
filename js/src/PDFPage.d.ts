type TextAction = {
  type: "text";
  x: number;
  y: number;
  color: string;
  fontSize: number;
  value: string;
};

type RectangleAction = {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

type ImageAction = {
  type: "image";
  imagePath: string;
  imageType: string;
  imageSource: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
};

type MoveToAction = {
  type: "moveTo";
  x: number;
  y: number;
  color: string;
  strokeWidth: number;
};

type LineToAction = {
  type: "lineTo";
  x: number;
  y: number;
  color: string;
  strokeWidth: number;
};

type PageActions = TextAction | RectangleAction | ImageAction | MoveToAction | LineToAction;

export type PageAction = {
  pageIndex?: number;
  mediaBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  actions: PageActions[];
};

export class PDFPage {
  static create: () => PDFPage;
  static load: (pageIndex: any) => PDFPage;
  static modify: (pageIndex: any) => PDFPage;
  page: PageAction;
  setMediaBox: (width: number, height: number, options?: {
    x?: number;
    y?: number;
  }) => PDFPage;
  drawText: (value: string, options?: {
    x?: number;
    y?: number;
    color?: string;
    fontSize?: number;
    fieldSize?: number;
    textAlign?: 'left' | 'right' | 'center';
    fontName?: string;
  }) => PDFPage;
  drawRectangle: (options?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    color?: string;
  }) => PDFPage;
  drawImage: (imagePath: string, imageType: string, options?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    imageSource?: string;
  }) => PDFPage;
  drawMove: (options?: {
    x?: number;
    y?: number;
    color?: string;
    strokeWidth?: number;
  }) => PDFPage;
  drawLine: (options?: {
    x?: number;
    y?: number;
    color?: string;
    strokeWidth?: number;
  }) => PDFPage;
  stroke: (options?: {
  }) => PDFPage;
  transform: (options?: {
  }) => PDFPage;
  saveGraphicsState: (options?: {
  }) => PDFPage;
  restoreGraphicsState: (options?: {
  }) => PDFPage;
}

export default {};