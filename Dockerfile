FROM node:22-slim

WORKDIR /app

# パッケージ管理ファイルのコピー（キャッシュ利用のため）
COPY package.json package-lock.json* ./

# 依存関係のインストール
RUN npm install

# 全ファイルのコピー
COPY . .

# 開発サーバーの起動
CMD ["npm", "run", "dev"]
