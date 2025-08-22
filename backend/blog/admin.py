from django.contrib import admin
from .models import BlogPost, Comment


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'content', 'author__email', 'author__first_name', 'author__last_name')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'author', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('content', 'author__email', 'post__title')


