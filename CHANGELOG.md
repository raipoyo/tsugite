# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added

- Prettier + eslint-config-prettier を導入。コードフォーマットを自動化し、スタイル議論をゼロにする
- Husky + lint-staged によるpre-commitフック。コミット時にステージングファイルを自動フォーマット＆lint
- commitlint によるConventional Commits強制。チーム間のコミットメッセージを統一する
- ディレクトリ構成を確立 (`components/ui/`, `features/`, `lib/`, `hooks/`, `types/`)
- `CONTRIBUTING.md` を作成。ブランチ戦略・コミット規約・PR ルール・コーディング規約を定義
- `AGENTS.md` にプロジェクトルールを追記。AI エージェントがプロジェクト規約に従って動作するよう設定
