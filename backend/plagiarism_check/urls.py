from django.urls import path
from . import views

urlpatterns = [
    path('batch-check/', views.batch_plagiarism_check, name='batch-plagiarism-check'),
    path('batch/<int:batch_id>/', views.get_batch_results, name='get-batch-results'),
    path('batches/', views.get_faculty_batches, name='get-faculty-batches'),
    path('batches/recent/', views.get_recent_batches, name='get-recent-batches'),
]
