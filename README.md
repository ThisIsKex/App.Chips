# CHIPS

**C**ollaborative **H**andling of **I**ndividual **P**ayments and **S**plitting


## Frontend setup

```sh
cd frontend
```

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Backend setup

```sh
cd backend
```

```sh
uv sync
```

### Run for development

```sh
uv run fastapi dev
```

Attention: Will not ramp up because region for DynamoDB is missing

## Deployment

TBD
