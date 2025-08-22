from django.contrib import admin
from .models import BatchUpload, ProjectSubmission, PlagiarismResult

@admin.register(BatchUpload)
class BatchUploadAdmin(admin.ModelAdmin):
    list_display = ['batch_name', 'topic', 'faculty', 'uploaded_at']
    list_filter = ['uploaded_at', 'faculty']
    search_fields = ['batch_name', 'topic', 'faculty__username']
    readonly_fields = ['uploaded_at']
    ordering = ['-uploaded_at']

@admin.register(ProjectSubmission)
class ProjectSubmissionAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'project_name', 'batch', 'batch__faculty']
    list_filter = ['batch', 'batch__topic']
    search_fields = ['student_id', 'project_name', 'batch__batch_name']
    ordering = ['student_id']
    
    def batch__faculty(self, obj):
        return obj.batch.faculty.username
    batch__faculty.short_description = 'Faculty'

@admin.register(PlagiarismResult)
class PlagiarismResultAdmin(admin.ModelAdmin):
    list_display = ['project1_student_id', 'project2_student_id', 'similarity_score', 'is_plagiarized', 'batch', 'created_at']
    list_filter = ['is_plagiarized', 'batch', 'created_at']
    search_fields = ['project1__student_id', 'project2__student_id', 'batch__batch_name']
    readonly_fields = ['created_at']
    ordering = ['-similarity_score']
    
    def project1_student_id(self, obj):
        return obj.project1.student_id
    project1_student_id.short_description = 'Student 1'
    
    def project2_student_id(self, obj):
        return obj.project2.student_id
    project2_student_id.short_description = 'Student 2'