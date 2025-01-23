const ctx = document.getElementById('myChart'); //pillamos el canvas
let meses = [] //variable que insertaremos los meses
let ventas = [] //variable que insertaremos las ventas
let media = 0 //variable para calcular la media de las ventas

async function getData(){ //function asincrona para api fetch
  fetch("../jsons/Ventas-A1-UT4.json") //pillamos los datos de las ventas
  .then(function(datos){ //entonces...
      return datos.json() //devolmemos los datos en tipo json
  })
  .then(function(datosJSON){ //entonces, con los datos en tipo json...
      for (const e of datosJSON.ventas) { //recorremos cada venta
        meses.push(e.mes) //sacamos el mes y lo metemos en la variable de los meses
        ventas.push(e.ventas_euros) //sacamos las ventas y lo metemos en la variable de las ventas
        media += e.ventas_euros //sumamos las ventas
      }
      media = media/12 //se divide entre 12 para sacar la media
  })
  .catch(function(error){ //si hay un error
      console.log(error) //sale en consola
  })
}
function hacerGrafico() { //funcion para hacer el grafico
  new Chart(ctx, { //hacemos un nuevo chart
    type: 'bar', //de tipo barra
    data: { //con los datos
      labels: meses, //pasamos de label todos los meses (con la variable)
      datasets: [{ //los datos en si
        label: 'ventas (en €)', //el label para referenciar a cada dato
        data: ventas, //pasamos todas las ventas (con la variable)
        backgroundColor: function(valor){ //funcion para el color de fondo
          const value = valor.dataset.data[valor.dataIndex]; //sacamos el valor
          return value < media ? '#581845' : '#FFC300';  //si el valor es menos que la media, devolvemos el primer color, si no el segundo
        },
        borderWidth: 4, //anchura de 4 px del borde
        borderColor: function(valor){ //funcion para el color de fondo
          const value = valor.dataset.data[valor.dataIndex]; //sacamos el valor
          return value < media ? '#900C3F' : '#581845';  //si el valor es menos que la media, devolvemos el primer color, si no el segundo
        } //color de borde negro
      }]
    },
    options: { //opciones
      scales: { 
        y: { 
          beginAtZero: true //el eje Y, empieza en 0, y no en el minimo de los datos
        }
      }
    },
    plugins:[]
  });  
}

getData() //llamamos a la funcion para el api fetch
hacerGrafico() //llamamos a la funcion para hacer el grafico
