import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
@Injectable()
export class QueryService {
  query(model, queryStringObj) {
    const queyr = model.find();
    // this.filter(queyr, queryStringObj);
  }

  // filter(query, queryStringObj) {
  //   const queryObjCopy = { ...queryStringObj };

  //   const excludeFields = ['sort', 'limit', 'page', 'fields'];
  //   excludeFields.forEach((f) => delete queryObjCopy[f]);

  //   const newQueryStr = JSON.stringify(queryObjCopy).replace(
  //     /\b(gte|gt|lte|lt)\b/g,
  //     (match) => `$${match}`,
  //   );
  //   query = query.find(JSON.parse(newQueryStr));
  //   return query;
  // }
}
