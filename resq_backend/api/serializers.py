from django.contrib.auth.models import User
from rest_framework import serializers
from .models import SOSReport, LocationShare, Alert, Contact,HeatmapPoint,UserContact, Message


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']  # Added 'email' here
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}  # Make sure email is required
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],  # Include email in user creation
            password=validated_data['password']
        )
        return user
class SOSReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOSReport
        fields = ['date', 'type', 'status']

class LocationShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationShare
        fields = ['latitude', 'longitude', 'shared_at']

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ['message', 'created_at', 'is_read']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'owner', 'name', 'phone_number', 'email']
class HeatmapPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeatmapPoint
        fields = ['lat', 'lng', 'intensity']


class UserContactSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    contact_username = serializers.CharField(source='contact.username', read_only=True)

    class Meta:
        model = UserContact
        fields = ['id', 'user', 'user_username', 'contact', 'contact_username']


class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_username', 'text', 'timestamp']  # remove receiver if not needed