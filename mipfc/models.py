from django.db import models


class Actividad(models.Model):
        actividad=models.TextField()
        
class Usuario(models.Model):
    nombre=models.TextField()
    apellidos=models.TextField()
    email=models.TextField()
    contrasena=models.TextField()
    
class ActividadUsuario(models.Model):
    usuario=models.ForeignKey(Usuario)
    tipoactividad=models.ForeignKey(Actividad)
    
class Prorrata(models.Model):
    usuario = models.ForeignKey(Usuario)
    anio = models.IntegerField()
    porcentaje = models.IntegerField()
    
class Trimestre(models.Model):
    usuario = models.ForeignKey(Usuario)
    gasto = models.DecimalField(max_digits = 9,decimal_places=2)
    ingreso = models.DecimalField(max_digits = 9, decimal_places=2)
    anio = models.IntegerField()
    numerotrimestre = models.IntegerField()
    tcuotaivadevengado = models.DecimalField(max_digits = 9, decimal_places=2)
    tcuotaivasoportado = models.DecimalField(max_digits = 9, decimal_places=2)
    soportadodeducible = models.DecimalField(max_digits = 9, decimal_places=2)
    ivaingresar = models.DecimalField(max_digits = 9, decimal_places=2)


# Create your models here.
