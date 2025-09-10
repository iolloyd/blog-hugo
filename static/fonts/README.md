# Font Files

## Inter Variable Font

To complete the typography enhancement, download the Inter variable font:

1. Download Inter from: https://github.com/rsms/inter/releases
2. Extract `Inter.var.woff2` from the download
3. Rename it to `inter-var.woff2`
4. Place it in this directory (`/assets/fonts/`)

### Why Inter?
- Excellent readability on screens
- Variable font (single file, multiple weights)
- Optimized for UI/UX
- Small file size (~50KB)
- Free and open source

### Alternative: Use Google Fonts CDN
If you prefer not to self-host, you can use the Google Fonts CDN by adding this to the `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

However, self-hosting is recommended for:
- Better performance (one less domain to connect to)
- Privacy (no Google tracking)
- Reliability (no dependency on external services)