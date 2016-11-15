export const PRELUDES = {
  _start: 'I started out',
  andThen: 'and then',
  also: 'also,'
};

export const POSTLUDE = 'And that is how I got here';

export const PRELUDE_KEYS = Object.keys(PRELUDES)
  .filter(key => key.charAt(0) !== '_');
