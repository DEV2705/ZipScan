from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BlogPost, Comment
from .serializers import BlogPostSerializer, CommentSerializer
from .permissions import IsAuthorOrReadOnly


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.select_related('author').prefetch_related('comments__author').all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related('author', 'post').all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]
