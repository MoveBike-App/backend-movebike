import * as dotenv from 'dotenv'
dotenv.config()

export default {
  s3: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION,
    httpOptions: {
      timeout: 90000
    },
    Conditions: [
      ['content-length-range', 0, 1048576 * 10], // (up to 1 MB) * 10
      ['starts-with', '$Content-Type', 'image/'] // tried this
    ],
    params: {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET_NAME,
      ContentType: 'image/webp'
    }
  }
}
