import { Model, PipelineStage } from 'mongoose';

import { SortOrder } from 'mongoose';

interface PaginationParams {
  page: number;
  limit: number;
  sort?:
    | string
    | { [key: string]: SortOrder | { $meta: any } }
    | [string, SortOrder][];
  filter?: string;
}

export async function paginateWithMongoose<T>(
  model: Model<T>,
  { page, limit, sort, filter }: PaginationParams,
  query: object = {},
) {
  page = Math.max(1, page);
  limit = Math.max(1, Math.min(100, limit));
  const skip = (page - 1) * limit;

  const queryBuilder = model.find(query);

  if (sort) {
    queryBuilder.sort(sort);
  }

  if (filter) {
    queryBuilder.where('name').regex(new RegExp(filter, 'i'));
  }

  const data = await queryBuilder.skip(skip).limit(limit).exec();
  const total = await model.countDocuments(query).exec();

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function aggregatePaginate(
  model: Model<any>,
  pipeline: PipelineStage[],
  page = 1,
  limit = 10,
) {
  const numLimit = Math.max(Number(limit), 1);
  const numPage = Math.max(Number(page), 1);

  const result = await model
    .aggregate([
      ...pipeline,
      {
        $facet: {
          totalCount: [{ $count: 'total' }],
          paginatedResults: [
            { $skip: (numPage - 1) * numLimit },
            { $limit: numLimit },
          ],
        },
      },
    ])
    .then((result) => {
      let totalCount = 0;
      let paginatedResults = [];

      if (result[0]?.totalCount?.[0]) {
        totalCount = result[0].totalCount[0].total;
      }
      if (result[0]?.paginatedResults) {
        paginatedResults = result[0].paginatedResults;
      }

      const totalPages = Math.ceil(totalCount / numLimit);
      const currentPage = numPage;

      return {
        totalCount,
        list: paginatedResults,
        totalPages,
        currentPage,
      };
    });

  return result;
}