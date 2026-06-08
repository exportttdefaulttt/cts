export type Styles = {
  'section': string;
  'top': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
