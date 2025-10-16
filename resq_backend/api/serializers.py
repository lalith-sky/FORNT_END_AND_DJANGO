from django.contrib.auth.models import User
from rest_framework import serializers
<<<<<<< HEAD
from .models import SOSReport, LocationShare, Alert, Contact, HeatmapPoint, UserContact, Message,UserProfile

# ---------- USER SERIALIZER ----------
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone', 'alt_phone', 'address']

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="username", read_only=True)
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['name', 'email', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        # get or create the related profile
        profile, created = UserProfile.objects.get_or_create(user=instance)
        profile.phone = profile_data.get('phone', profile.phone)
        profile.alt_phone = profile_data.get('alt_phone', profile.alt_phone)
        profile.address = profile_data.get('address', profile.address)
        profile.save()
        return instance
=======
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
>>>>>>> 9a1c82249b487c366314a53e5814f2422cbf44cb

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
