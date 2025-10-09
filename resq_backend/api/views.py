from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import SOSReport, LocationShare, Alert, Contact,HeatmapPoint,UserContact, Message
from .serializers import SOSReportSerializer,HeatmapPointSerializer,UserContactSerializer, MessageSerializer,ContactSerializer
from django.db.models import Q


# This view handles user registration
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# New Dashboard API view for logged-in user data
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        sos_calls_count = SOSReport.objects.filter(user=user).count()
        locations_shared_count = LocationShare.objects.filter(user=user).count()
        alerts_received_count = Alert.objects.filter(user=user).count()
        contacts_added_count = Contact.objects.filter(owner=user).count()
        recent_sos = SOSReport.objects.filter(user=user).order_by('-date')[:5]

        data = {
            "sos_calls": sos_calls_count,
            "locations_shared": locations_shared_count,
            "alerts_received": alerts_received_count,
            "contacts_added": contacts_added_count,
            "recent_sos": SOSReportSerializer(recent_sos, many=True).data,
        }
        return Response(data)
class HeatmapDataView(APIView):
    def get(self, request):
        points = HeatmapPoint.objects.all()
        serializer = HeatmapPointSerializer(points, many=True)
        return Response(serializer.data)
class ContactList(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Contact.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserContactList(generics.ListAPIView):
    serializer_class = UserContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserContact.objects.filter(user=self.request.user)
class MessageListCreate(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # All messages shown globally
        return Message.objects.all().order_by('timestamp')

    def perform_create(self, serializer):
        # Only sender required
        serializer.save(sender=self.request.user)
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)