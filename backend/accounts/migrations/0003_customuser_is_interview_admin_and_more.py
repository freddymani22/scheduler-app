# Generated by Django 4.2.9 on 2024-02-05 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_customuser_user_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_interview_admin',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='user_type',
            field=models.CharField(choices=[('candidate', 'Candidate'), ('interviewer', 'Interviewer')], max_length=20, null=True),
        ),
    ]
