// @ts-ignore
export default function sugarcss(settings?: TSugarCssSettings): any;

export type TSugarCssRadius = {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  ast: any;
};

export type TSugarColorRgba = {
  r: number;
  g: number;
  b: number;
  a: number;
  string: string;
};

export type TSugarColorHsla = {
  h: number;
  s: number;
  l: number;
  a: number;
  string: string;
};

export type TSugarCssColor = {
  hex: string;
  rgba: TSugarColorRgba;
  hsla: TSugarColorHsla;
  shades?: Record<string, any>;
};

export type TSugarCssJson = {
  colors: Record<string, TSugarCssColor>;
  containers: Record<string, TSugarCssContainer>;
  delays: Record<string, number>;
  easingFunctions: Record<string, string>;
  fonts: Record<string, TSugarCssTypo>;
  fontFamilies: Record<string, string[]>;
  grids: Record<string, TSugarCssGrid>;
  medias: Record<string, TSugarCssMedia>;
  radius: Record<string, TSugarCssRadius>;
  settings: TSugarCssEnv['settings'];
  shades: Record<string, TSugarCssShade>;
  sizes: Record<string, number | string>;
  spaces: Record<string, number | string>;
  transitions: Record<string, TSugarCssTransition>;
  typos: Record<string, TSugarCssTypo>;
};

export type TSugarCssEnv = {
  persistentEnvs: string[];
  functions: Record<string, Function>;
  rules: Record<string, Function>;
  settings: TSugarCssSettings;
  easingFunctions: Record<string, string>;
  medias: Record<string, TSugarCssMedia>;
  grids: Record<string, TSugarCssGrid>;
  spaces: TSugarCssSpace;
  sizes: TSugarCssSize;
};

export type TSugarCssGrid = {
  layout: string;
  gap: number;
  ast?: any;
};

export type TSugarCssTransition = {
  property: string;
  duration: string;
  easing: string;
  delay: string;
  behavior: string;
  ast: any;
};

export type TSugarCssContainer = {
  minWidth: number;
  maxWIdth: number;
  sidePadding: number;
};

export type TSugarCssTypo = {
  font: string;
  size: number;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: string;
  textDecoration?: string;
};

export type TSugarCssSettings = {
  remFactor: number;
  verbose: boolean;
  mobileFirst: boolean;
  scalable: string[];
  pxToRem: boolean;
  opacityZeroValue?: number;
};

export type TSugarCssSpace = {
  easing: string;
  min: number;
  max: number;
};

export type TSugarCssSize = {
  easing: string;
  min: number;
  max: number;
};

export type TSugarCssShade = {
  darken?: number;
  lighten?: number;
  saturate?: number;
  desaturate?: number;
  spin?: number;
  alpha?: number;
};

export type TSugarCssMedia = {
  min?: number;
  max?: number;
};

export type TSugarCssEasing = {
  function: string;
};
