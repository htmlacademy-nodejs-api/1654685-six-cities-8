import path from 'node:path';
import chalk from 'chalk';
import { existsSync } from 'node:fs';
import { declination, getFileName } from '../../shared/helpers/index.js';

import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { TSVOfferFileReader } from '../../shared/libs/index.js';
import { EventName } from '../../constants/index.js';
import { Offer } from '../../shared/types/index.js';
import { Command } from '../../cli/index.js';

const LINE_WORDS = ['строка', 'строки', 'строк'];
const DEFAULT_USER_PASS = '123456';

export class ImportCommand implements Command {
  readonly name = '--import';
  readonly alias = '-i';
  readonly description = 'Импортирует данные из TSV файла';
  readonly params = ['path', 'mongoUri', 'salt'];

  private readonly logger: Logger = new ConsoleLogger();

  private userService: UserService = new DefaultUserService(this.logger, UserModel);
  private offerService: OfferService = new DefaultOfferService(
    this.logger,
    OfferModel,
    this.userService
  );

  private databaseClient: DatabaseClient = new MongoDatabaseClient(this.logger);
  private salt: string;

  private async onReadLine(offer: Offer, index: number, resolve: () => void) {
    this.logger.info(`\nИмпортирована ${chalk.bold.magenta(`${index}-ая`)} строка:`, offer);
    await this.saveOffer(offer);
    resolve();
  }

  private onReadFile(count: number) {
    this.logger.info(`\nИмпортировано **${count} ${declination(count, LINE_WORDS)}**`);
  }

  private async saveOffer(offer: Offer) {
    const author = await this.userService.findOrCreate(
      { ...offer.author, password: DEFAULT_USER_PASS },
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      type: offer.type,
      city: offer.city,
      createdAt: offer.createdAt,
      preview: offer.preview,
      photos: offer.photos,
      price: Number(offer.price),
      isPremium: offer.isPremium,
      roomsCount: Number(offer.roomsCount),
      guestsCount: Number(offer.guestsCount),
      comforts: offer.comforts,
      author: author.id,
      coordinates: offer.coordinates,
    });
  }

  private import(filePath: string) {
    const fullPath = path.join(process.cwd(), filePath.trim());
    const isFileExists = existsSync(fullPath);

    if (!isFileExists) {
      throw new Error(`Файл **${getFileName(filePath)}** — не существует!`);
    }

    const fileReader = new TSVOfferFileReader(fullPath);

    fileReader.on(EventName.LINE_READ, this.onReadLine);
    fileReader.on(EventName.FILE_READ, this.onReadFile);

    fileReader.read();
  }

  public async execute([filePath, mongoUri, salt]: string[]) {
    if (!filePath || !mongoUri || !salt) {
      this.logger.error('⚠️ Укажите необходимые параметры!');
      return;
    }

    this.salt = salt;
    await this.databaseClient.connect(mongoUri);

    try {
      this.import(filePath);
    } catch (error: unknown) {
      this.logger.error(error, `Не удалось загрузить файл с указанием пути: ${filePath}`);
    }
  }
}
