# Lloyd Moore Personal Website

This is a Jekyll-based personal website hosted on GitHub Pages for Lloyd Moore. The site serves as a professional portfolio, showcasing Lloyd's CV and blog posts.

## Project Structure

- **`_config.yml`**: Jekyll configuration file
- **`_posts/`**: Directory containing blog posts in Markdown format
- **`assets/`**: Directory for static assets
  - **`css/`**: CSS stylesheets
  - **`images/`**: Image files
- **`blog.md`**: Blog listing page
- **`CNAME`**: Custom domain configuration for GitHub Pages
- **`cv.md`**: CV page wrapper that includes the full CV content
- **`index.md`**: Homepage
- **`lloyd.md`**: The main CV content

## Technology Stack

- **Jekyll**: Static site generator
- **GitHub Pages**: Hosting platform
- **GitHub Actions**: CI/CD for automatic deployment

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the master branch. The deployment is handled by the GitHub Actions workflow defined in `.github/workflows/jekyll-gh-pages.yml`.

## Local Development

To run the site locally:

1. Install Jekyll and its dependencies
2. Run `bundle exec jekyll serve`
3. Visit `http://localhost:4000` in your browser

## Custom Domain

The site is configured to use the custom domain `lloydmoore.com` as specified in the CNAME file.