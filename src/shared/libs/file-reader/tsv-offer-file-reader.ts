import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { parseBoolean, parseNumbers, parseStrings } from '../../helpers/index.js';
import {
  EventName,
  ENCODING,
  TAB_CHAR,
  END_OF_LINE,
  TSV_CHUNK_SIZE,
} from '../../../constants/index.js';
import { Offer, MockTableData } from '../../types/index.js';
import { FileReader } from '../../libs/index.js';

export class TSVOfferFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
      id,
      title,
      description,
      createdAt,
      city,
      preview,
      photos,
      isPremium,
      isFavorite,
      rating,
      offerType,
      roomsCount,
      guestsCount,
      price,
      comforts,
      commentsCount,
      coordinates,
      authorName,
      authorEmail,
      authorType,
    ] = line.replaceAll('\r', '').split(TAB_CHAR) as MockTableData;

    return {
      id,
      title,
      description,
      createdAt: new Date(createdAt).toString(),
      city: city,
      preview,
      photos: parseStrings(photos),
      isPremium: parseBoolean(isPremium),
      isFavorite: parseBoolean(isFavorite),
      rating: Number(rating),
      type: offerType,
      roomsCount: Number(roomsCount),
      guestsCount: Number(guestsCount),
      price: Number(price),
      comforts: parseStrings(comforts),
      author: { name: authorName, email: authorEmail, type: authorType },
      commentsCount: Number(commentsCount),
      coordinates: parseNumbers(coordinates),
    };
  }

  public async read(): Promise<void> {
    try {
      const readStream = createReadStream(this.filename, {
        highWaterMark: TSV_CHUNK_SIZE,
        encoding: ENCODING,
      });

      let remainingData = '';
      let nextLinePosition = -1;
      let importedRowCount = 0;
      let index = -1;

      for await (const chunk of readStream) {
        remainingData += chunk.toString();
        nextLinePosition = remainingData.indexOf(END_OF_LINE);

        while (nextLinePosition >= 0) {
          const line = remainingData.slice(0, nextLinePosition);

          remainingData = remainingData.slice(++nextLinePosition);
          nextLinePosition = remainingData.indexOf(END_OF_LINE);
          importedRowCount++;

          await new Promise((resolve) => {
            this.emit(EventName.LINE_READ, this.parseLineToOffer(line), ++index, resolve);
          });
        }
      }

      this.emit(EventName.FILE_READ, importedRowCount);
    } catch (error: unknown) {
      throw new Error(`Ошибка при чтении файла **${this.filename}**`);
    }
  }
}
