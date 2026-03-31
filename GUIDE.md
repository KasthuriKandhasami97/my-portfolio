# 🚀 Kasthuri K Portfolio — Complete Setup & Publishing Guide

---

## 📁 Project Structure

```
kasthuri-portfolio/
├── index.html          ← Static HTML/CSS/JS portfolio (standalone)
├── style.css
├── app.js
│
├── angular/            ← Angular frontend (connects to Django API)
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.module.ts
│
└── django_backend/     ← Python Django REST API with MySQL
    ├── settings.py
    ├── urls.py
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── admin.py
    └── mysql_setup.sql
```

---

## PART 1 — Run Static Site Locally (index.html)

> No installation needed! Just open in browser.

```
1. Open index.html in any browser (Chrome, Firefox, Edge)
2. Done! ✅ The portfolio works fully offline.
```

---

## PART 2 — Django Backend Setup

### Prerequisites
- Python 3.10+
- MySQL 8.0+
- pip

### Step 1: Create Django Project

```bash
# Create project folder
mkdir kasthuri_portfolio && cd kasthuri_portfolio

# Create virtual environment
python -m venv venv
source venv/bin/activate       # Linux/Mac
venv\Scripts\activate          # Windows

# Install dependencies
pip install django djangorestframework django-cors-headers mysqlclient pillow
```

### Step 2: Setup MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Run these SQL commands:
CREATE DATABASE kasthuri_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'StrongPass@123';
GRANT ALL PRIVILEGES ON kasthuri_portfolio.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Create Django App

```bash
django-admin startproject kasthuri_portfolio .
python manage.py startapp portfolio_app
```

Copy these files into your project:
- `settings.py` → `kasthuri_portfolio/settings.py`
- `urls.py` → `kasthuri_portfolio/urls.py`
- `models.py` → `portfolio_app/models.py`
- `serializers.py` → `portfolio_app/serializers.py`
- `views.py` → `portfolio_app/views.py`
- `admin.py` → `portfolio_app/admin.py`

### Step 4: Update settings.py with your MySQL credentials

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'kasthuri_portfolio',
        'USER': 'portfolio_user',
        'PASSWORD': 'StrongPass@123',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### Step 5: Run Migrations & Start Server

```bash
python manage.py makemigrations portfolio_app
python manage.py migrate
python manage.py createsuperuser   # Create admin account
python manage.py runserver         # Starts at http://localhost:8000
```

### Step 6: Add Your Profile Data

1. Visit: http://localhost:8000/admin/
2. Login with your superuser credentials
3. Go to **Profiles** → Add your data
4. Add Skills, Experience, Education

### API Endpoints
| Endpoint | Method | Description |
|---|---|---|
| `/api/profile/` | GET | Returns your full profile JSON |
| `/api/contact/` | POST | Saves contact form messages |
| `/admin/` | GET | Django admin panel |

---

## PART 3 — Angular Frontend Setup

### Prerequisites
- Node.js 18+
- npm

### Step 1: Create Angular App

```bash
npm install -g @angular/cli
ng new kasthuri-portfolio --routing=false --style=scss
cd kasthuri-portfolio
```

### Step 2: Add your Angular files

Copy `app.component.ts`, `app.component.html`, and `app.module.ts` into `src/app/`

### Step 3: Run Angular Dev Server

```bash
ng serve
# Open http://localhost:4200
```

The Angular app calls `http://localhost:8000/api/profile/` — make sure Django is running.

### Step 4: Build for Production

```bash
ng build --configuration=production
# Output is in /dist/kasthuri-portfolio/
```

---

## PART 4 — 🌐 Publishing to the Web

### OPTION A — GitHub Pages (FREE — Static HTML only)

```bash
# 1. Create GitHub account at github.com
# 2. Create repo named: yourusername.github.io

git init
git add index.html style.css app.js
git commit -m "Initial portfolio"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main

# 3. Go to repo Settings → Pages → Deploy from branch → main
# 4. Your site is live at: https://yourusername.github.io
```

