# 📝 Content Management System

A full-stack content management website built with **Next.js** (frontend), **Node.js/Express** (backend), and **SQLite** (database).

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# Install all dependencies
npm run install:all
```

### Development

```bash
# Start both frontend and backend in development mode
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
.
├── frontend/          # Next.js 14 App Router
│   ├── app/          # Pages and layouts
│   ├── components/   # React components
│   └── package.json
├── backend/          # Express.js API server
│   ├── server.js     # Main server file
│   └── package.json
└── package.json
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contents` | Fetch all contents |
| GET | `/api/contents/:id` | Fetch single content |
| POST | `/api/contents` | Create new content |
| PUT | `/api/contents/:id` | Update content |
| DELETE | `/api/contents/:id` | Delete content |
| GET | `/api/health` | Health check |

## 📝 Request Example

**Create Content:**
```json
POST /api/contents
{
  "title": "My First Post",
  "description": "This is my first content"
}
```

## 🗄️ Database

SQLite database (`cms.db`) is automatically created with:
- **Table**: `contents`
- **Columns**: `id`, `title`, `description`, `created_at`, `updated_at`

## 🌐 Deployment to Vercel

### Deploy Frontend Only (Main app)

1. Push to GitHub repository
2. Connect to Vercel: https://vercel.com/new
3. Select your GitHub repository
4. Environment variables: Set `NEXT_PUBLIC_API_URL` to your backend URL
5. Deploy!

### Deploy Backend (Optional - Vercel Serverless)

The backend can be deployed as serverless functions or to Heroku/Railway for free hosting.

## 📦 Features

✅ Create, Read, Update, Delete (CRUD) operations  
✅ Simple, clean UI  
✅ Real-time content management  
✅ CORS enabled for frontend-backend communication  
✅ Error handling and validation  
✅ Responsive design  

## 💡 Future Enhancements

- User authentication
- Rich text editor
- Image upload support
- Comments system
- Search functionality
- Categories/Tags

## 📄 License

MIT
