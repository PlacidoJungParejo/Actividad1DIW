const ctx = document.getElementById('myChart');
let meses = []
let ventas = []
let media = 0

async function getData(){
  fetch("./Ventas-A1-UT4.json")
  .then(function(datos){
      return datos.json()
  })
  .then(function(datosJSON){
      for (const e of datosJSON.ventas) {
        meses.push(e.mes)
        ventas.push(e.ventas_euros)
        media += e.ventas_euros
      }
      media = media/12 
  })
  .catch(function(error){
      console.log(error)
  })
}

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: meses,
    datasets: [{
      label: 'ventas (en €)',
      data: ventas,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
  plugins:[
    
  ]
});

getData()