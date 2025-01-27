const ctx = document.getElementById('myChart'); //pillamos el canvas
let meses = [] //variable que insertaremos los meses
let ventas = [] //variable que insertaremos las ventas
let media = 0 //variable para calcular la media de las ventas

async function getData(){ //function asincrona para api fetch
  try {
    const response = await fetch("./jsons/Ventas-A1-UT4.json")
    const datosJSON = await response.json()
    
    for (const e of datosJSON.ventas) { //recorremos cada venta
      meses.push(e.mes) //sacamos el mes y lo metemos en la variable de los meses
      ventas.push(e.ventas_euros) //sacamos las ventas y lo metemos en la variable de las ventas
      media += e.ventas_euros //sumamos las ventas
    }
    media = media/12 //se divide entre 12 para sacar la media
    hacerGrafico() //llamamos a la funcion para hacer el grafico
  } catch(error) {
    console.error('Error al cargar los datos:', error)
    // Mostrar mensaje de error al usuario
    document.getElementById('chartjs').innerHTML = '<p class="error">Error al cargar los datos</p>'
  }
}

function hacerGrafico() { //funcion para hacer el grafico
  new Chart(ctx, { //hacemos un nuevo chart
    type: 'bar', //de tipo barra
    data: { //con los datos
      labels: meses, //pasamos de label todos los meses (con la variable)
      datasets: [{ //los datos en si
        label: 'Ventas mensuales (en €)', //el label para referenciar a cada dato
        data: ventas, //pasamos todas las ventas (con la variable)
        backgroundColor: function(valor){ //funcion para el color de fondo
          const value = valor.dataset.data[valor.dataIndex]; //sacamos el valor
          return value < media ? '#581845' : '#FFC300';  //si el valor es menos que la media, devolvemos el primer color, si no el segundo
        },
        borderWidth: 4, //anchura de 4 px del borde
        borderColor: function(valor){ //funcion para el color de fondo
          const value = valor.dataset.data[valor.dataIndex]; //sacamos el valor
          return value < media ? '#900C3F' : '#581845';  //si el valor es menos que la media, devolvemos el primer color, si no el segundo
        }
      }]
    },
    options: {
      responsive: true, //esto hace que sea responsive
      maintainAspectRatio: false, // mantiene la relacion de aspecto (asi no es muy pequeño)
      plugins: {
        title: { //añade un titulo al vancas
          display: true, //hace que el titulo aparezca
          text: 'Análisis de Ventas Mensuales', //texto del titulo
          font: { //fuente del titulo
            size: 20 //tamaño, 20 px
          }
        }
      },
      scales: { 
        y: { 
          beginAtZero: true, //el eje Y, empieza en 0, y no en el minimo de los datos
          title: { //añade un titulo al eje y
            display: true, //hace que el titulo aparezca
            text: 'Ventas (EUR)', //añade un texto al titulo
            font: { //fuente 
              size: 14 //tamaño 14 pixeles
            }
          }
        },
        x: {
          title: { //añade un titulo al eje x
            display: true,//hace que el titulo aparezca
            text: 'Meses',//añade un texto al titulo
            font: {//fuente 
              size: 14//tamaño 14 pixeles
            }
          }
        }
      }
    }
  });  
}

getData() //llamamos a la funcion para el api fetch
