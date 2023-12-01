// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    // Datos de ejemplo para el gráfico de crecimiento de seguidores
    const growthData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Crecimiento de Seguidores',
            data: [100, 200, 300, 400, 500, 600],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Configuración del gráfico
    const growthConfig = {
        type: 'bar',
        data: growthData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Growth Chart'
                }
            }
        }
    };

    // Crear el gráfico en el canvas con el id "growthChart"
    const growthChart = new Chart(document.getElementById('growthChart'), growthConfig);


    const followerGrowthData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
            label: 'Seguidores',
            data: [1000, 1200, 1500, 1800, 2000],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Configuración del gráfico de crecimiento de seguidores
    const followerGrowthConfig = {
        type: 'line',
        data: followerGrowthData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Follower Growth Chart'
                }
            }
        }
    };

    // Obtén el contexto del canvas y crea el gráfico de crecimiento de seguidores
    const followerGrowthChartCanvas = document.getElementById('followerGrowthChart');
    const followerGrowthChart = new Chart(followerGrowthChartCanvas, followerGrowthConfig);

    const activityHoursData = {
        labels: ['8 AM', '12 PM', '4 PM', '8 PM', '12 AM'],
        datasets: [{
            label: 'Número de Actividades',
            data: [50, 120, 80, 200, 30],
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    // Configuración del gráfico de horarios de mayor actividad
    const activityHoursConfig = {
        type: 'bar',
        data: activityHoursData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Horarios de Mayor Actividad'
                }
            }
        }
    };

    // Obtén el contexto del canvas y crea el gráfico de horarios de mayor actividad
    const activityHoursChartCanvas = document.getElementById('activityHoursChart');
    const activityHoursChart = new Chart(activityHoursChartCanvas, activityHoursConfig);

    const recentPostsData = [
        { id: 1, date: '2023-01-15', likes: 150, comments: 20, content: '¡Nuevo video de baile! 💃', image: 'assets/images/post1.jpg' },
        { id: 2, date: '2023-01-14', likes: 120, comments: 15, content: 'Increíbles momentos detrás de cámaras. 🎥', image: 'assets/images/post2.jpg' },
        { id: 3, date: '2023-01-13', likes: 200, comments: 25, content: '¡Adivina la canción! 🎶', image: 'assets/images/post3.jpg' }
        // Agrega más datos según sea necesario
    ];
    

    // Función para generar HTML de una publicación
    function generatePostHTML(post) {
        return `
            <div class="post">
                ${post.image ? `<img src="${post.image}" alt="Publicación">` : ''}
                <p>${post.content}</p>
                <p>${post.likes} Me gusta | ${post.comments} Comentarios</p>
                <p>Publicado el ${post.date}</p>
            </div>
        `;
    }

    // Inserta las publicaciones en el feed
    const postFeed = document.getElementById('postFeed');
    recentPostsData.forEach(post => {
        postFeed.innerHTML += generatePostHTML(post);
    });

      // Datos de ejemplo para gráficos demográficos
      const ageData = {
        labels: ['Menores de 18', '18-24', '25-34', '35-44', '45-54', 'Mayores de 55'],
        datasets: [{
            label: 'Edad',
            data: [10, 20, 30, 25, 10, 5],
            backgroundColor: ['#ff9999', '#ffcc66', '#99ff99', '#66b3ff', '#c2c2f0', '#ffb3e6'],
            borderWidth: 1
        }]
    };

    const genderData = {
        labels: ['Masculino', 'Femenino', 'No Binario'],
        datasets: [{
            label: 'Género',
            data: [40, 55, 5],
            backgroundColor: ['#66b3ff', '#ffcc66', '#c2c2f0'],
            borderWidth: 1
        }]
    };

    const locationData = {
        labels: ['Ciudad A', 'Ciudad B', 'Ciudad C', 'Ciudad D', 'Ciudad E'],
        datasets: [{
            label: 'Ubicación Geográfica',
            data: [25, 20, 15, 30, 10],
            backgroundColor: ['#ffcc66', '#99ff99', '#c2c2f0', '#ffb3e6', '#66b3ff'],
            borderWidth: 1
        }]
    };

    // Configuración de los gráficos demográficos
    const ageConfig = {
        type: 'pie',
        data: ageData
    };

    const genderConfig = {
        type: 'pie',
        data: genderData
    };

    const locationConfig = {
        type: 'pie',
        data: locationData
    };

    // Crear gráficos demográficos en los canvas correspondientes
    const ageChart = new Chart(document.getElementById('ageChart'), ageConfig);
    const genderChart = new Chart(document.getElementById('genderChart'), genderConfig);
    const locationChart = new Chart(document.getElementById('locationChart'), locationConfig);

    const scheduledPostsData = [
        { title: 'Publicación 1', start: '2023-12-14T10:00:00' },
        { title: 'Publicación 2', start: '2023-12-24T15:30:00' },
        // Agrega más datos según sea necesario
    ];

    // Inicializa el calendario
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: scheduledPostsData
    });

    const interactionData = {
        labels: ['Me gusta', 'Comentarios', 'Compartidos'],
        datasets: [{
            label: 'Interacción',
            data: [150, 30, 20],
            backgroundColor: [
                'rgba(75, 192, 192, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 205, 86, 0.7)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)',
            ],
            borderWidth: 1,
        }]
    };

    // Configuración del gráfico de interacción
    const interactionConfig = {
        type: 'bar',
        data: interactionData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Interaction Chart'
                }
            }
        }
    };

    // Obtén el contexto del canvas y crea el gráfico
    const interactionChartCanvas = document.getElementById('interactionChart');
    const interactionChart = new Chart(interactionChartCanvas, interactionConfig);


});
