# Generated by Django 4.2.16 on 2024-09-14 23:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('animal', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='animal',
            options={'ordering': ['name']},
        ),
    ]
