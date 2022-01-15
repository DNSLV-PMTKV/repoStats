from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext
from . import models


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['id', 'email', 'token', 'is_staff']
    fieldsets = [
        (None, {
            'fields': ('token',)
        }),
        (gettext('Personal Info'), {
            'fields': ('email',)
        }),
        (gettext('Permissions'), {
            'fields': ('is_staff', 'is_superuser')
        }),
        (gettext('Important dates'), {
            'fields': ('last_login', )
        }),
    ]
    add_fieldsets = [
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'token')
        }),
    ]
    list_filter = ('id', 'email', 'is_staff')


admin.site.register(models.User, UserAdmin)
