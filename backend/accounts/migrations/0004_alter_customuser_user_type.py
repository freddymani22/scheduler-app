# Generated by Django 4.2.9 on 2024-02-05 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_customuser_is_interview_admin_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='user_type',
            field=models.CharField(choices=[('candidate', 'Candidate'), ('interviewer', 'Interviewer'), ('', 'Select user type')], max_length=20, null=True),
        ),
    ]
