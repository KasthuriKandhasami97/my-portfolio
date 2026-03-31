# FILE: portfolio_app/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .models import Profile, ContactMessage
from .serializers import ProfileSerializer, ContactMessageSerializer


class ProfileAPIView(APIView):
    """GET /api/profile/  — Returns the first profile (yours)"""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            profile = Profile.objects.prefetch_related(
                'skills__items', 'experience__points', 'education'
            ).first()
            if not profile:
                return Response({'error': 'Profile not found'}, status=404)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)


class ContactAPIView(APIView):
    """POST /api/contact/  — Saves contact form message"""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            msg = serializer.save()
            # Optional: email notification
            try:
                send_mail(
                    subject=f"New message from {msg.name}",
                    message=f"From: {msg.name} <{msg.email}>\n\n{msg.message}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CONTACT_EMAIL],
                    fail_silently=True,
                )
            except Exception:
                pass
            return Response(
                {'message': 'Message received! I will get back to you soon.'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
