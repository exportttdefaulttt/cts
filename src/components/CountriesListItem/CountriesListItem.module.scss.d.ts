export type Styles = {
  'circle': string;
  'fadeIn': string;
  'info': string;
  'root': string;
  'subregion': string;
  'top': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
