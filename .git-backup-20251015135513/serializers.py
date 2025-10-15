from django.contrib.auth.models import User
from rest_framework import serializ

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
