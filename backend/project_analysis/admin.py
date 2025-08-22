from django.contrib import admin
from .models import StudentProject, ProjectSummary

@admin.register(StudentProject)
class StudentProjectAdmin(admin.ModelAdmin):
    list_display = ['project_name', 'student', 'uploaded_at']
    list_filter = ['uploaded_at', 'student__role']
    search_fields = ['project_name', 'student__username', 'student__email']
    readonly_fields = ['uploaded_at']
    ordering = ['-uploaded_at']

@admin.register(ProjectSummary)
class ProjectSummaryAdmin(admin.ModelAdmin):
    list_display = ['project_name', 'student', 'tech_stack_display', 'features_count', 'created_at']
    list_filter = ['created_at']
    search_fields = ['project__project_name', 'project__student__username']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    def project_name(self, obj):
        return obj.project.project_name
    project_name.short_description = 'Project Name'
    
    def student(self, obj):
        return obj.project.student.username
    student.short_description = 'Student'
    
    def tech_stack_display(self, obj):
        return ', '.join(obj.tech_stack[:3]) + ('...' if len(obj.tech_stack) > 3 else '')
    tech_stack_display.short_description = 'Tech Stack'
    
    def features_count(self, obj):
        return len(obj.features)
    features_count.short_description = 'Features Count'
