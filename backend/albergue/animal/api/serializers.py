from rest_framework import serializers
from albergue.animal.models import Animal, AnimalStatus

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'

    def validate_status(self, value):
        if value not in [AnimalStatus.IN_ADOPTION, AnimalStatus.AWAITING_ADOPTION]:
            raise serializers.ValidationError(
                f"El status debe ser {AnimalStatus.IN_ADOPTION} o {AnimalStatus.AWAITING_ADOPTION}."
            )
        return value