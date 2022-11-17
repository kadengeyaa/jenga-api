# SETUP

Add .editorconfig file for vscode

Initialise node project

```
yarn init
```

## Create src folder and src/app.ts, src/types/index.ts files

app.ts file is entry point of the application

# LINTING

Linting is important as it ensures that code is standardized

Run the command to install linting dependencies

```
yarn add --dev typescript eslint prettier tslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier
```

Create .eslintrc, .prettierrc .eslintignore tsconfig.json files

# TYPES

Add typings

Run

```
yarn add --dev @types/node @types/mongoose @types/agenda @types/express @types/jest @types/lodash
```

# TESTS

Add ts-jest jest for test environment

Run

```
yarn add --dev ts-jest jest
```

# RUNNING

Add the following devtools

Run

```
yarn add --dev husky lint-staged ts-node
```

Add jest.config.js, .lintstagedrc, nodemon.json files

Make changes to package.json scripts and hooks

# ENVIRONMENT

Add .env file

```

```

# PRODUCTION

Add ecosystem.config.js file (Read more from PM2 documentation)

```
exports.apps = [
  {
    name: ?, // name of the process
    script: './build/app.js',
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '4G',
    node_args: '--max_old_space_size=4096',
  },
];
```

To start

```
yarn serve
```

To stop

```
yarn stop
```

# DEPLOYMENT

```
docker stop server && docker rm server
```

```
docker build -t server .
```

```
docker run -d --name server -p 8080:8080 server
```

```
docker logs -f server
```
