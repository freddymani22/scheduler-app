# Generated by Django 4.2.9 on 2024-02-02 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='skills',
            field=models.TextField(),
        ),
    ]
