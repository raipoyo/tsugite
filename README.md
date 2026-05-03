# TSUGITE

## — 小さくなる伝統に、新たな継ぎ手を —

---

## 概要

日本各地で受け継がれてきた伝統技術・文化は、後継者不足により急速に失われつつある。**TSUGITE** は、そうした「伝統の担い手（継ぎ手）」と次世代をつなぐWebプラットフォームだ。

## Tech Stack

| カテゴリ             | 技術                             |
| -------------------- | -------------------------------- |
| フレームワーク       | Next.js 16 (App Router)          |
| UI                   | React 19                         |
| 言語                 | TypeScript 5（strict）           |
| スタイリング         | Tailwind CSS v4                  |
| パッケージマネージャ | Bun                              |
| 開発環境管理         | Nix flakes                       |
| Linter / Formatter   | ESLint 9 + Prettier 3            |
| Git フック           | Husky + lint-staged + commitlint |
| バックエンド         | Hono 4                           |
| CI/CD                | GitHub Actions                   |

## セットアップ

### 推奨: Nix + direnv（環境が自動で揃う）

```bash
# 1. Nix をインストール（未導入の場合）
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install

# 2. direnv をインストール
brew install direnv nix-direnv

# 3. シェルフックを追加（zsh の場合）
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc && source ~/.zshrc

# 4. プロジェクトで許可
cd tsugite
direnv allow   # ← これ以降は cd するだけで dev shell が有効になる

# 5. 依存関係インストール → 開発サーバー起動
bun install
bun dev        # → http://localhost:3000
```

### Nix なし（bun のみ）

```bash
bun install
bun dev
```

## コマンド

| コマンド        | 内容             |
| --------------- | ---------------- |
| `bun dev`       | 開発サーバー起動 |
| `bun run build` | 本番ビルド       |
| `bun start`     | 本番サーバー起動 |
| `bun run lint`  | ESLint 実行      |

## ディレクトリ構成

```
app/                   # Next.js App Router ルート
app/(routes)/          # アプリのルートグループ
app/api/[[...route]]/  # Hono エントリーポイント（全 API リクエストをここで受ける）
components/ui/         # 再利用可能な UI プリミティブ
features/<name>/       # 機能モジュール（components / hooks / utils / types / api）
lib/                   # グローバルユーティリティ・API クライアント・定数
hooks/                 # グローバルカスタムフック
types/                 # グローバル型定義
```

## API

バックエンドは [Hono](https://hono.dev/) を Next.js の Route Handler にマウントする構成。`/api/*` 以下のリクエストが全て Hono に流れる。

```ts
// ルートの追加例（features/<name>/api.ts）
export const exampleRoute = new Hono().get('/', (c) => c.json({ message: 'hello' }))

// app/api/[[...route]]/route.ts でマウント
app.route('/example', exampleRoute)
// → GET /api/example
```

動作確認用エンドポイント：

```bash
curl http://localhost:3000/api/health
# → { "status": "ok" }
```

## 環境変数

`.env.local` を使用（`.gitignore` で除外済み）。チームメンバーから直接共有を受けること。キーの一覧は `.env.example` を参照。

## Contributing

詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照。

- **ブランチ**: `feature/<desc>` / `fix/<desc>` / `chore/<desc>` — `main` への直接 push 禁止
- **コミット**: [Conventional Commits](https://www.conventionalcommits.org/) 形式を commitlint が強制
- **PR**: 1機能・1修正単位で、Squash merge

## License

TBD
