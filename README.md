# フィールズ南柏

This is a code bundle for フィールズ南柏. The original project is available at https://www.figma.com/design/jOw3MyBtULLYnYiuXcEZqk/%E3%83%95%E3%82%A3%E3%83%BC%E3%83%AB%E3%82%BA%E5%8D%97%E6%9F%8F.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Run with Docker

```bash
docker compose up --build
```

Open `http://localhost:5173` in your browser.

Stop containers:

```bash
docker compose down
```

## Image directories

- `src/assets/images`: React/TypeScript から `import` して使う画像
- `public/images`: URL 直指定で使う固定画像（例: `/images/logo.png`）
- WordPress の投稿画像: WP メディア（`wp-content/uploads`）を API の URL で表示
