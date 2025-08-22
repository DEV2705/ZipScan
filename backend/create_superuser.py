import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'plagiarism_backend.settings')
django.setup()

from authentication.models import CustomUser

if not CustomUser.objects.filter(username='admin').exists():
    CustomUser.objects.create_superuser('admin', 'admin@example.com', 'admin123', role='faculty')
    print("Superuser 'admin' created successfully!")
    print("Username: admin")
    print("Password: admin123")
    print("Role: faculty")
else:
    print("Superuser already exists!")
