import json
import models
# Create your views here.
from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render
from mipfc.models import Actividad, Usuario, Prorrata, Trimestre, ActividadUsuario, Gasto, Ingreso
from datetime import date


errores = {"ok": 0, "sesionperdida": 1, "datoserroneos": 2, "datosduplicados": 3, "sindatos": 4}


def inicio(req):
    if logearse(req):
        return render(req, "menu.html")
    else:
        return render(req, "inicio.html")

def registro(req):
    return render(req, "contact.html")
    


def login(req):
    #todo comprobar los campos enviados
    usuario = Usuario.objects.filter(email = req.POST["usuario"], contrasena = req.POST["password"])
    if len(usuario) > 0:
        respuesta = {"error":errores["ok"]}
        req.session["usuario"] = usuario[0]
    else:
        respuesta = {"error":errores["datoserroneos"]}
    
    return HttpResponse(json.dumps(respuesta))

def logout(req):
    req.session["usuario"] = None
    respuesta = {"error":errores["ok"]}
    return HttpResponse(json.dumps(respuesta))
    

def token(req):
    return render(req, "token.html")

def actividades(req):
    
    act = Actividad.objects.all()
    if (len(act)==0):
        for i in [("comercio", 21), ("transporte",21), ("servicios",21)]:
            newActividad = Actividad(actividad = i[0], iva = i[1])
            newActividad.save()
        Actividad(actividad = "otros", pk=-1, iva = 0).save()
        return actividades(req)
    respuesta = {"listaactividades":[],
    "error":errores["ok"]}
    for i in act:
        respuesta["listaactividades"].append({"id":i.pk,"actividad":i.actividad})
    return HttpResponse(json.dumps(respuesta))

def registrarse(req):
    #Mejor comprobar en registrarse otra vez
    user = Usuario.objects.filter(email = req.POST["email"])
    if len(user) > 0:
        respuesta={"error":errores["datosduplicados"]}
    else:
        
        
        usuario = Usuario(nombre = req.POST["name"], 
        apellidos = req.POST["apellidos"], email = req.POST["email"], 
        contrasena = req.POST["pass"])
        usuario.save()
        req.session["usuario"] = usuario
        print(len(req.POST.getlist("tipoactividad")))
        for act in req.POST.getlist("tipoactividad"):
            if act != "-1":
                actividad = Actividad.objects.get(pk=act)
            else:
                print("guardadno nueva actividad")
                actividad = Actividad( actividad=req.POST["nuevaactividad"], iva= req.POST["tipoiva"])
                actividad.save()
            usuact = ActividadUsuario(usuario = usuario, tipoactividad = actividad)
            usuact.save()
        respuesta = {"error":errores["ok"]}
    return HttpResponse(json.dumps(respuesta))

def logearse(req):
    return "usuario" in req.session and req.session["usuario"] != None    

def respuestainicial(req):
    respuesta = {"error":errores["ok"]}
    if logearse(req) == False:
        respuesta["error"] = errores["sesionperdida"]
    return respuesta

def prorrata(req):
    respuesta = respuestainicial(req)
    if respuesta["error"] == 0:
        if "anio" in req.GET:
            anio = int(req.GET["anio"])
            usuario = req.session["usuario"]
            prorr = Prorrata.objects.filter(usuario = usuario, anio = anio)
            if len(prorr) == 0:
                respuesta["error"] = errores["sindatos"]
            else:
                respuesta["porcentaje"] = prorr[0].porcentaje
        else:
            respuesta["error"] = errores["datoserroneos"]    
    return HttpResponse(json.dumps(respuesta))

def registrarprorrata(req):
    respuesta = respuestainicial(req)
    if respuesta["error"] == 0:
        pror = Prorrata(porcentaje = req.POST["prorrata"], anio = req.POST["anio"], usuario = req.session["usuario"])
        pror.save()
    return HttpResponse(json.dumps(respuesta))

def trimestres(req):
    respuesta = respuestainicial(req)
    if respuesta["error"] == 0:
        usuario = req.session["usuario"]
        anio = req.GET["anio"] #TODO: falta controlar si no me envian el anio
        trim = Trimestre.objects.filter(usuario = usuario, anio = anio)
        lostrimestres = []
        for eltrimestre in trim:
            trimestre = {"ingreso":eltrimestre.ingreso, "gasto":eltrimestre.gasto,
            "anio":eltrimestre.anio, "numerotrimestre":eltrimestre.numerotrimestre}
            lostrimestres.append(trimestre)
        respuesta["trimestres"] = lostrimestres
    return HttpResponse(json.dumps(respuesta))

def enviartrimestres(req):
    
    respuesta = respuestainicial(req)
    if respuesta["error"] == 0:
       
        usuario = req.session["usuario"]
        anio = int(req.POST["anio"])-1
        if (req.POST["prorrata"]) != "":
            pror = Prorrata(porcentaje = req.POST["prorrata"], anio = anio , usuario = usuario)
            pror.save()
        else:
            pror = Prorrata.objects.get(usuario=usuario, anio=anio)
        valorprorrata = int(pror.porcentaje)
        print(valorprorrata)
        anio = int(req.POST["anio"])
        if req.POST["gasto_1"] == "":
            gasto_1 = 0
        else:
            gasto_1 = float(req.POST["gasto_1"])
        if req.POST["ingreso_1"] == "":
            ingreso_1 = 0
        else:
            ingreso_1 = float(req.POST["ingreso_1"])
        tcuotaivasoportado = gasto_1*0.21
        tcuotaivadevengado = ingreso_1*0.21
        soportadodeducible = (tcuotaivasoportado*valorprorrata)/100.0
        lostrimestres = Trimestre.objects.filter(usuario = usuario, numerotrimestre = 1, anio = anio)
        ivaingresar = tcuotaivadevengado-soportadodeducible
        if len(lostrimestres) == 0:
            trimestre = Trimestre(usuario = usuario, gasto = gasto_1, ingreso = ingreso_1, 
            numerotrimestre = 1, anio = anio, tcuotaivadevengado = tcuotaivadevengado, 
            tcuotaivasoportado = tcuotaivasoportado,soportadodeducible = soportadodeducible, 
            ivaingresar = ivaingresar)
        else:
            trimestre = lostrimestres[0]
            trimestre.gasto = gasto_1
            trimestre.ingreso = ingreso_1
            trimestre.tcuotaivadevengado = tcuotaivadevengado
            trimestre.tcuoutaivasoportado = tcuotaivasoportado
            trimestre.soportadodeducible = soportadodeducible
            trimestre.ivaingresar = ivaingresar
        trimestre.save()
        if req.POST["gasto_2"] == "":
            gasto_2 = 0
        else:
            gasto_2 = float(req.POST["gasto_2"])
        if req.POST["ingreso_2"] == "":
            ingreso_2 = 0
        else:
            ingreso_2 = float(req.POST["ingreso_2"])
        tcuotaivasoportado = gasto_2*0.21
        tcuotaivadevengado = ingreso_2*0.21
        soportadodeducible = (tcuotaivasoportado*valorprorrata)/100.0
        trimestre = Trimestre(usuario = usuario, gasto = gasto_2, ingreso = ingreso_2, numerotrimestre = 2, anio = anio, tcuotaivadevengado = tcuotaivadevengado, 
            tcuotaivasoportado = tcuotaivasoportado,soportadodeducible = soportadodeducible, 
            ivaingresar = tcuotaivadevengado-soportadodeducible)
        trimestre.save()
        if req.POST["gasto_3"] == "":
            gasto_3 = 0
        else:
            gasto_3 = float(req.POST["gasto_3"])
        
        if req.POST["ingreso_3"] == "":
            ingreso_3 = 0
        else:
            ingreso_3 = float(req.POST["ingreso_3"])
        tcuotaivasoportado = gasto_3*0.21
        tcuotaivadevengado = ingreso_3*0.21
        soportadodeducible = (tcuotaivasoportado*valorprorrata)/100.0
        trimestre = Trimestre(usuario = usuario, gasto = gasto_3, ingreso = ingreso_3, numerotrimestre = 3, anio = anio, tcuotaivadevengado = tcuotaivadevengado, 
            tcuotaivasoportado = tcuotaivasoportado,soportadodeducible = soportadodeducible, 
            ivaingresar = tcuotaivadevengado-soportadodeducible)
        trimestre.save()
        if req.POST["gasto_4"] == "":
            gasto_4 = 0
        else:
            gasto_4 = float(req.POST["gasto_4"])
        if req.POST["ingreso_4"] == "":
            ingreso_4 = 0
        else:
            ingreso_4 = float(req.POST["ingreso_4"])
        tcuotaivasoportado = gasto_4*0.21
        tcuotaivadevengado = ingreso_4*0.21
        soportadodeducible = (tcuotaivasoportado*valorprorrata)/100.0
        trimestre = Trimestre(usuario = usuario, gasto = gasto_4, ingreso = ingreso_4, numerotrimestre = 4, anio = anio, tcuotaivadevengado = tcuotaivadevengado, 
            tcuotaivasoportado = tcuotaivasoportado,soportadodeducible = soportadodeducible, 
            ivaingresar = tcuotaivadevengado-soportadodeducible)
        trimestre.save()
    return HttpResponse(json.dumps(respuesta))

def actividadusuario(req):
    respuesta = respuestainicial(req)
    if respuesta["error"] == 0:
        respuesta["actividades"]=[]
        usuario = req.session["usuario"]
        actividadusuario = ActividadUsuario.objects.filter(usuario = usuario)
        for actusu in actividadusuario:
            act = actusu.tipoactividad
            respuesta["actividades"].append({"id":act.pk, "nombre":act.actividad})
       
    return HttpResponse(json.dumps(respuesta))

def gasto(req):
    respuesta = respuestainicial(req)
    if respuesta["error"] == 0:
        usuario = req.session["usuario"]
        #TODO hacer validadores
        valor = float(req.POST["valor"])
        #Formate siempre dd/mm/aa
        dia = int(req.POST["fecha"][0:2])
        mes = int(req.POST["fecha"][3:5])
        anio = int(req.POST["fecha"][6:])
        print anio
        fecha = date(year = anio,month = mes,day=dia)
        trimestre = (mes-1)/(3)+1
        tipoactividad = Actividad.objects.get(pk=req.POST["tipoactividad"])
        iva = tipoactividad.iva
        cuotaiva = valor*(float(iva)/100)
        adqintracomunitaria = "adqintracomunitaria" in req.POST
        
        gasto = Gasto(usuario = usuario, valor = valor, concepto = req.POST["concepto"], fecha = fecha, trimestre = trimestre, anio = anio, tipoactividad = tipoactividad, iva = iva, cuotaiva = cuotaiva, adqintracomunitaria=adqintracomunitaria)
        gasto.save()
    return HttpResponse(json.dumps(respuesta))
    

        
    