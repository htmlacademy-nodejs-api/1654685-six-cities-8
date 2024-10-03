import { createWriteStream, WriteStream } from 'node:fs';
import { ENCODING, END_OF_LINE } from '../../../constants/index.js';
import { FileWriter } from '../../../shared/libs/index.js';

export class TSVFileWriter implements FileWriter {
  private stream!: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: ENCODING,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    const writeSuccess = this.stream.write(row + END_OF_LINE);

    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }

    return Promise.resolve();
  }
}
