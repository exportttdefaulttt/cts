export type Styles = {
  'error': string;
  'errorText': string;
  'root': string;
  'search': string;
  'success': string;
  'wrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
