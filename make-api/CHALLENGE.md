# Thrive Make challenge

The purpose of this challenge is to implement a make scenario based on the requirements depicted below.

- Scenario should fetch it's configuration from a data store that has the following data structure:
  - Scenario Id: number
  - Environment: text - json object that stores the configuration
- Scenario should implement the following workflow:
  - Search today's top 10 latests posts from api make-challenge.thrivecoin.com
  - For each found post list the users who liked it
  - For every listed user reward them once per day with 5 tokens if they meet the following criteria:
    - they have MATIC testnet balance above 0 MATIC
- Rewards are done by simply storing entries in a google sheet with the following columns:
  - Insertion time - specifies the date then the row is inserted
  - User Address
  - Amount of tokens
- For checking matic balance you can use https://docs.polygonscan.com/ on testnet
- Google sheet document id and sheet name should be fetched from Environment in data store that corresponds to current scenario
- Scenario should have few operations executed, ideally 30, but at most 40 operations


## API Docs

Base url for thrive api is: `https://make-challenge.thrivecoin.com`

All requests are authenticated and require `Authorization` header with this value: `85b53ca0a065`

### Endpoints

#### GET api/v1/posts
This endpoint is used to retrieve the posts and has two query parameters:
- `since <Number>` - Unix timestamp in milliseconds, specifies filter for post timestamps
- `limit <Number>` - Optional limit of entries that will be returned, default is 20

The response is in this format:
- `Array <Object>` - List of posts
  - `0 <Object>` - Post entry
    - `userId <Number>` - Owner of the post
    - `id <Number>` - Post id
    - `title <String>` - Post tile
    - `body <String>` - Post content
    - `ts <Number>` - Timestamp in unix milliseconds when post is created

Sample request:
```
GET https://make-challenge.thrivecoin.com/api/v1/posts?since=1679875200000
```

Sample response:
```
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    "ts": 1679950584499
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    "ts": 1679950584499
  },
  ...
]
```

#### GET api/v1/posts/:id/likes
This endpoint returns the users who liked the post and has these path parameters:
- `id <Number>` - Post id

The response is in this format:
- `Array <Object>` - List of users
  - `0 <Object>` - User entry
    - `id <Number>` - User id
    - `name <String>` - User name
    - `wallet <String>` - User's wallet address

Sample request:
```
GET https://make-challenge.thrivecoin.com/api/v1/posts/2/likes
```

Sample response:
```
[
  {
    "id": 3,
    "name": "avery",
    "wallet": "0xC24dbDbbaa64E21C0a8450b1919eb9051765905C"
  },
  {
    "id": 4,
    "name": "sadie",
    "wallet": "0x822F83d6a32677Ec2Af1dE45E7943c16f4176012"
  }
]
```
