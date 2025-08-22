from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class StudentProject(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_path = models.CharField(max_length=500)
    
    def __str__(self):
        return f"{self.student.username} - {self.project_name}"

class ProjectSummary(models.Model):
    project = models.OneToOneField(StudentProject, on_delete=models.CASCADE, related_name='summary')
    tech_stack = models.JSONField(default=list)
    libraries = models.JSONField(default=list)
    features = models.JSONField(default=list)
    file_stats = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Summary for {self.project.project_name}"
