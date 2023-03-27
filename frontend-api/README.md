# thc-challenge-api-js

REST api for THC frontend challenge

## Setup

```
# Create config files
bash setup-config.sh

# Start the server
node index.js --port 7070
```

## API Docs

### POST /v1/auth/signup

**Request Body**
- `username<String>` - unique username, allowed chars: `A-Z`, `0-9`, `_.-`
- `email<String>` - unique email
- `password<String>` - plaintext password, requires at least one uppercase character and at least one digit

**Response**
- `token<String>` - JWT token
- `expire<Integer>` - token expire time in seconds

**Example**
```
# request
curl --request POST 'http://127.0.0.1:7070/v1/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "john.doe",
  "email": "mail@example.com",
  "password": "FooBar123"
}'

# response
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzE2NTUyNzU1NzcsInN1YiI6IjYxNDExNTZiMzFmYjgyZWRmYjRkZjlhMiJ93REYW7x_MhxvkcSWSUJgI0HEbdnei2Tym46AranMn0M",
  "expire": 3600
}
```

### POST /v1/auth/login

**Request Body**
- `username<String>` - username or email
- `password<String>` - plaintext password

**Response**
- `token<String>` - JWT token
- `expire<Integer>` - token expire time in seconds

**Example**
```
# request
curl --request POST 'http://127.0.0.1:7070/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "mail@example.com",
  "password": "FooBar123"
}'

# response
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzE2NTUyNzU1NzcsInN1YiI6IjYxNDExNTZiMzFmYjgyZWRmYjRkZjlhMiJ93REYW7x_MhxvkcSWSUJgI0HEbdnei2Tym46AranMn0M",
  "expire": 3600
}
```

### GET /v1/auth/info

**Request Headers**
- `Authorization<String>` - bearer token retrieved through login/signup

**Response**
- `email<String>` - authenticated user email
- `username<String>` - authenticated user username

**Example**
```
# request
curl --request GET 'http://127.0.0.1:7070/v1/auth/info' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzE2NTUyODY5NjUsInN1YiI6IjYxNDExNTZiMzFmYjgyZWRmYjRkZjlhMiJ9.HXHcwB01f0XB_eb8129YpdnyoN_6kk9SBGcvc18pI1Q'

# response
{
  "email": "mail@example.com",
  "username": "john.doe"
}
```

### GET /v1/products

**Request Headers**
- `Authorization<String>` - bearer token retrieved through login/signup

**Query Params**
- `page<Integer?>` - optional, page to fetch, default 1
- `perPage<Integer?>` - optional, items per page, default 10

**Response**
- `page<Integer>` - page fetched
- `pages<Integer` - total pages
- `perPage<Integer>` - items per page
- `total<Integer>` - total items
- `items<Array<Object>>` - products
  - `0<Object>`
    - `id<String>` - product id
    - `title<String>` - product title
    - `desc<String>` - product description
    - `price<Number>` - product price
    - `qty<Number>` - product stock quantity

**Example**
```
# request
curl --request GET 'http://127.0.0.1:7070/v1/products?page=2&perPage=5' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzE2NTgxNjI2NjMsInN1YiI6IjYxNDEyMGFlMTM0M2ViMWMzYjNhM2U1OSJ9.C6Vatyqf4UJ7AAnGy3IGJnwQSrdOxVKQQSDrsJDrOPw'

# response
{
  "page": "2",
  "pages": 4,
  "perPage": "5",
  "total": 18,
  "items": [
    {
      "id": "614124dea1e3c46f2e0e8176",
      "title": "book 1",
      "desc": "book desc",
      "price": 13.6,
      "qty": 3
    },
    ...
  ]
}
```

### POST /v1/products

**Request Headers**
- `Authorization<String>` - bearer token retrieved through login/signup

**Request Body**
- `title<String>` - product title
- `desc<String>` - product description
- `price<Number>` - product price
- `qty<Number>` - product stock quantity

**Response**
- `id<String>` - product id
- `title<String>` - product title
- `desc<String>` - product description
- `price<Number>` - product price
- `qty<Number>` - product stock quantity

**Example**
```
# request
curl --request POST 'http://127.0.0.1:7070/v1/products' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzE2NTgxNjI2NjMsInN1YiI6IjYxNDEyMGFlMTM0M2ViMWMzYjNhM2U1OSJ9.C6Vatyqf4UJ7AAnGy3IGJnwQSrdOxVKQQSDrsJDrOPw' \
--header 'Content-Type: application/json' \
--data-raw '{
  "title": "book 1",
  "desc": "book desc",
  "price": 13.6,
  "qty": 3
}'

# response
{
  "id": "614124e6a1e3c46f2e0e819a",
  "title": "book 1",
  "desc": "book desc",
  "price": 13.6,
  "qty": 3
}
```

### GET /v1/products/:id

**Request Headers**
- `Authorization<String>` - bearer token retrieved through login/signup

**Response**
- `id<String>` - product id
- `title<String>` - product title
- `desc<String>` - product description
- `price<Number>` - product price
- `qty<Number>` - product stock quantity

**Example**
```
# request
curl --request GET 'http://127.0.0.1:7070/v1/products/614124e6a1e3c46f2e0e819a' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzE2NTgxNjI2NjMsInN1YiI6IjYxNDEyMGFlMTM0M2ViMWMzYjNhM2U1OSJ9.C6Vatyqf4UJ7AAnGy3IGJnwQSrdOxVKQQSDrsJDrOPw'

# response
{
  "id": "614124e6a1e3c46f2e0e819a",
  "title": "book 1",
  "desc": "book desc",
  "price": 13.6,
  "qty": 3
}
```

### PATCH/PUT /v1/products/:id

**Request Headers**
- `Authorization<String>` - bearer token retrieved through login/signup

**Request Body**
- `title<String?>` - optional, product title
- `desc<String?>` - optional, product description
- `price<Number?>` - optional, product price
- `qty<Number?>` - optional, product stock quantity

**Response**
- `id<String>` - product id
- `title<String>` - product title
- `desc<String>` - product description
- `price<Number>` - product price
- `qty<Number>` - product stock quantity

**Example**
```
# request
curl --request PATCH 'http://127.0.0.1:7070/v1/products/614124e6a1e3c46f2e0e819a' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzE2NTgxNjI2NjMsInN1YiI6IjYxNDEyMGFlMTM0M2ViMWMzYjNhM2U1OSJ9.C6Vatyqf4UJ7AAnGy3IGJnwQSrdOxVKQQSDrsJDrOPw' \
--header 'Content-Type: application/json' \
--data-raw '{
  "title": "book 2",
  "desc": "book desc 2"
}'

# response
{
  "id": "614124e6a1e3c46f2e0e819a",
  "title": "book 1",
  "desc": "book desc",
  "price": 13.6,
  "qty": 3
}
```

### DELETE /v1/products/:id

**Request Headers**
- `Authorization<String>` - bearer token retrieved through login/signup

**Response**
- `Boolean`

**Example**
```
# request
curl --request DELETE 'http://127.0.0.1:7070/v1/products/614120ce1343eb1c3b3a3e61' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzE2NTgxNjI2NjMsInN1YiI6IjYxNDEyMGFlMTM0M2ViMWMzYjNhM2U1OSJ9.C6Vatyqf4UJ7AAnGy3IGJnwQSrdOxVKQQSDrsJDrOPw'

# response
true
```
