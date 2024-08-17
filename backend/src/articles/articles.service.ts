import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import { Model } from 'mongoose';
import {
  ErrorBuilder,
  ErrorMethod,
  RequestAction,
} from 'src/app/common/utils/error.util';

@Injectable()
export class ArticlesService {
  private readonly errorBuilder = new ErrorBuilder('Article', 'Articles');

  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const articleDoc = new this.articleModel(createArticleDto);
      const article = await articleDoc.save();
      return article.toObject();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.duplicated, {
            action: RequestAction.create,
          }),
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Article[]> {
    const article = await this.articleModel.find().lean();
    return article;
  }

  async findOne(id: string): Promise<Article> {
    try {
      const article = await this.articleModel.findById(id).lean();
      if (!article) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      return article;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    try {
      const exists = this.articleModel.exists({ _id: id });
      if (!exists) {
        throw new NotFoundException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      const options = { new: true };
      const article = await this.articleModel
        .findByIdAndUpdate(id, updateArticleDto, options)
        .lean();
      return article;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.duplicated, {
            action: RequestAction.update,
          }),
        );
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Article> {
    try {
      const article = await this.articleModel.findByIdAndDelete(id).lean();
      if (!article) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      return article;
    } catch (error) {
      throw error;
    }
  }
}
