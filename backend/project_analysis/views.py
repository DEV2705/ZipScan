import os
import tempfile
import shutil
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .models import StudentProject, ProjectSummary
from .utils import analyze_student_project, extract_student_project_zip

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def analyze_project(request):
    """Analyze a student's project and return summary"""
    if request.user.role != 'student':
        return Response({'error': 'Only students can analyze projects'}, 
                       status=status.HTTP_403_FORBIDDEN)
    
    zip_file = request.FILES.get('zip_file')
    project_name = request.data.get('project_name', 'My Project')
    
    if not zip_file:
        return Response({'error': 'ZIP file is required'}, 
                       status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Create temporary directory for extraction
        temp_dir = tempfile.mkdtemp()
        
        try:
            # Save uploaded file
            zip_path = os.path.join(temp_dir, zip_file.name)
            with open(zip_path, 'wb+') as destination:
                for chunk in zip_file.chunks():
                    destination.write(chunk)
            
            print(f"Saved student ZIP to: {zip_path}")
            
            # Extract ZIP file (for single student project)
            extracted_project = extract_student_project_zip(zip_path, temp_dir)
            
            if not extracted_project:
                return Response({
                    'error': 'No valid project files found in ZIP. Make sure your ZIP contains code files (.py, .js, .html, etc.)'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Use the extracted project folder
            project_path = os.path.join(temp_dir, extracted_project)
            
            print(f"Analyzing project at: {project_path}")
            
            # Analyze the project
            analysis_result = analyze_student_project(
                project_path, 
                request.user, 
                project_name
            )

            return Response({
                'message': 'Project analyzed successfully',
                'project_name': project_name,
                'project_id': analysis_result['project_id'],
                'analysis': analysis_result
            }, status=status.HTTP_200_OK)

        
        finally:
            # Clean up temporary directory
            shutil.rmtree(temp_dir, ignore_errors=True)
    
    except Exception as e:
        print(f"Student project analysis failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return Response({'error': f'Analysis failed: {str(e)}'}, 
                       status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_projects(request):
    """Get all projects for the current student with pagination"""
    if request.user.role != 'student':
        return Response({'error': 'Only students can view their projects'},
                       status=status.HTTP_403_FORBIDDEN)

    from rest_framework.pagination import PageNumberPagination
    
    projects = StudentProject.objects.filter(student=request.user).order_by('-uploaded_at')
    
    # Apply pagination
    paginator = PageNumberPagination()
    paginator.page_size = 12
    result_page = paginator.paginate_queryset(projects, request)
    
    project_list = []
    for project in result_page:
        try:
            summary = project.summary
            project_data = {
                'id': project.id,
                'project_name': project.project_name,
                'uploaded_at': project.uploaded_at,
                'tech_stack': summary.tech_stack,
                'libraries': summary.libraries,
                'features': summary.features,
                'file_stats': summary.file_stats
            }
        except:
            project_data = {
                'id': project.id,
                'project_name': project.project_name,
                'uploaded_at': project.uploaded_at,
                'tech_stack': [],
                'libraries': [],
                'features': [],
                'file_stats': {}
            }
        project_list.append(project_data)

    return paginator.get_paginated_response({'projects': project_list})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_project_details(request, project_id):
    """Get detailed information about a specific project"""
    try:
        project = StudentProject.objects.get(id=project_id, student=request.user)
        summary = project.summary
        
        return Response({
            'project': {
                'id': project.id,
                'project_name': project.project_name,
                'uploaded_at': project.uploaded_at,
                'tech_stack': summary.tech_stack,
                'libraries': summary.libraries,
                'features': summary.features,
                'file_stats': summary.file_stats
            }
        }, status=status.HTTP_200_OK)
    
    except StudentProject.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recent_projects(request):
    """Get recent 5 projects for the current student (for sidebar display)"""
    if request.user.role != 'student':
        return Response({'error': 'Only students can view their projects'},
                       status=status.HTTP_403_FORBIDDEN)

    projects = StudentProject.objects.filter(student=request.user).order_by('-uploaded_at')[:5]
    project_list = []

    for project in projects:
        try:
            summary = project.summary
            project_data = {
                'id': project.id,
                'project_name': project.project_name,
                'uploaded_at': project.uploaded_at,
                'tech_stack': summary.tech_stack[:3],  # Only first 3 tech stack items
                'analysis_complete': True
            }
        except:
            project_data = {
                'id': project.id,
                'project_name': project.project_name,
                'uploaded_at': project.uploaded_at,
                'tech_stack': [],
                'analysis_complete': False
            }
        project_list.append(project_data)

    return Response({
        'recent_projects': project_list,
        'total_projects': StudentProject.objects.filter(student=request.user).count()
    }, status=status.HTTP_200_OK)
