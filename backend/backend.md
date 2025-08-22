# ZipScan Backend – System Overview

This document provides a comprehensive overview of the ZipScan backend: apps, models, APIs, authentication, settings, and key data flows.

## Stack
- Framework: Django + Django REST Framework (DRF)
- Auth: JWT via `rest_framework_simplejwt` (with refresh-token rotation + blacklist)
- DB: SQLite (dev) – configured via Django ORM
- CORS: Enabled for local dev (`localhost`, `127.0.0.1`, custom LAN IPs)
- Storage: Local `MEDIA_ROOT` under `backend/media`

## Project Layout
- Project: `plagiarism_backend`
  - `settings.py`, `urls.py`, `wsgi.py`, `asgi.py`
- Apps:
  - `authentication` – Custom user model and auth endpoints
  - `plagiarism_check` – Faculty batch plagiarism workflow
  - `project_analysis` – Student single-project analysis
  - `blog` – Blog posts and comments (faculty/student)
- ML/Temp/Media:
  - `ml_models/` – bundled model(s)
  - `temp/` – temporary workspace for uploads/extractions
  - `media/` – stored uploads (batches zips, etc.)

## Global Settings Highlights (`plagiarism_backend/settings.py`)
- `INSTALLED_APPS`: `rest_framework`, `simplejwt`, `corsheaders`, custom apps
- `AUTH_USER_MODEL`: `authentication.CustomUser`
- CORS: `CORS_ALLOW_ALL_ORIGINS=True` plus allowed origins list
- SimpleJWT:
  - Access TTL: 1 hour; Refresh TTL: 7 days
  - Refresh rotation + blacklist enabled
  - `AUTH_HEADER_TYPES=('Bearer',)`
- DRF defaults:
  - Auth: `JWTAuthentication`
  - Permission: `IsAuthenticated`
  - Renderer: JSON
  - Parsers: JSON/MultiPart/Form
  - Pagination: PageNumber (size=12)
- File limits: `FILE_UPLOAD_MAX_MEMORY_SIZE`, `DATA_UPLOAD_MAX_MEMORY_SIZE` = 100MB
- Static/Media:
  - `MEDIA_URL=/media/` -> `MEDIA_ROOT=backend/media`

## Root URLs (`plagiarism_backend/urls.py`)
- JWT: `/api/token/`, `/api/token/refresh/`, `/api/token/verify/`
- Apps:
  - `/api/auth/` → `authentication.urls`
  - `/api/plagiarism/` → `plagiarism_check.urls`
  - `/api/analysis/` → `project_analysis.urls`
  - `/api/blog/` → `blog.urls`

---

## authentication
Custom user model + auth endpoints with JWT lifecycle management.

### Model (`authentication.models.CustomUser`)
- Base: `AbstractUser`
- Fields:
  - `email` (unique), `role` (`faculty`/`student`), `created_at`
  - `is_email_verified`, `email_verification_token`
  - Password reset: `reset_password_code`, `reset_code_expiry`

### Key Endpoints (mounted at `/api/auth/`)
- `POST /register/` – Register user, returns user and tokens
- `POST /login/` – Login with credentials, returns user and tokens
- `POST /logout/` – Blacklists refresh token; clears server-side session
- `GET /profile/` – Authenticated user profile
- `PUT /profile/` – Update profile
- `POST /resend-verification/` – Re-send email verification
- Password reset:
  - `POST /forgot-password/`
  - `POST /verify-reset-code/`
  - `POST /reset-password/`

Auth is JWT-based; FE stores `accessToken`/`refreshToken` in `localStorage`.

---

## plagiarism_check
Batch-based plagiarism analysis for faculty uploads.

### Models (high-level)
- `Batch` (inferred from routes): uploaded zip (faculty), metadata like `batch_name`, `topic`, timestamps, totals
- `PlagiarismResult` (inferred): detailed pairwise similarity results and summaries

### URLs (`/api/plagiarism/`)
- Batches
  - `GET /batches/` – Paginated list (summary per batch)
  - `GET /batches/recent/` – Most recent batches
  - `GET /batch/{batchId}/` – Detailed results (includes:
    - `summary.similarity_percentage` (canonical value for history cards)
    - `detailed_results` (pairwise)
    - `hierarchical_projects` (tree format)
    - `student_summary` (aggregations)
  )
- Upload/Analysis
  - `POST /batch-check/` – Multipart upload for batch; triggers analysis

### Frontend Expectations
- History cards should use `summary.similarity_percentage` from batch result as the source of truth (implemented).

---

## project_analysis
Single student project (zip) analysis – returns tech stack, libraries, features, and file stats.

### Models
- `StudentProject` – student, name, file path, timestamp
- `ProjectSummary` – JSON-like fields:
  - `tech_stack` (list)
  - `libraries` (list)
  - `features` (list)
  - `file_stats` (object): total files, code files, total size (MB), `largest_files` (top 3)

### Analysis Utils (`project_analysis/utils.py`)
- `extract_student_project_zip` – Robust extraction handling diverse zips
- `detect_tech_stack_enhanced` – Identifies languages/frameworks
  - Also returns `confidence_scores`
- `analyze_dependency_files` – Reads `package.json`, `requirements.txt`, `pom.xml`, `composer.json`
  - Yields inferred `frameworks`, and dependency `libraries`
