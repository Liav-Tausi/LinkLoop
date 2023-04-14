# Generated by Django 4.1.7 on 2023-04-12 19:54

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('linkloop_app', '0009_alter_profile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='about',
            field=models.TextField(blank=True, db_column='about', max_length=2000, null=True, validators=[django.core.validators.MinLengthValidator(10)]),
        ),
    ]