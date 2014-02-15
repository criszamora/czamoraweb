jQuery().ready(function(){
    jQuery("[name=estadistica]").change(function(){
        if (jQuery(this).val() == "0"){
            peticion("estadisticasanuales", function(respuesta){
                $('#grafica').highcharts({
            title: {
                text: 'Liquidaciones anuales',
                x: -20 //center
            },
            subtitle: {
                text: 'Tres últimos años',
                x: -20
            },
            xAxis: {
                categories: respuesta.anios
            },
            yAxis: {
                title: {
                    text: 'Euros (€)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '€'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Años',
                data: respuesta.liquidacion
            }]
        });
                
                
                
            })
        }
        else if (jQuery(this).val() == "1"){
            
            peticion("estadisticastrimestrales", function(respuesta){
                //incio peticiñon
                var categorias = []
                var gastos = []
                var ingresos = []
                var liquidacion = []
                
                for (var i = 0; i<respuesta.trimestres.length;i++){
                    categorias.push(respuesta.trimestres[i].nombre)
                    gastos.push(respuesta.trimestres[i].gastos)
                    ingresos.push(respuesta.trimestres[i].ingresos)
                    liquidacion.push(respuesta.trimestres[i].liquidacion)
                }
                $('#grafica').highcharts({
            chart: {
            },
            title: {
                text: 'Combination chart'
            },
            xAxis: {
                categories: categorias
            },
            tooltip: {
                formatter: function() {
                    var s;
                    if (this.point.name) { // the pie chart
                        s = ''+
                            this.point.name +': '+ this.y +' fruits';
                    } else {
                        s = ''+
                            this.x  +': '+ this.y;
                    }
                    return s;
                }
            },
            
            series: [{
                type: 'column',
                name: 'Gastos',
                data: gastos
            }, {
                type: 'column',
                name: 'Ingresos',
                data: ingresos
            }, {
                type: 'spline',
                name: 'Liquidación',
                data: liquidacion,
                marker: {
                	lineWidth: 2,
                	lineColor: Highcharts.getOptions().colors[3],
                	fillColor: 'white'
                }
            }]
        });
                //finpetición
            });
            
        }
    });
});