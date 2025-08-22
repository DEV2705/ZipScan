from django.db import models
from authentication.models import CustomUser

class BatchUpload(models.Model):
    faculty = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    batch_name = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_path = models.CharField(max_length=500)
    
    # Enhanced fields for nested structure
    nested_zip_structure = models.JSONField(default=dict)
    total_nested_zips = models.IntegerField(default=0)

    class Meta:
        app_label = 'plagiarism_check'

    def __str__(self):
        return f"{self.batch_name} - {self.topic}"

class ProjectSubmission(models.Model):
    batch = models.ForeignKey(BatchUpload, on_delete=models.CASCADE, related_name='submissions')
    student_id = models.CharField(max_length=100)
    project_name = models.CharField(max_length=255)
    file_path = models.CharField(max_length=500)
    features = models.JSONField(default=dict)
    
    # Enhanced fields for nested ZIP tracking
    parent_zip_name = models.CharField(max_length=255, null=True, blank=True)
    extraction_level = models.IntegerField(default=0)
    original_zip_path = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        app_label = 'plagiarism_check'

    def __str__(self):
        return f"{self.student_id} - {self.project_name}"

class PlagiarismResult(models.Model):
    batch = models.ForeignKey(BatchUpload, on_delete=models.CASCADE, related_name='results')
    project1 = models.ForeignKey(ProjectSubmission, on_delete=models.CASCADE, related_name='comparisons_as_project1')
    project2 = models.ForeignKey(ProjectSubmission, on_delete=models.CASCADE, related_name='comparisons_as_project2')
    similarity_score = models.FloatField()
    is_plagiarized = models.BooleanField(default=False)
    comparison_details = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'plagiarism_check'
        unique_together = ['project1', 'project2']

    def __str__(self):
        return f"{self.project1.student_id} vs {self.project2.student_id} - {self.similarity_score:.2f}"
