# Generated by Django 4.2.9 on 2024-02-05 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_customuser_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='user_type',
            field=models.CharField(choices=[('candidate', 'Candidate'), ('interviewer', 'Interviewer'), ('', 'Empty')], max_length=20, null=True),
        ),
    ]