- `analyze_file_contents` – Detects frameworks by code patterns
- `extract_libraries_enhanced` + `extract_libraries_from_imports` – Finds libraries via code imports and dependency files
- `get_file_statistics` – Counts files, code files, total size MB, top 3 largest files
- `analyze_student_project` – Main orchestrator; returns:
  - `project_id`
  - `tech_stack`
  - `tech_stack_confidence` (per-tech)
  - `libraries`
  - `features`
  - `file_stats` (incl. `largest_files`)
  - `analysis_details`:
    - `dependency_analysis.frameworks` / `libraries`
    - `content_analysis.frameworks`

### URLs (`/api/analysis/`)
- `POST /analyze/` – Multipart upload of a single project
- `GET /projects/` – Paginated list of user projects
- `GET /projects/recent/` – Recent projects
- `GET /projects/{projectId}/` – Project details + analysis summary

---

## blog
Simple blogging with posts and comments by any authenticated user (faculty or student). Only authors can edit/delete their content.

### Models (`blog/models.py`)
- `BlogPost`
  - `author` → `authentication.CustomUser`
  - `title`, `content`, `created_at`, `updated_at`
- `Comment`
  - `post` → `BlogPost`
  - `author` → `authentication.CustomUser`
  - `content`, `created_at`, `updated_at`

### Serializers (`blog/serializers.py`)
- `BlogPostSerializer`
  - read-only: `author_name`, `author_role`
  - nested: `comments` (read-only)
- `CommentSerializer`
  - read-only: `author_name`, `author_role`
- `create()` injects `author=request.user` for safety

### Permissions (`blog/permissions.py`)
- `IsAuthorOrReadOnly` – SAFE methods allowed; write ops restricted to the author

### Views/URLs
- ViewSets: `BlogPostViewSet`, `CommentViewSet` (both require auth + author-only writes)
- Router (`/api/blog/`):
  - `posts/` – list, create, retrieve, update, destroy
  - `comments/` – list, create, retrieve, update, destroy

---

## Authentication & Security
- JWT endpoints:
  - `/api/token/`, `/api/token/refresh/`, `/api/token/verify/`
- DRF default permission: `IsAuthenticated`
  - Public read access is NOT enabled by default; all app endpoints require auth unless an app-specific permission overrides it
- CSRF middleware is disabled for API-only JWT flow
- Token Rotation/Blacklist enabled

## File Uploads
- Parsers allow `MultiPartParser`
- Limits set to 100MB (memory)
- Media served under `/media/` in DEBUG mode

## Pagination
- DRF `PageNumberPagination` globally
- Default page size: 12 items

## Email
- SMTP configured (Gmail) for verification/reset emails
  - `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` are present in settings (consider using env vars in production)

## Admin
- Blog models registered for viewing: `BlogPost`, `Comment`
- Default Django admin enabled at `/admin/`

---

## Frontend Integration Notes
- Authentication: FE attaches `Authorization: Bearer <access>` header; interceptor refreshes tokens on 401 via `/api/token/refresh/`
- Blog: FE uses `author`, `author_name`, `author_role` to filter (professor vs student) and enforce edit/delete buttons for owner
- Plagiarism History: FE uses `batch.summary.similarity_percentage` if available; otherwise falls back to `plagiarism_percentage`
- Student Analysis: FE renders:
  - Tech stack + confidence badges
  - Libraries & Features
  - File stats including top 3 largest files
  - Analysis Details: dependency/content-inferred frameworks and dependency libraries

---

## Known Enhancements / TODOs
- Move secrets (SECRET_KEY, SMTP creds) to environment variables
- Add public-read endpoints where necessary (e.g., blog list) if you want unauthenticated users to browse
- Add rate-limiting/throttling for public endpoints
- Switch to PostgreSQL/MySQL for production
- Add background job queue for heavy analyses

---

## Quick Reference: API Map
- Auth: `/api/auth/…`
  - `POST /register/`, `POST /login/`, `POST /logout/`, `GET/PUT /profile/`
  - `POST /resend-verification/`, `POST /forgot-password/`, `POST /verify-reset-code/`, `POST /reset-password/`
- Tokens: `/api/token/`, `/api/token/refresh/`, `/api/token/verify/`
- Plagiarism (Faculty): `/api/plagiarism/…`
  - `POST /batch-check/`, `GET /batches/`, `GET /batches/recent/`, `GET /batch/{id}/`
- Project Analysis (Student): `/api/analysis/…`
  - `POST /analyze/`, `GET /projects/`, `GET /projects/recent/`, `GET /projects/{id}/`
- Blog: `/api/blog/…`
  - `GET/POST /posts/`, `GET/PATCH/DELETE /posts/{id}/`
  - `GET/POST /comments/`, `GET/PATCH/DELETE /comments/{id}/`

---

## Data Flow Summaries
- Student Analysis
  1) FE uploads project zip → `POST /api/analysis/analyze/`
  2) Backend extracts, analyzes (tech stack, libraries, features, file stats)
  3) Response payload includes `analysis_details` and confidence
  4) FE renders grids + details

- Faculty Batch Analysis
  1) FE uploads batch zip → `POST /api/plagiarism/batch-check/`
  2) Backend processes projects, computes similarities & summary
  3) History uses summary; details available at `GET /api/plagiarism/batch/{id}/`

- Blog
  1) Authenticated user creates post/comment → author set from `request.user`
  2) List endpoints return `author_name`, `author_role` for display & filtering
  3) Author-only PATCH/DELETE enforced server-side

---

If you need environment-specific deployment guidance (gunicorn, nginx, HTTPS, whitenoise/S3 for static/media, Postgres), we can extend this doc with production notes.