### OPTION B — Netlify (FREE — Static HTML + Drag & Drop)

```
1. Go to https://netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag & drop your folder containing index.html, style.css, app.js
4. Done! Get URL like: https://kasthuri-portfolio.netlify.app
```

For Angular (after `ng build`):
```
Drag & drop the /dist/kasthuri-portfolio/ folder to Netlify
```

### OPTION C — Vercel (FREE — Angular + Static)

```bash
npm install -g vercel

# For static site:
vercel --prod   # Run in folder with index.html

# For Angular:
ng build --configuration=production
cd dist/kasthuri-portfolio
vercel --prod
```

### OPTION D — Railway (FREE tier — Django + MySQL Full Stack)

```bash
# 1. Create account at railway.app
# 2. New Project → Deploy from GitHub repo

# Add these environment variables in Railway dashboard:
DJANGO_SECRET_KEY=your_random_secret_key
DB_NAME=kasthuri_portfolio
DB_USER=root
DB_PASSWORD=<railway provides this>
DB_HOST=<railway provides this>
DB_PORT=3306
DEBUG=False

# 3. Railway auto-detects Django and deploys!
# 4. Add MySQL plugin in Railway dashboard
```

### OPTION E — PythonAnywhere (FREE tier — Django + MySQL)

```
1. Go to https://www.pythonanywhere.com
2. Create free account
3. Go to "Web" tab → Add a new web app → Django
4. Go to "Databases" → Create MySQL database
5. Update settings.py with PythonAnywhere MySQL credentials
6. Run migrations in PythonAnywhere console
7. Your site is live!
```

### OPTION F — VPS (DigitalOcean / AWS EC2 — Production)

```bash
# On your VPS:
sudo apt update && sudo apt install python3-pip nginx mysql-server

# Clone your repo
git clone https://github.com/yourusername/kasthuri-portfolio.git

# Setup virtualenv, install deps, configure Gunicorn + Nginx
pip install gunicorn
gunicorn kasthuri_portfolio.wsgi:application --bind 0.0.0.0:8000

# Configure Nginx to proxy to Gunicorn
# Point your domain in DNS to VPS IP
```

---

## PART 5 — Custom Domain

```
1. Buy domain at Namecheap / GoDaddy / Google Domains (~₹700/year)
2. In your hosting provider (Netlify/Vercel/Railway), add custom domain
3. In your domain registrar, add DNS records as instructed by hosting
4. SSL certificate is auto-issued (HTTPS) ✅
```

---

## PART 6 — Customize Your Data

Edit these in the files:
- **Name, Role, Email** → `index.html` line 100-120
- **Skills** → `index.html` skills section
- **Experience** → `index.html` experience section
- **Education** → `index.html` education section
- **Social Links** → `index.html` contact section

For Django: Use the admin panel at `/admin/` to update everything visually.

---

## 🔧 Quick Command Reference

```bash
# Django
python manage.py runserver          # Start dev server
python manage.py makemigrations     # Create migration files
python manage.py migrate            # Apply migrations
python manage.py createsuperuser    # Create admin user
python manage.py collectstatic      # Collect static files for production

# Angular
ng serve                            # Start dev server (port 4200)
ng build --configuration=production # Production build
ng generate component <name>        # Create new component

# MySQL
mysql -u root -p                    # Login to MySQL
SHOW DATABASES;                     # List databases
USE kasthuri_portfolio;             # Select database
SHOW TABLES;                        # List tables
```

---

## 📋 Recommended Free Hosting Stack

| Layer | Recommended | URL |
|---|---|---|
| Static HTML | GitHub Pages | github.com |
| Angular | Netlify or Vercel | netlify.com / vercel.com |
| Django API | Railway or Render | railway.app / render.com |
| MySQL | PlanetScale (free) | planetscale.com |
| Domain | Namecheap | namecheap.com |

---

*Made for Kasthuri K Portfolio — 2025*
