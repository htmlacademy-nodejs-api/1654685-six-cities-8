import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/common.js';

import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { CommentService } from './comment-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { Component } from '../../types/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService)
    protected readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для CommentController…');

    this.addRoute({ path: '/id/:id', method: HttpMethod.get, handler: this.findById });
  }

  public async findById({ params }: Request, res: Response) {
    const offer = await this.commentService.findByOfferId(params.id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Комментарии к предложению №${params.id} не найдены.`,
        'CommentService'
      );
    }

    this.ok(res, fillDTO(CommentRdo, offer));
  }
}
