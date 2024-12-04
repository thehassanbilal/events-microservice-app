import { Model, PipelineStage } from 'mongoose';

import { PaginationDto } from 'src/global/pagination.dto';

export async function paginateWithMongoose<T>(
  model: Model<T>,
  { page, limit, sort, filter }: PaginationDto,
  query: object = {},
) {
  page = Math.max(1, page || 1);
  limit = Math.max(1, Math.min(100, limit || 10));
  const skip = (page - 1) * limit;

  const queryBuilder = model.find(query);

  if (sort) {
    queryBuilder.sort(sort);
  }

  if (filter) {
    queryBuilder.where('name').regex(new RegExp(filter, 'i'));
  }

  const records = await queryBuilder.skip(skip).limit(limit).exec();
  const totalRecords = await model.countDocuments(query).exec();
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    pagination: {
      page,
      limit,
      totalRecords,
      totalPages: totalPages,
      records,
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
