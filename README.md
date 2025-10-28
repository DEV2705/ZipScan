🚀 ZipScan – Plagiarism & Code Similarity Analyzer

ZipScan is a modern, full‑stack platform for uploading and analyzing ZIP archives of code projects to detect similarity and potential plagiarism. It supports student and faculty workflows, batch uploads, detailed result views, and an integrated blog for updates. The app includes authentication, password reset, and an ML model powering the analysis.

🧾 License

This project is open source and available under the MIT License.

✨ Features

- 🔐 Authentication: Register/Login, email verification, password reset
- 📦 Batch Uploads: Upload ZIP files for classes or cohorts (student/faculty flows)
- 🤖 ML‑Powered Detection: Code similarity analysis via a trained model
- 📊 Results & History: View batch history, per‑project reports, and details
- 📰 Blog: Publish updates, tips, and announcements
- 🎯 REST API: Clean API endpoints consumed by the React frontend
- 🌓 Dark/Light Ready: Frontend styling built to support theming (extendable)
- 📱 Responsive UI: Works across devices with a modern UX

🛠️ Technologies Used

Backend

- Python 3.10+
- Django, Django REST Framework
- SQLite (development) – recommended to use PostgreSQL/MySQL in production
- Management command for model training (`train_model`)

Machine Learning

- scikit‑learn model serialized at `backend/ml_models/plagiarism_model.pkl`

Frontend

- React 18
- Vite
- ESLint

Tooling & Infra

- npm
- Python virtualenv
- Git

📦 Project Structure

```
ZipScan/
│
├── backend/
│   ├── plagiarism_backend/        # Django project (settings, urls, wsgi, asgi)
│   ├── authentication/            # Auth, email utils, serializers, views
│   ├── plagiarism_check/          # ML models, utils, views, train command
│   ├── project_analysis/          # Project & batch models and views
│   ├── blog/                      # Blog app
│   ├── media/                     # Runtime uploads (ignored by git)
│   ├── static/                    # Source static; collected static ignored
│   ├── requirements.txt
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

⚙️ Prerequisites

- Python 3.10+ (3.11/3.12/3.13 supported)
- Node.js 18+ (or 20+), npm 9+
- Git

📥 Installation

Clone the repository

```bash
git clone https://github.com/your-username/zipscan.git
cd zipscan
```

Backend Setup (Django API)

```bash
cd backend

# Create & activate virtualenv (Windows PowerShell)
python -m venv venv
./venv/Scripts/Activate.ps1

# macOS/Linux
# python -m venv venv
# source venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt
```

Create `backend/.env` and configure (example below), then run migrations and start the server:

```bash
python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver        # http://localhost:8000
```

Backend `.env` example

```bash
# Django
DJANGO_SECRET_KEY=change-me
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS / Frontend
CORS_ALLOWED_ORIGINS=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# Email (verification/reset)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
# For real SMTP:
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_HOST_USER=your_email@example.com
# EMAIL_HOST_PASSWORD=app_password
# EMAIL_USE_TLS=True
```

Frontend Setup (React + Vite)

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```bash
# Vite env variables must start with VITE_
VITE_API_BASE_URL=http://localhost:8000
```

Run the dev server:

```bash
npm run dev
# Frontend: http://localhost:5173
```

🚀 Usage

- Open the frontend at `http://localhost:5173`
- Register or login
- Upload ZIP files (student/faculty workflows)
- Trigger analysis and view batch history and results
- Manage profile and explore blog posts

🧪 Useful Commands

```bash
# From backend directory
python manage.py train_model    # train/refresh ML model (if implemented)
python manage.py test           # run backend tests
```

🗂 Data & Files

- Uploaded archives and generated artifacts are stored under `backend/media/` (git‑ignored).
- SQLite databases (`db.sqlite3`, `*.sqlite3`) are git‑ignored. Run migrations to initialize locally.

🔧 Configuration

- `.env` files are ignored by git. Provide local `.env` files for both backend and frontend.
- For production, configure a proper database (PostgreSQL/MySQL), `ALLOWED_HOSTS`, CORS, and a real email backend.
- Use `collectstatic` and serve static files via a web server (e.g., Nginx).
- Build the frontend (`npm run build`) and serve behind a reverse proxy with the backend API.

🌐 Browser Support

- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (latest)
- ✅ Microsoft Edge (latest)

🤝 Contributing

Contributions are welcome! Please:

1) Fork the repository
2) Create a feature branch (`git checkout -b feature/AmazingFeature`)
3) Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4) Push to the branch (`git push origin feature/AmazingFeature`)
5) Open a Pull Request

👨‍💻 Author

- Shah Dev
- GitHub: DEV2705
- Email: devshah2707@gmail.com  


Built with ❤️ to help educators and students analyze code fairly and efficiently.
