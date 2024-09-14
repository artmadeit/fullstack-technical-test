from django.db import models

MEDIUM_LENGTH = 50

class AnimalType(models.TextChoices):
    DOG = "D"
    CAT = "C"

class AnimalStatus(models.TextChoices):
    AWAITING_ADOPTION = "AWAITING_ADOPTION"
    IN_ADOPTION = "IN_ADOPTION"
    ADOPTED = "ADOPTED"

class Animal(models.Model):
    name = models.CharField(max_length=MEDIUM_LENGTH, blank=False, null=False)    
    age = models.CharField(max_length=MEDIUM_LENGTH, blank=False, null=False)
    type = models.CharField(max_length=1, choices=AnimalType.choices, null=False)
    breed = models.CharField(max_length=MEDIUM_LENGTH, blank=False, null=False)
    status = models.CharField(max_length=MEDIUM_LENGTH, choices=AnimalStatus.choices, null=False)

    class Meta:
        ordering = ["name"]
