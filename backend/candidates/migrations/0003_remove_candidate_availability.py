# Generated by Django 4.2.9 on 2024-02-02 17:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0002_alter_candidate_skills'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='candidate',
            name='availability',
        ),
    ]
