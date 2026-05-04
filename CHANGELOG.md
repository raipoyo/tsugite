# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added

- `@clerk/nextjs` と `middleware.ts` による認証。`/shop/*`、`/successor/*`、`/register/*`、`/onboarding/*` をログイン必須にし、`publicMetadata.role`（`shop` / `successor`）でコンソールを分岐
- ランディングとマーケ用 `app/(marketing)/`（共通ヘッダ／フッタ）、募集一覧・詳細（`lib/mock-opportunities.ts`）、法務ドラフト（`/terms` `/privacy` `/contact`）
- 店／継ぎ手フロー：`/onboarding/role`、プロフィールフォーム（`/register/shop` `/register/successor`、Clerk `publicMetadata` に簡易保存）、各ダッシュボード・募集管理 UI（モック中心）
- UI プリミティブ `components/ui/`（`button` `container` `card`）と `app/not-found.tsx` / `app/error.tsx`
- ルートレイアウトに `ClerkProvider`、`lang="ja"`、サイト用 `metadata`
- `.env.example` に Clerk 関連キーとサインイン後 URL の雛形を追加
- `hono` を導入。`app/api/[[...route]]/route.ts` のキャッチオールルートにマウントし、Next.js Route Handler 経由で Vercel にデプロイできる構成にした。動作確認用に `GET /api/health` を追加
- Prettier + eslint-config-prettier を導入。コードフォーマットを自動化し、スタイル議論をゼロにする
- Husky + lint-staged によるpre-commitフック。コミット時にステージングファイルを自動フォーマット＆lint
- commitlint によるConventional Commits強制。チーム間のコミットメッセージを統一する
- ディレクトリ構成を確立 (`components/ui/`, `features/`, `lib/`, `hooks/`, `types/`)
- `CONTRIBUTING.md` を作成。ブランチ戦略・コミット規約・PR ルール・コーディング規約を定義
- `AGENTS.md` にプロジェクトルールを追記。AI エージェントがプロジェクト規約に従って動作するよう設定
- `.github/workflows/ci.yml` を追加。PRとmainへのpushでtypecheck・lint・format check・buildを自動実行
- `.github/pull_request_template.md` を追加。PRの概要・変更内容・動作確認チェックリストを標準化
- `.claude/skills/create-pr/SKILL.md` を追加。プロジェクト規約に沿ったPR作成をAIに行わせるプロジェクトレベルskill
- `flake.nix` を追加。Nix flakes で bun / git / gh を管理し、OS問わず開発環境を再現可能にする
- `flake.lock` を生成。nixpkgs `15f4ee4` (2026-04-30) にピン留め
- `.envrc` を追加。direnv 対応で `cd` するだけで dev shell が自動有効化される
- `.gitignore` に `.direnv/` と `result` を追加
- `CONTRIBUTING.md` に Nix セットアップ手順（`nix develop` / direnv 両方）を追記
- `README.md` を整備。プロジェクト概要・tech stack・セットアップ手順・コマンド一覧・ディレクトリ構成を記載

### Changed

- 旧 `app/page.tsx`（create-next-app のまま）を撤去し、`app/(marketing)/page.tsx` に差し替え
- `README.md` に Clerk、主要ルート表、環境変数セットアップを追記
