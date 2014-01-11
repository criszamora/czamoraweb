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
    url(r'^ajax\/logout$', 'mypfc.mipfc.views.logout', name='logout'),
    url(r'^ajax\/prorrata$', 'mypfc.mipfc.views.prorrata', name='prorrata'),
    url(r'^ajax\/registrarprorrata$', 'mypfc.mipfc.views.registrarprorrata', name='registrarprorrata'),
    url(r'^ajax\/trimestres$', 'mypfc.mipfc.views.trimestres', name='trimestres'),
    url(r'^ajax\/enviartrimestres$', 'mypfc.mipfc.views.enviartrimestres', name='enviartrimestres'),
    url(r'^ajax\/actividadusuario$', 'mypfc.mipfc.views.actividadusuario', name='actividadusuario'),
    
    #HTML
    url(r'^$', 'mypfc.mipfc.views.inicio', name='inicio'),
    url(r'^registro$', 'mypfc.mipfc.views.registro', name='registro')
    
    
    # Examples:
    # url(r'^$', 'mypfc.views.home', name='home'),
    # url(r'^mypfc/', include('mypfc.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
