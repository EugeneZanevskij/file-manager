import { Writable } from 'stream';

export const output = () => {
  return new Writable({
    decodeStrings: false,
    write(chunk, encoding, callback) {
      console.log(chunk);
      callback();
    }
  });
}