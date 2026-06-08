export type Styles = {
  'area': string;
  'button': string;
  'details': string;
  'fadeIn': string;
  'main': string;
  'name': string;
  'region': string;
  'root': string;
  'text': string;
  'top': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
