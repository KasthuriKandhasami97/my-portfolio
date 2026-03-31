# FILE: portfolio_app/admin.py
from django.contrib import admin
from .models import Profile, SkillCategory, Skill, Experience, ExperiencePoint, Education, ContactMessage

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

class SkillCategoryInline(admin.TabularInline):
    model = SkillCategory
    extra = 1

class ExperiencePointInline(admin.TabularInline):
    model = ExperiencePoint
    extra = 2

class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 1
    show_change_link = True

class EducationInline(admin.TabularInline):
    model = Education
    extra = 1

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'email']
    inlines = [SkillCategoryInline, ExperienceInline, EducationInline]

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    inlines = [SkillInline]

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'period', 'is_current']
    inlines = [ExperiencePointInline]

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at', 'is_read']
    list_filter = ['is_read']
    actions = ['mark_as_read']

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected messages as read"
