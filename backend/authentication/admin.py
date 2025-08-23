

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'is_email_verified', 'is_active', 'date_joined']
    list_filter = ['role', 'is_active', 'is_staff', 'is_email_verified', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['username']

    # Add custom fields to the fieldsets
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role', 'is_email_verified')}),
    )

    # Add custom fields to the add form
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {'fields': ('role', 'is_email_verified')}),
    )

    # Ensure changes are saved properly
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
