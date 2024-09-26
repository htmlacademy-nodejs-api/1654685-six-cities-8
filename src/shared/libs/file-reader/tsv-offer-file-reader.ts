import { createReadStream } from 'node:fs';
import EventEmitter from 'node:events';
import { parseBoolean, parseNumbers, parseStrings } from '@/shared/helpers/index.js';
import {
  ENCODING,
  TAB_CHAR,
  END_OF_LINE,
  TSV_CHUNK_SIZE,
  END_EVENT_NAME,
  LINE_END_EVENT_NAME,
} from '@/constants/index.js';
import { Offer, MockTableData } from '@/shared/types/index.js';
import { FileReader } from '@/shared/libs/index.js';

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

        this.emit(LINE_END_EVENT_NAME, this.parseLineToOffer(line), ++index);
      }
    }

    this.emit(END_EVENT_NAME, importedRowCount);
  }
}
