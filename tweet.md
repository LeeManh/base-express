# Flow create tweet

Body of request create tweet

```ts
interface TweetRequestBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string //  chỉ null khi tweet gốc, không thì là tweet_id cha dạng string
  hashtags: string[] // tên của hashtag dạng ['javascript', 'reactjs']
  mentions: string[] // user_id[]
  medias: Media[]
}
```

### Validate Tweet body

- `type` phải là 1 trong 4 loại `TweetType`
- `audience` phải là 1 trong 2 loại `TweetAudience`
- Nếu `type` là retweet, comment, quotetweet thì `parent_id` phải là `tweet_id` của tweet cha, nếu `type` là tweet thì `parent_id` phải là `null`
- Nếu `type` là retweet thì `content` phải là `''`. Nếu `type` là comment, quotetweet, tweet và không có `mentions` và `hashtags` thì `content` phải là string và không được rỗng.
- `hashtags` phải là mảng các string
- `mentions` phải là mảng các string dạng id
- `medias` phải là mảng các `Media`
