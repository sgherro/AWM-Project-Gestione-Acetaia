# Generated by Django 3.1.2 on 2020-12-01 18:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Barrel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_wood', models.CharField(max_length=20)),
                ('capacity', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Operation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime', models.DateTimeField()),
                ('barrel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='operations.barrel')),
            ],
        ),
        migrations.CreateModel(
            name='Set',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='AddMosto',
            fields=[
                ('operation_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='operations.operation')),
                ('quantity', models.IntegerField(default=0)),
                ('type_mosto', models.CharField(max_length=20)),
            ],
            bases=('operations.operation',),
        ),
        migrations.CreateModel(
            name='Misuration',
            fields=[
                ('operation_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='operations.operation')),
                ('measure', models.IntegerField(default=0)),
                ('type_measure', models.CharField(max_length=20)),
            ],
            bases=('operations.operation',),
        ),
        migrations.CreateModel(
            name='Taste',
            fields=[
                ('operation_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='operations.operation')),
                ('description', models.TextField(max_length=200)),
            ],
            bases=('operations.operation',),
        ),
        migrations.CreateModel(
            name='Withdrawal',
            fields=[
                ('operation_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='operations.operation')),
                ('quantity', models.IntegerField(default=0)),
            ],
            bases=('operations.operation',),
        ),
        migrations.AddField(
            model_name='barrel',
            name='battery',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='operations.set'),
        ),
        migrations.CreateModel(
            name='Rabbocco',
            fields=[
                ('operation_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='operations.operation')),
                ('quantity', models.IntegerField(default=0)),
                ('barrel_destination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='operations.barrel')),
            ],
            bases=('operations.operation',),
        ),
    ]