# Generated by Django 5.1.4 on 2024-12-11 00:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0002_taskmodel_status'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='TaskModel',
            new_name='Task',
        ),
    ]