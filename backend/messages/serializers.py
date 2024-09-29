from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'content']
        read_only_fields = ['sender']
        
    def create(self, validated_data):
        print(f"Authenticated User: {self.context['request'].user}")

        validated_data['sender'] = self.context['request'].user  # Use the ID of the authenticated user
        return super().create(validated_data)