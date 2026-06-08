export type Styles = {
  'area': string;
  'col1': string;
  'col2': string;
  'fadeIn': string;
  'img': string;
  'info': string;
  'link': string;
  'link2': string;
  'main': string;
  'name': string;
  'region': string;
  'root': string;
  'row': string;
  'top': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
