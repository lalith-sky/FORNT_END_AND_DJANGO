from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError

# ------------------- SOS Report -------------------
class SOSReport(models.Model):
    STATUS_PENDING = 'Pending'
    STATUS_IN_PROGRESS = 'InProgress'
    STATUS_RESOLVED = 'Resolved'
    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_IN_PROGRESS, 'In Progress'),
        (STATUS_RESOLVED, 'Resolved'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=100)  # e.g., "Fire Alert", "Medical Emergency"
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)

    class Meta:
        ordering = ['-date']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['date']),
        ]

    def __str__(self):
        return f"{self.type} ({self.status}) by {self.user.username} on {self.date.strftime('%Y-%m-%d %H:%M')}"

# ------------------- Location Share -------------------
class LocationShare(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    latitude = models.FloatField(validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitude = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)])
    shared_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-shared_at']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['shared_at']),
        ]

    def __str__(self):
        return f"Location by {self.user.username} at {self.shared_at}"

# ------------------- Alert -------------------
class Alert(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['is_read']),
        ]

    def __str__(self):
        return f"Alert for {self.user.username} at {self.created_at}"

# ------------------- Contact -------------------
class Contact(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_contacts')
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(blank=True)

    class Meta:
        unique_together = ('owner', 'phone_number')  # avoid duplicate contacts per user

    def __str__(self):
        return f"{self.name} ({self.phone_number})"

# ------------------- Heatmap Point -------------------
class HeatmapPoint(models.Model):
    lat = models.FloatField(validators=[MinValueValidator(-90), MaxValueValidator(90)])
    lng = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)])
    intensity = models.FloatField(default=1)

    def __str__(self):
        return f"{self.lat}, {self.lng}: {self.intensity}"

# ------------------- UserContact (friend connections) -------------------
class UserContact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_contacts")
    contact = models.ForeignKey(User, on_delete=models.CASCADE, related_name="contacted_by")

    class Meta:
        unique_together = ('user', 'contact')

    def clean(self):
        if self.user == self.contact:
            raise ValidationError("User cannot add themselves as a contact.")

    def __str__(self):
        return f"{self.user.username} -> {self.contact.username}"

# ------------------- Messages -------------------
class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['sender']),
            models.Index(fields=['receiver']),
            models.Index(fields=['timestamp']),
        ]

    def __str__(self):
        return f"From {self.sender.username} to {self.receiver.username}: {self.text[:30]}"
