from peewee import *

db = SqliteDatabase('mainDB')

class Fotos(Model):
    
    nombre = CharField()
    ruta = CharField()
    clase = CharField()
    createdAt = DateTimeField()
    updatedAt = DateTimeField()

    class Meta:
        database = db # This model uses the "mesaMod.db" database.

def connectDataBase():
    db.connect()
    if not (Fotos.table_exists()):
        db.create_tables([Fotos])
        print('tabla creada')

def close():
    db.close()
