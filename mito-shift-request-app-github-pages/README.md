# 水戸赤塚店 希望休フォーム

GitHub Pagesで公開できる、スタッフ向け希望休フォームです。

## ファイル構成

- `public/index.html`: フォーム画面
- `public/config.js`: 原案CSVと送信先URLの設定
- `public/shift.csv`: 公開するシフト原案
- `docs/`: GitHub Pages公開用フォルダ
- `apps-script.gs`: Googleスプレッドシートに提出を保存するApps Script
- `server.js`: ローカル確認用サーバー

## GitHub Pagesで公開する手順

1. GitHubで新しいリポジトリを作成します。
2. このフォルダ一式をリポジトリへアップロードします。
3. Settings → Pages を開き、Branchを `main`、Folderを `/docs` にして公開します。
4. 表示されたGitHub Pages URLをスタッフへ共有します。

## 提出内容をGoogleスプレッドシートへ保存する手順

1. Googleスプレッドシートを新規作成します。
2. 拡張機能 → Apps Script を開きます。
3. `apps-script.gs` の内容を貼り付けて保存します。
4. デプロイ → 新しいデプロイ → 種類「ウェブアプリ」を選びます。
5. 実行ユーザーは自分、アクセスできるユーザーは「全員」にします。
6. 発行されたウェブアプリURLを `docs/config.js` と `public/config.js` の `submitEndpoint` に入れます。
7. `config.js` をGitHubに反映します。

## シフト原案を差し替える

`docs/shift.csv` と `public/shift.csv` を新しい月の原案CSVに差し替えます。列は以下を維持してください。

```csv
月,日,曜日,9:15〜13:00,13:00〜16:45,16:45〜20:30,,,,
```
