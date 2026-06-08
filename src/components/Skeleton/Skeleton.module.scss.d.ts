export type Styles = {
  'block': string;
  'circle': string;
  'fadeIn': string;
  'header': string;
  'mini': string;
  'pulse': string;
  'root': string;
  'select': string;
  'skeleton': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
