# Single-Deploy Architecture: Serving Frontend and Backend Together with SQLite

In the world of modern web development, we often find ourselves managing separate deployments for our frontend and backend applications. While this separation has its merits for large-scale applications, many projects would benefit from a simpler, unified deployment approach. In this post, I'll show you how to bundle your frontend build with your backend server and deploy them as a single unit, with SQLite as the perfect database companion.

## Why Unified Deployment?

The traditional approach of deploying frontend to a CDN and backend to a separate server adds complexity that isn't always necessary. For many applications, especially those in the small to medium range, a unified deployment offers several compelling advantages:

- **Simplified Infrastructure**: One server, one deployment pipeline, one monitoring setup
- **No CORS Configuration**: Frontend and backend share the same origin
- **Cost-Effective**: Single server/container instead of multiple services
- **Reduced Latency**: No cross-origin requests means faster API calls
- **Easier Local Development**: Mirrors production architecture

## Architecture Overview

The concept is straightforward: your backend server handles both API routes and serves static frontend assets. Here's how requests are typically routed:

- `/api/*` → Backend API handlers
- `/assets/*` → Static asset files (JS, CSS, images)
- `/*` → Serve the main index.html (for client-side routing)

```
┌─────────────┐     ┌──────────────────────────┐
│   Browser   │────▶│      Web Server          │
└─────────────┘     │                          │
                    │  /api/* → API Handlers   │
                    │  /assets/* → Static Files│
                    │  /* → index.html         │
                    │                          │
                    │  ┌────────────────────┐  │
                    │  │   SQLite Database  │  │
                    │  └────────────────────┘  │
                    └──────────────────────────┘
```

## Implementation Examples

### Node.js with Express

Here's a complete Express server setup that serves both API and frontend:

```javascript
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize SQLite database
const db = new sqlite3.Database('./database.sqlite');

// API routes
app.use('/api', require('./routes/api'));

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for all other routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Go with Standard Library

For Go enthusiasts, here's an equivalent setup:

```go
package main

import (
    "database/sql"
    "log"
    "net/http"
    "path/filepath"
    
    _ "github.com/mattn/go-sqlite3"
)

func main() {
    // Initialize SQLite database
    db, err := sql.Open("sqlite3", "./database.sqlite")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()
    
    // API routes
    http.HandleFunc("/api/", handleAPI)
    
    // Serve static files
    fs := http.FileServer(http.Dir("./public"))
    http.Handle("/", fs)
    
    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleAPI(w http.ResponseWriter, r *http.Request) {
    // API logic here
}
```

## Build Process Integration

The key to making this work smoothly is integrating your frontend build process with your backend structure. Here's a typical setup:

### Project Structure
```
my-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── public/          # Frontend builds here (gitignored)
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js   # Or webpack.config.js
├── database.sqlite
├── package.json         # Root package.json
└── Dockerfile
```

### Root package.json Scripts
```json
{
  "scripts": {
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build",
    "build": "npm run build:frontend && npm run build:backend",
    "start": "cd backend && node server.js",
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && nodemon server.js"
  }
}
```

### Vite Configuration (frontend/vite.config.js)
```javascript
export default {
  build: {
    outDir: '../backend/public',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
```

## SQLite: The Perfect Database Companion

SQLite is an ideal choice for this architecture because:

1. **Zero Configuration**: No separate database server to manage
2. **Embedded**: Runs in-process with your application
3. **File-Based**: Easy backups (just copy the file)
4. **Surprisingly Capable**: Handles millions of records efficiently
5. **Deployment Simplicity**: Database travels with your application

### Database Initialization

```javascript
// Initialize database with tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT NOT NULL,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});
```

## Deployment Strategies

### Docker Deployment

Create a multi-stage Dockerfile that builds both frontend and backend:

```dockerfile
# Build frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Build backend
FROM node:18 AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production

# Final stage
FROM node:18-slim
WORKDIR /app
COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY backend/ ./
COPY --from=frontend-build /app/backend/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### Platform Deployments

Many platforms support this architecture out of the box:

**Fly.io**
```toml
# fly.toml
app = "my-app"

[build]
  dockerfile = "Dockerfile"

[[services]]
  internal_port = 3000
  protocol = "tcp"

[mounts]
  destination = "/app/data"
  source = "sqlite_data"
```

**Railway/Render**
These platforms automatically detect and build Node.js applications. Just ensure your build commands are in package.json.

## Production Considerations

### 1. Static Asset Caching

Configure proper cache headers for your static assets:

```javascript
app.use('/assets', express.static(path.join(__dirname, 'public/assets'), {
  maxAge: '1y',
  etag: false
}));
```

### 2. Compression

Enable gzip compression for better performance:

```javascript
const compression = require('compression');
app.use(compression());
```

### 3. Database Backups

Implement automated SQLite backups:

```javascript
const backupDatabase = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `./backups/database-${timestamp}.sqlite`;
  
  fs.copyFileSync('./database.sqlite', backupPath);
  console.log(`Database backed up to ${backupPath}`);
};

// Run daily backups
setInterval(backupDatabase, 24 * 60 * 60 * 1000);
```

### 4. Environment-Based Configuration

```javascript
const config = {
  development: {
    database: './dev.sqlite',
    port: 3000
  },
  production: {
    database: '/data/production.sqlite',
    port: process.env.PORT || 80
  }
};

const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];
```

## When to Use This Approach

This unified deployment architecture works best for:

- **Internal Tools**: Admin panels, dashboards, team tools
- **MVPs and Prototypes**: Quick deployment and iteration
- **Small to Medium Apps**: Up to thousands of daily active users
- **Read-Heavy Applications**: Blogs, portfolios, documentation sites
- **Single-Tenant SaaS**: Where each customer gets their own instance

## When to Consider Separation

You might want to separate frontend and backend when:

- You need global CDN distribution for assets
- Multiple frontends consume the same API
- You require horizontal scaling of the backend
- Your team has separate frontend and backend developers
- You need different deployment schedules for frontend and backend

## Complete Example: A Simple Blog Platform

Here's a minimal but complete example of a blog platform using this architecture:

```javascript
// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(express.json());

// Initialize database
const db = new sqlite3.Database('./blog.sqlite');

db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API Routes
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', (err, posts) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(posts);
  });
});

app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  db.run(
    'INSERT INTO posts (title, content) VALUES (?, ?)',
    [title, content],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Blog platform running on http://localhost:3000');
});
```

## Conclusion

The unified deployment approach with SQLite offers a refreshing simplicity for many web applications. By bundling your frontend with your backend and using an embedded database, you can dramatically simplify your deployment pipeline, reduce infrastructure costs, and maintain a clean, manageable codebase.

This architecture isn't a silver bullet—large-scale applications with complex requirements will still benefit from separation. But for the many applications that fall into the small to medium category, this approach provides an excellent balance of simplicity, performance, and maintainability.

Start small, deploy simply, and scale when you need to. Your future self (and your ops team) will thank you.

## Resources and Further Reading

- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Express.js Static Files Guide](https://expressjs.com/en/starter/static-files.html)
- [Docker Multi-Stage Builds](https://docs.docker.com/develop/develop-images/multistage-build/)
- [Example Repository](https://github.com/yourusername/unified-deploy-example) (placeholder)

---

*Have you tried this deployment approach? What has your experience been? Share your thoughts in the comments below!*