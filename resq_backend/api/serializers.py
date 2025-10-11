from django.contrib.auth.models import User
from rest_framework import serializers
from .models import SOSReport, LocationShare, Alert, Contact, HeatmapPoint, UserContact, Message

# ---------- USER SERIALIZER ----------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# ---------- SOS REPORT SERIALIZER ----------
class SOSReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOSReport
        fields = ['date', 'type', 'status']

# ---------- LOCATION SHARE SERIALIZER ----------
class LocationShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationShare
        fields = ['latitude', 'longitude', 'shared_at']

# ---------- ALERT SERIALIZER ----------
class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ['message', 'created_at', 'is_read']

# ---------- CONTACT SERIALIZER ----------
class ContactSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')  # Owner is automatically assigned, read-only

    class Meta:
        model = Contact
        fields = ['id', 'owner', 'name', 'phone_number', 'email']

    # Optional: validate phone number
    def validate_phone_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits.")
        return value

# ---------- HEATMAP POINT SERIALIZER ----------
class HeatmapPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeatmapPoint
        fields = ['lat', 'lng', 'intensity']

# ---------- USER CONTACT SERIALIZER ----------
class UserContactSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    contact_username = serializers.CharField(source='contact.username', read_only=True)

    class Meta:
        model = UserContact
        fields = ['id', 'user', 'user_username', 'contact', 'contact_username']

# ---------- MESSAGE SERIALIZER ----------
class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_username', 'text', 'timestamp']  # remove receiver if not needed
