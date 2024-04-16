// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// ---------- CHARTS ----------

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: [10, 8, 6, 4, 2],
      name: 'Products',
    },
  ],
  chart: {
    type: 'bar',
    background: 'transparent',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  stroke: {
    colors: ['transparent'],
    show: true,
    width: 2,
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
  xaxis: {
    categories: ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Camera'],
    title: {
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      show: true,
      color: '#55596e',
    },
    axisTicks: {
      show: true,
      color: '#55596e',
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Count',
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
};

const barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: 'Purchase Orders',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Sales Orders',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    type: 'area',
    background: 'transparent',
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['#00ab57', '#d50000'],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: 'vertical',
    },
    type: 'gradient',
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  markers: {
    size: 6,
    strokeColors: '#1b2635',
    strokeWidth: 3,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: [
    {
      title: {
        text: 'Purchase Orders',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
    {
      opposite: true,
      title: {
        text: 'Sales Orders',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
};

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();

/*
Funciones propias!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

//!DOM DE ELEMENTOS DEL Dashboard
let mainContainer = document.querySelector("#mainContainer"); //Contenedor
let home = document.querySelector("#option1");
let quotes = document.querySelector("#option2");
let products = document.querySelector("#option3");
let accounts = document.querySelector("#option4");

let pageTitle = document.title;


//Funcion para la administracion de alertas
function createAlerts(newQuotes) {

  let countAlerts = document.querySelector("#countAlerts");
  let showNotifications = document.querySelector("#notifications2") ;

  if(newQuotes > 0) {

    if (newQuotes > 0) {
      let quotes = document.createElement("li");
      let link = document.createElement("a");
      link.href ="./Quotes";

      link.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> Hay nuevas solicitudes de cotizaciones`;

      showNotifications.appendChild(quotes);
      quotes.appendChild(link);

    } 
    
    countAlerts.textContent = newQuotes;

  } else {

    let empty = document.createElement("li");
    empty.textContent = "No hay notificaciones nuevas";
    empty.setAttribute("style", "font-size: 14px;");
    showNotifications.appendChild(empty);
  }

}

//Funcion para obtener la fecha
function getDate() {

  function updateDateTime() {
    var date = new Date();
    var dateString = `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    document.querySelector("#showdate").textContent = dateString;
  }

  // Actualizar la fecha y hora cada segundo
  setInterval(updateDateTime, 1000);

  // Mostrar la fecha y hora actual por primera vez
  updateDateTime();
}

//Funcion para mostra la pantalla activa
function clearActive() {
  home.classList.remove("active");
  quotes.classList.remove("active");
  products.classList.remove("active");
  if (accounts) {
    accounts.classList.remove("active");
  }
}

//Evento para cargar funciones al cargar la pagina

document.addEventListener("DOMContentLoaded", () => {

  clearActive();

  //Nota: Agregar js para que detecte...
  if (pageTitle == "Panel de administración - Tecnosite") {
    home.classList.add("active");
  } else if (pageTitle == "Cotizaciones - Tecnosite") {
    quotes.classList.add("active");
  } else if (pageTitle == "Productos/Categorias - Tecnosite" || pageTitle == "Detalles del producto - Tecnosite") {
    products.classList.add("active");
  } else if (pageTitle == "Gestion cuentas - Tecnosite") {
    accounts.classList.add("active");
  }

  //Peticion ajax para contar la cantidad de nuevas cotizaciones disponibles
  $.ajax({
    type: "GET",
    url: "./dash-action",
    data: {request : "count-quotes"},
    dataType: "json",
    success: function (response) {
      if (response > 0) {
        createAlerts(response);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
      console.error(textStatus);
      console.error(errorThrown);
  }
  });


  getDate();

  // Funcion para las notificaciones
  var dropdownMenuButton = document.getElementById('dropdownMenuButton1');
  var dropdownMenu = document.getElementById('dropdownMenu1');

  dropdownMenuButton.addEventListener('click', function() {
      if (dropdownMenu.style.display === 'block') {
          dropdownMenu.style.display = 'none';
      } else {
          dropdownMenu.style.display = 'block';
      }
  });

  // Cerrar el dropdown si se hace clic fuera de él
  document.addEventListener('click', function(event) {
      if (!dropdownMenuButton.contains(event.target)) {
          dropdownMenu.style.display = 'none';
      }
  });

});