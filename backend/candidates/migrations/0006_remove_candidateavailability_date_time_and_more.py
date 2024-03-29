# Generated by Django 4.2.9 on 2024-02-03 08:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0005_candidateavailability_interview_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='candidateavailability',
            name='date_time',
        ),
        migrations.AddField(
            model_name='candidateavailability',
            name='available_date',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='candidateavailability',
            name='available_time_from',
            field=models.TimeField(default=datetime.time(9, 0)),
        ),
        migrations.AddField(
            model_name='candidateavailability',
            name='available_time_to',
            field=models.TimeField(default=datetime.time(17, 0)),
        ),
        migrations.AlterField(
            model_name='candidateavailability',
            name='interview_title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
