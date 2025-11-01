# ResQ - Emergency Response Platform

A full-stack emergency response platform built with React (Vite + Tailwind CSS) frontend and Django backend.

## 🚀 Features

- **Interactive Map Interface** - Built with React Leaflet for real-time location tracking
- **Heatmap Visualization** - Emergency hotspot identification using leaflet.heat
- **Responsive Design** - Modern UI with Tailwind CSS
- **Smooth Animations** - Enhanced UX with GSAP
- **RESTful API** - Django backend for data management

## 📁 Project Structure

```
.
├── src/                    # React frontend source
│   ├── components/        # Reusable React components
│   ├── contexts/          # React context providers
│   ├── pages/             # Page components
│   ├── style/             # Styling files
│   └── utils/             # Utility functions
├── resq_backend/          # Django backend
├── public/                # Static assets
└── server/                # Server configuration
```

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **Vite 7.1** - Build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **React Leaflet** - Interactive maps
- **GSAP** - Animation library
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Django** - Python web framework
- **Django REST Framework** - API development

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend Setup

```bash
# Navigate to backend directory
cd resq_backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start Django server
python manage.py runserver
```

## 🔧 Configuration

1. Copy `.env.example` to `.env` and configure your environment variables
2. Update API endpoints in the frontend configuration
3. Configure Django settings in `resq_backend/settings.py`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Contributors

- ABharath007

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Bug Reports

If you find a bug, please open an issue with detailed information about the problem.
