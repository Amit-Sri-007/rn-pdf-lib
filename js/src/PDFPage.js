export type TextAction = {
  type: 'text',
  x: number,
  y: number,
  color: string,
  fontSize: number,
  value: string,
};

export type RectangleAction = {
  type: 'rectangle',
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
};

export type ImageAction = {
  type: 'image',
  imagePath: string,
  imageType: string,
  imageSource: string,
  x: number,
  y: number,
  width?: number, // If don't have width & height, will use actual dimensions
  height?: number,
};

export type MoveToAction = {
  type: 'moveTo',
  x: number,
  y: number,
  color?: string,
  strokeWidth?: number,
};

export type LineToAction = {
  type: 'lineTo',
  x: number,
  y: number,
  color?: string,
  strokeWidth?: number,
};

export type StrokeAction = {
  type: 'stroke'
};

export type TransformAction = {
  type: 'transform'
};

export type SaveGraphicsStateAction = {
  type: 'saveGraphicsState'
};

export type RestoreGraphicsStateAction = {
  type: 'restoreGraphicsState'
};

export type PageActions =
  TextAction
  | RectangleAction
  | ImageAction
  ;

export type PageAction = {
  pageIndex?: number, // Not allowed in created pages
  mediaBox?: { // Not allowed for modified pages
    x: number,
    y: number,
    width: number,
    height: number,
  },
  actions: PageActions[],
};

export default class PDFPage {
  page: PageAction = {
    actions: [],
  };

  static create = () => {
    const newPage = new PDFPage();
    newPage.page.mediaBox = { x: 0, y: 0, width: 250, height: 500 };
    return newPage;
  }

  static load = (pageIndex) => {
    const newPage = new PDFPage();
    newPage.page.pageIndex = pageIndex;
    return newPage;
  }

  static loadFromFile = (filePath, pageIndex) => {
    const newPage = new PDFPage();
    newPage.page.filePath = filePath;
    newPage.page.pageIndex = pageIndex;
    return newPage;
  }

  static modify = (pageIndex) => {
    const newPage = new PDFPage();
    newPage.page.pageIndex = pageIndex;
    return newPage;
  }

  setMediaBox = (
    width: number,
    height: number,
    options: { x?: number, y?: number } = {},
  ) => {
    if (this.page.pageIndex !== undefined) {
      throw new Error('Cannot set media box on modified page!');
    }
    this.page.mediaBox = {
      x: 0,
      y: 0,
      ...options,
      width,
      height,
    };
    return this;
  }

  drawText = (
    value: string,
    options: {
      x?: number,
      y?: number,
      color?: string,
      fontSize?: number,
    } = {}
  ) => {
    const textAction: TextAction = {
      x: 0,
      y: 0,
      color: '#000000',
      fontSize: 12,
      fontName: 'Times New Roman',
      ...options,
      type: 'text',
      value,
    };
    this.page.actions.push(textAction);
    return this;
  }

  drawRectangle = (
    options: {
      x?: number,
      y?: number,
      width?: number,
      height?: number,
      color?: string,
    } = {}
  ) => {
    const rectAction: RectangleAction = {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      color: '#000000',
      ...options,
      type: 'rectangle',
    };
    this.page.actions.push(rectAction);
    return this;
  }

  drawImage = (
    imagePath: string,
    imageType: string,
    options: {
      x?: number,
      y?: number,
      width?: number,
      height?: number,
      imageSource?: string
    } = {}
  ) => {
    // TODO: Add logic using ReactNative.Image to automatically preserve image
    // dimensions!
    if (!['png', 'jpg'].includes(imageType)) {
      throw new Error('Only JPG and PNG images are currently supported!');
    }
    if (typeof options.imageSource !== 'undefined' && !['assets', 'path'].includes(options.imageSource)) {
      throw new Error('Only images from "assets" and "path" are currently supported!');
    }
    const imageAction: ImageAction = {
      x: 0,
      y: 0,
      source: 'path',
      ...options,
      type: 'image',
      imagePath,
      imageType
    };
    this.page.actions.push(imageAction);
    return this;
  }

  drawMove = (
    options: {
      x?: number,
      y?: number,
      color?: string,
      strokeWidth?: number;
    } = {}
  ) => {
    const moveToAction: MoveToAction = {
      x: 0,
      y: 0,
      color: '#000000',
      strokeWidth: 2,
      ...options,
      type: 'moveTo',
    };
    this.page.actions.push(moveToAction);
    return this;
  }

  drawLine = (
    options: {
      x?: number,
      y?: number,
      color?: string,
      strokeWidth?: number;
    } = {}
  ) => {
    const lineToAction: LineToAction = {
      x: 0,
      y: 0,
      color: '#000000',
      strokeWidth: 2,
      ...options,
      type: 'lineTo',
    };
    this.page.actions.push(lineToAction);
    return this;
  }

  stroke = (
    options: {
    } = {}
  ) => {
    const strokeAction: StrokeAction = {
      ...options,
      type: 'stroke',
    };
    this.page.actions.push(strokeAction);
    return this;
  }

  transform = (
    options: {
    } = {}
  ) => {
    const transformAction: TransformAction = {
      ...options,
      type: 'transform',
    };
    this.page.actions.push(transformAction);
    return this;
  }

  saveGraphicsState = (
    options: {
    } = {}
  ) => {
    const saveGraphicsStateAction: SaveGraphicsStateAction = {
      ...options,
      type: 'saveGraphicsState',
    };
    this.page.actions.push(saveGraphicsStateAction);
    return this;
  }

  restoreGraphicsState = (
    options: {
    } = {}
  ) => {
    const restoreGraphicsStateAction: RestoreGraphicsStateAction = {
      ...options,
      type: 'restoreGraphicsState',
    };
    this.page.actions.push(restoreGraphicsStateAction);
    return this;
  }

}
