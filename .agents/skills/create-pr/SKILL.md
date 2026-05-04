# create-pr skill

PR を作成するときはこの手順に従え。推測で動くな。必ず各ステップの出力を確認してから次へ進め。

---

## Step 1: 前提確認

```bash
# 現在のブランチが main でないことを確認
git branch --show-current

# main との差分コミットを確認
git log main..HEAD --oneline

# 未コミットの変更がないことを確認
git status
```

- ブランチ名が `feature/`, `fix/`, `chore/`, `docs/` で始まっていなければユーザーに警告する
- コミットがゼロなら「コミットしてから実行してください」と伝えて止める
- 未コミット変更があればユーザーに確認する

---

## Step 2: PR タイトルを決定する

コミット履歴を見てタイトルを **Conventional Commits 形式** で生成する。

```
<type>(<scope>): <summary>
```

- type は `feat` / `fix` / `docs` / `chore` / `refactor` / `perf` / `test` / `ci` のいずれか
- scope はブランチ名 or 変更対象の機能名（省略可）
- summary は英語小文字で始める、100文字以内

例: `feat(auth): add Google OAuth login`

---

## Step 3: PR 本文を生成する

`.github/pull_request_template.md` のテンプレートに従って本文を生成する。

- **概要**: `git log main..HEAD --oneline` と `git diff main..HEAD --stat` から要約
- **変更内容**: 主な変更点を箇条書き（詳細すぎなくていい）
- **動作確認**: チェックボックスはそのまま残す（レビュアーが確認するため）
- **スクリーンショット**: UI変更がなければセクションごと削除
- **関連 Issue**: わかれば追記、不明なら削除

---

## Step 4: リモートへ push する

```bash
git push -u origin HEAD
```

push 失敗したらエラーをそのまま表示してユーザーに伝える。force push は絶対にしない。

---

## Step 5: PR を作成する

```bash
gh pr create \
  --title "<Step2 で決めたタイトル>" \
  --body "$(cat <<'EOF'
<Step3 で生成した本文>
EOF
)" \
  --base main
```

- draft フラグは付けない（ハッカソンは時間がないのでレビュー可能な状態で出す）
- PR 作成後、URL をユーザーに表示する

---

## Step 6: 完了報告

以下の形式で報告する:

```
PR作成完了
URL: <PR URL>
タイトル: <タイトル>
base: main ← <現在のブランチ名>
```

---

## 注意事項

- `main` ブランチから直接 PR を作ろうとしたら止める
- CI が `.github/workflows/ci.yml` で動くことをユーザーに伝える（自動で回る）
- `gh` コマンドが使えない場合は `gh auth login` を案内する
