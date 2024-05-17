declare module 'color-extr-thief' {
    export default class ColorThief {
      getColor(sourceImage: HTMLImageElement | string, quality?: number): [number, number, number];
      getPalette(sourceImage: HTMLImageElement | string, colorCount?: number, quality?: number): Array<[number, number, number]>;
    }
  }
  