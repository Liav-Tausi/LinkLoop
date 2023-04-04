# Generated by Django 4.1.7 on 2023-04-04 21:30

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('linkloop_app', '0006_remove_profile_profile_name_alter_profile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='title',
            field=models.CharField(db_column='title', default='', max_length=64, validators=[django.core.validators.MinLengthValidator(1)]),
        ),
        migrations.AddField(
            model_name='videoimpression',
            name='impression_duration',
            field=models.TimeField(blank=True, db_column='impression_duration', null=True),
        ),
    ]