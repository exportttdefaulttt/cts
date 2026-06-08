export type Styles = {
  'active': string;
  'nextPage': string;
  'pages': string;
  'pagination': string;
  'prevPage': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
