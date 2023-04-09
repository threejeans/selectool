export const s3Config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME ?? 'selectool2022-bucket',
  region: process.env.REACT_APP_REGION ?? 'ap-northeast-2',
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID ?? 'env-error',
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY ?? 'env-error',
}
