# GraphQL Mongo API

Building API using GraphQL and Mongo for database

## Installation

Clone the repository then install `node_modules`

```bash
git clone git@github.com:benedictpmateo/graphql-mongo-api.git

cd graphql-mongo-api

npm install
```

Then setup `.env` using `.env.example`

```env
ENV=development
PORT=3000

MONGODB_URI=mongodb://localhost:27017/{database}
```

## Usage

```python
# Build and run server
npm run start

# Hot reload for development mode
npm run dev
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/benedictpmateo/graphql-mongo-api/blob/master/LICENSE)