import path from 'path';
import fs from 'fs';
import mime from 'mime';
import aws from 'aws-sdk';

import uploadConfig from '../config/upload.js';


export default class S3Storage {
  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    })
  }

  async saveFile(filename) {
    const originalPath = path.resolve(uploadConfig.directory, filename)
    const ContentType = mime.getType(originalPath)

    if (!ContentType) {
      throw new Error('File not found')
    }

    const fileContent = await fs.promises.readFile(originalPath)

    this.client.putObject({
      Bucket: 'ibichos-images',
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    })
    .promise();

    await fs.promises.unlink(originalPath)
  }
}
