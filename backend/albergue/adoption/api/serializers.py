from rest_framework import serializers
from albergue.adoption.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'password', 'is_active']
        extra_kwargs = {'password': {'write_only': True}}
        read_only_fields = ['is_active']

    def create(self, validated_data):
        # We only allow create user (no superusers)
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            role=validated_data['role'],
        )
        return user

    def update(self, instance, validated_data):
        # TODO: check email <=
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance
