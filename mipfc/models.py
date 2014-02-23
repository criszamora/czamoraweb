from django.db import models


class Actividad(models.Model):
        actividad=models.TextField()
        iva=models.IntegerField()
        
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
    actividad = models.ForeignKey(Actividad)
    
class Gasto(models.Model):
    usuario = models.ForeignKey(Usuario)
    valor = models.DecimalField(max_digits = 9,decimal_places=2)
    concepto = models.TextField()
    fecha = models.DateField()
    trimestre = models.IntegerField()
    anio = models.IntegerField()
    iva = models.IntegerField()
    cuotaiva = models.DecimalField(max_digits = 9,decimal_places=2)
    tipoactividad = models.ForeignKey(Actividad)
    adqintracomunitaria = models.BooleanField()
    
class Ingreso(models.Model):
    usuario = models.ForeignKey(Usuario)
    valor = models.DecimalField(max_digits = 9,decimal_places=2)
    concepto = models.TextField()
    fecha = models.DateField()
    trimestre = models.IntegerField()
    anio = models.IntegerField()
    iva = models.IntegerField()
    cuotaiva = models.DecimalField(max_digits = 9,decimal_places=2)
    tipoactividad = models.ForeignKey(Actividad)
    recargoequivalencia = models.DecimalField(max_digits = 9,decimal_places=2)

class Oficinas(models.Model):
    latitud = models.DecimalField(max_digits = 18,decimal_places=15)
    longitud = models.DecimalField(max_digits = 18,decimal_places=15)
    direccion = models.TextField()
    ciudad = models.TextField()
    nombre = models.TextField()
    telefono = models.TextField()


# Create your models here.
