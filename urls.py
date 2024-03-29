from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()


urlpatterns = patterns('',
#AJAX
    url(r'^ajax\/login$', 'mypfc.mipfc.views.login', name='login'),
    url(r'^input\/token$', 'mypfc.mipfc.views.token', name='token'),
    url(r'^ajax\/actividades$', 'mypfc.mipfc.views.actividades', name='actividades'),
    url(r'^ajax\/registrarse$', 'mypfc.mipfc.views.registrarse', name='registrarse'),
    url(r'^ajax\/grupo$', 'mypfc.mipfc.views.grupo', name='grupo'),
    url(r'^ajax\/logout$', 'mypfc.mipfc.views.logout', name='logout'),
    url(r'^ajax\/prorrata$', 'mypfc.mipfc.views.prorrata', name='prorrata'),
    url(r'^ajax\/registrarprorrata$', 'mypfc.mipfc.views.registrarprorrata', name='registrarprorrata'),
    url(r'^ajax\/trimestres$', 'mypfc.mipfc.views.trimestres', name='trimestres'),
    url(r'^ajax\/enviartrimestres$', 'mypfc.mipfc.views.enviartrimestres', name='enviartrimestres'),
    url(r'^ajax\/actividadusuario$', 'mypfc.mipfc.views.actividadusuario', name='actividadusuario'),
    url(r'^ajax\/gasto$', 'mypfc.mipfc.views.gasto', name='gasto'),
    url(r'^ajax\/ingreso$', 'mypfc.mipfc.views.ingreso', name='ingreso'),
    url(r'^ajax\/pedirliquidacion$', 'mypfc.mipfc.views.pedirliquidacion', name='pedirliquidacion'),
    url(r'^ajax\/obtenerliquidacion$', 'mypfc.mipfc.views.obtenerliquidacion', name='obtenerliquidacion'),
    url(r'^ajax\/cerrar$', 'mypfc.mipfc.views.cerrar', name='cerrar'),
    url(r'^ajax\/estadisticasanuales$', 'mypfc.mipfc.views.estadisticasanuales', name='estadisticasanuales'),
    url(r'^ajax\/estadisticastrimestrales$', 'mypfc.mipfc.views.estadisticastrimestrales', name='estadisticastrimestrales'),
    url(r'^ajax\/oficinascercanas$', 'mypfc.mipfc.views.oficinascercanas', name='oficinascercanas'),
    url(r'^ajax\/nombreusuario$', 'mypfc.mipfc.views.nombreusuario', name='nombreusuario'),
    url(r'^ajax\/cambiarnombre$', 'mypfc.mipfc.views.cambiarnombre', name='cambiarnombre'),
    url(r'^ajax\/cambiarpass$', 'mypfc.mipfc.views.cambiarpass', name='cambiarpass'),
    url(r'^ajax\/eliminaractividad$', 'mypfc.mipfc.views.eliminaractividad', name='eliminaractividad'),
    
    
    #HTML
    url(r'^$', 'mypfc.mipfc.views.inicio', name='inicio'),
    url(r'^registro$', 'mypfc.mipfc.views.registro', name='registro'),
    url(r'^gastosingresos$', 'mypfc.mipfc.views.gastosingresos', name='gastosingresos'),
    url(r'^liquidacion$', 'mypfc.mipfc.views.liquidacion', name='liquidacion'),
    url(r'^ayuda$', 'mypfc.mipfc.views.ayuda', name='ayuda'),
    url(r'^estadisticas$', 'mypfc.mipfc.views.estadisticas', name='estadisticas'),
    url(r'^qr$', 'mypfc.mipfc.views.qr', name='qr'),
    url(r'^geo$', 'mypfc.mipfc.views.geo', name='geo'),
     url(r'^configuracion$', 'mypfc.mipfc.views.configuracion', name='configuracion')
    
    
    
    
    # Examples:
    # url(r'^$', 'mypfc.views.home', name='home'),
    # url(r'^mypfc/', include('mypfc.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
