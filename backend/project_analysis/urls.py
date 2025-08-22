from django.urls import path
from . import views

urlpatterns = [
    path('analyze/', views.analyze_project, name='analyze-project'),
    path('projects/', views.get_student_projects, name='get-student-projects'),
    path('projects/recent/', views.get_recent_projects, name='get-recent-projects'),
    path('projects/<int:project_id>/', views.get_project_details, name='get-project-details'),
]