import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  getUpdatedDoc(oldDoc: any, newDoc: any) {
    Object.keys(newDoc).forEach((key) => {
      oldDoc[key] = newDoc[key];
    });
    return oldDoc;
  }
}
