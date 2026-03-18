# Edge AI Automotive Product Map

以互動式資訊地圖整理車用電子 Edge AI 產品版圖，涵蓋 ADAS、智慧座艙、IVI、電動車能源管理與底盤安全等領域，並串接 AI 應用、端側推論方式與代表性晶片平台。

## Features

- 依產品類別瀏覽車用電子 Edge AI 方案
- 以搜尋、分類與優先級快速篩選內容
- 使用 URL query 保留當前探索狀態，方便分享
- 以 schema 驗證資料結構，便於後續接 CMS 或 API
- 以 Next.js 靜態匯出，適合部署到 GitHub Pages

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Vitest
- Playwright

## Local Development

```bash
npm install
npm run dev
```

開啟 `http://127.0.0.1:3000` 即可查看網站。

## Production Build

```bash
npm run build
```

靜態輸出會產生在 `out/`。

## GitHub Pages

此專案包含 GitHub Actions workflow，推送到 `main` 後會自動建置並部署到 GitHub Pages。
