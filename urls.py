# FILE: kasthuri_portfolio/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from portfolio_app.views import ProfileAPIView, ContactAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/profile/', ProfileAPIView.as_view(), name='profile'),
    path('api/contact/', ContactAPIView.as_view(), name='contact'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
