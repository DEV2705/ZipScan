from rest_framework import serializers
from .models import BlogPost, Comment


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField(read_only=True)
    author_role = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_name', 'author_role', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']

    def get_author_name(self, obj):
        return f"{obj.author.first_name} {obj.author.last_name}".strip() or obj.author.email

    def get_author_role(self, obj):
        return getattr(obj.author, 'role', None)

    def create(self, validated_data):
        request = self.context['request']
        validated_data['author'] = request.user
        return super().create(validated_data)


class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField(read_only=True)
    author_role = serializers.SerializerMethodField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'author', 'author_name', 'author_role', 'title', 'content', 'created_at', 'updated_at', 'comments']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']

    def get_author_name(self, obj):
        return f"{obj.author.first_name} {obj.author.last_name}".strip() or obj.author.email

    def get_author_role(self, obj):
        return getattr(obj.author, 'role', None)

    def create(self, validated_data):
        request = self.context['request']
        validated_data['author'] = request.user
        return super().create(validated_data)


