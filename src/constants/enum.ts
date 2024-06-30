export enum UserVerifyStatus {
  Unverified = 0, // Default, chưa xác thực email
  Verified, // đã xác thực email
  Banned // bị khóa
}

export enum MediaType {
  Image,
  Video
}

export enum TweetType {
  Tweet = 0,
  Retweet = 1,
  Comment = 2,
  QuoteTweet = 3
}

export enum TweetAudience {
  Everyone = 0,
  TwitterCircle = 1
}
