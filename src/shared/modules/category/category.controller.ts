import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/common.js';

import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { CategoryService } from './category-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { Component } from '../../types/index.js';
import { CategoryRdo } from './rdo/category.rdo.js';

@injectable()
export class CategoryController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CategoryService)
    protected readonly categoryService: CategoryService
  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для CategoryController…');

    this.addRoute({ path: '/id/:id', method: HttpMethod.Get, handler: this.findById });
  }

  public async findById({ params }: Request, res: Response) {
    const offer = await this.categoryService.findByCategoryId(params.id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Категория ${params.id} не найдена.`,
        'CategoryService'
      );
    }

    this.ok(res, fillDTO(CategoryRdo, offer));
  }
}
