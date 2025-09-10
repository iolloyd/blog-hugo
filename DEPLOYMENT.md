# Hugo Site Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `blog-hugo` (or any name you prefer)
3. Description: "Professional engineering blog built with Hugo - migrated from Jekyll"
4. Set to **Public**
5. **Do not** initialize with README (we already have files)
6. Click "Create repository"

## Step 2: Push to GitHub

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/blog-hugo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Set up Cloudflare Pages

1. Go to https://dash.cloudflare.com/
2. Click "Pages" in the left sidebar
3. Click "Connect to Git"
4. Connect your GitHub account if not already connected
5. Select your `blog-hugo` repository
6. Configure build settings:
   - **Build command**: `hugo --minify`
   - **Build output directory**: `public`
   - **Root directory**: `/` (leave empty)
   - **Environment variables**: 
     - `HUGO_VERSION` = `0.150.0`

## Step 4: Deploy

1. Click "Save and Deploy"
2. Cloudflare Pages will automatically build and deploy your site
3. You'll get a `*.pages.dev` URL for your site
4. Later, you can add your custom domain `lloydmoore.com`

## Build Settings Summary

- **Framework preset**: Hugo
- **Build command**: `hugo --minify`
- **Output directory**: `public`
- **Hugo version**: `0.150.0`

## Custom Domain (Optional)

Once deployed, you can add your custom domain:
1. In Cloudflare Pages, go to your project
2. Click "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter `lloydmoore.com`
5. Follow the DNS setup instructions

Your Hugo site will build automatically on every git push!