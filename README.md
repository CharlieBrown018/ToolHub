# ToolHub

A modern, unified platform for file conversion and utility tools built with **FastAPI** and **React + TypeScript**.

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+**
- **Node.js 18+** (for React frontend with Vite)
- **Tesseract OCR** (optional, for Scan2PDF OCR features)

### Installation

```bash
install.bat
```

This will install:
- Python dependencies (FastAPI, OCR libraries, etc.)
- React dependencies (if Node.js is installed)

### Development Mode

**Option 1: Run Both Servers Together**
```bash
run_dev.bat
```
This starts both servers in separate windows:
- **FastAPI Server:** http://localhost:5000
- **Vite Dev Server:** http://localhost:3000
- **API Docs:** http://localhost:5000/docs

**Option 2: Run Servers Separately**

**Backend only:**
```bash
run_backend.bat
```
Starts FastAPI server on http://localhost:5000

**Frontend only:**
```bash
run_frontend.bat
```
Starts Vite dev server on http://localhost:3000

### Production Mode

```bash
run_prod.bat
```

Single server on http://localhost:5000 (FastAPI serves Vite build)

## 🛠️ Tools

### Scan2PDF
Convert images and PDFs to searchable PDFs with OCR technology.
- Batch processing
- OCR text layer
- Multiple formats (PNG, JPEG, BMP, TIFF, GIF, PDF)

### DocuMark
Convert Markdown files to beautifully formatted PDF documents.
- Syntax highlighting
- Custom styling
- Table support

## 📁 Project Structure

```
toolhub/
├── backend/              # FastAPI Backend
│   ├── app.py           # Main FastAPI application
│   ├── config.py        # Configuration
│   ├── tools/           # Tool modules
│   │   ├── scan2pdf/   # Scan2PDF tool
│   │   └── documark/   # DocuMark tool
│   └── utils/           # Shared utilities
├── frontend/            # React + TypeScript Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hub.tsx
│   │   │   └── tools/
│   │   │       ├── Scan2PDF.tsx
│   │   │       └── DocuMark.tsx
│   │   └── App.tsx
│   ├── index.html       # Vite entry HTML
│   ├── vite.config.ts   # Vite configuration
│   └── package.json
├── uploads/             # Upload directory (auto-created)
├── outputs/             # Output directory (auto-created)
├── requirements.txt     # Python dependencies
├── install.bat          # Installation script
├── run_dev.bat          # Development script (both servers)
├── run_backend.bat      # Backend only
├── run_frontend.bat     # Frontend only
├── run_prod.bat         # Production script
├── README.md           # This file
├── backend.md          # Backend documentation
└── frontend.md         # Frontend documentation
```

## 🔧 API Endpoints

### Tools
- `GET /api/tools` - List all tools
- `GET /api/health` - Health check

### Scan2PDF
- `GET /api/tools/image-to-pdf/status` - Check Tesseract availability
- `POST /api/tools/image-to-pdf/convert` - Convert images/PDFs (SSE stream)
- `POST /api/tools/image-to-pdf/browse-files` - Open file picker
- `POST /api/tools/image-to-pdf/browse-folder` - Open folder picker
- `POST /api/tools/image-to-pdf/upload-files` - Upload files
- `GET /api/tools/image-to-pdf/preview-pdf` - Preview PDF

### DocuMark
- `POST /api/tools/md-to-pdf/convert` - Convert markdown file to PDF
- `POST /api/tools/md-to-pdf/convert-text` - Convert markdown text to PDF

## 📚 API Documentation

FastAPI automatically generates interactive API documentation:
- **Swagger UI:** http://localhost:5000/docs
- **ReDoc:** http://localhost:5000/redoc

## 🎨 Features

- ✅ Modern React + TypeScript frontend with **Vite**
- ✅ FastAPI backend with auto-generated docs
- ✅ Server-Sent Events (SSE) for real-time progress
- ✅ File upload support
- ✅ Native file/folder pickers
- ✅ Dark theme UI with shadcn/ui components
- ✅ Responsive design
- ✅ Clean architecture (SOC, DRY)
- ✅ Tailwind CSS v3 for styling

## 🐛 Troubleshooting

**Frontend build not found:**
- Run `npm run build` in the `frontend` directory

**Tesseract not found:**
- Install Tesseract OCR from https://github.com/UB-Mannheim/tesseract/wiki
- Scan2PDF will still work but without OCR

**Port already in use:**
- Change ports in batch files
- Update Vite proxy in `frontend/vite.config.ts`

**Python dependencies not installing:**
- Ensure Python 3.8+ is installed
- Try: `pip install --upgrade pip` then `pip install -r requirements.txt`

**Frontend dependencies not installing:**
- Ensure Node.js 18+ is installed
- Try: `cd frontend && npm install`

**WeasyPrint errors (DocuMark):**
- WeasyPrint requires GTK+ libraries on Windows
- DocuMark will show an error message if unavailable
- See backend.md for installation instructions

## 📝 Documentation

- **[backend.md](backend.md)** - Backend architecture and API details
- **[frontend.md](frontend.md)** - Frontend structure and components

## 📄 License

Free and open-source utilities.
