<template>
    <div>
        <h1>Lectures sur le site par jour</h1>
        <div class="chart">
            <canvas ref="lineChart"></canvas>
        </div>
        <div class="container">
            <div class="column">
                <!-- Content for the left column goes here -->
                <h2>Articles</h2>
                <div id="tableArticles">
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Image</th>
                                <th>Auteur</th>
                                <th>Numero</th>
                                <th>Date</th>
                                <th>Lectures</th>
                                <th>Rubrique</th>
                                <!-- Add more table headers for other attributes as needed -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(article, index) in articles" :key="index">
                                <td>{{ article.titreFront }}</td>
                                <td>
                                    <img style="max-width: 100%;"
                                        :src="`${baseUrl}/save/saveArticle/cover/${article.id}.png`">
                                </td>
                                <td>{{ article.auteur }}</td>
                                <td>{{ article.numeroParu }}</td>
                                <td>{{ article.date }}</td>
                                <td>{{ article.lectures }}</td>
                                <td>{{ rubriqueNameFromId(article.rubrique) }}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="column">
                <!-- Content for the right column goes here -->
                <h2>Archives</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Cover</th>
                                <th>Back</th>
                                <th>Numero</th>
                                <th>Date</th>
                                <th>Lectures</th>
                                <!-- Add more table headers for other attributes as needed -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(archive, index) in archives" :key="index">
                                <td>{{ archive.titre }}</td>
                                <td>{{ archive.description }}</td>
                                <td>
                                    <img style="max-width: 100%;"
                                        :src="`${baseUrl}/save/saveArchive/cover/${archive.id}.png`">
                                </td>
                                <td>
                                    <img style="max-width: 100%;"
                                        :src="`${baseUrl}/save/saveArchive/back/${archive.id}.png`">
                                </td>
                                <td>{{archive.numero }}</td>
                                <td>{{ archive.date }}</td>
                                <td>{{ archive.lectures }}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import Chart from 'chart.js/auto';
import axiosInstance from '@/axios';
import baseUrl from '@/config';
export default {
    data() {
        return {
            chart: null,
            articles: [],
            archives : [],
            rubriques: [],
            viewData: {
                labels: [], // Date labels
                data: [],   // View data
            },
            baseUrl : baseUrl
        };
    },
    async mounted() {
        // Simulated data (replace with your actual data)
        
       await this.getChartData()
        this.createChart();
        this.setArticles()
        this.setArchives()
    },
    methods: {
        rubriqueNameFromId(id) {
            var found = this.rubriques.find(rub => rub.id === id)
            if (found) {
                return found.rubrique
            } else {
                return "on a pas"
            }
        },
       async getChartData(){
            
            await  axiosInstance.get('/api/getLectures').then(
                response => {
                    const last6Days = response.data
                    // Calculate the difference between lectures for consecutive days
                    const differences = [];

                    for (let i = 1; i < last6Days.length; i++) {
                    const currentDay = last6Days[i];
                    const previousDay = last6Days[i - 1];
                    const difference = currentDay.lectures - previousDay.lectures;

                    // Add the difference to the new array
                    differences.push({ date: currentDay.date, "difference" : difference });
                    }
                    this.viewData.labels = differences.map(item => item.date);
                    this.viewData.data = differences.map(item => item.difference);
                }
            ).catch(error => console.log(error))
        },
        setArchives(){
          
          axiosInstance.get('/api/getAllArchives').then(
             response => {
                          this.archives = response.data
                      })
                      .catch(() => {
                        this.$message({
              message: 'Erreur récuperation des archives',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            });                      });
          
      },
        setArticles() {
            axiosInstance.get('/api/getrubriques').then(response =>
                this.rubriques = response.data).catch(() =>
                this.$message({
              message: 'Erreur récupération rubriques',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            }))
            //Be carefull different routes admin
            axiosInstance.get('/api/getAllArticles').then(
                response => {
                    this.articles = response.data
                })
                .catch(() => {
                    this.$message({
              message: 'Erreur lors de la récupération des articles',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            });
                    // Handle any errors
                });

        },
        createChart() {
            const ctx = this.$refs.lineChart.getContext('2d');

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.viewData.labels, // Keep your labels as strings
                    datasets: [
                        {
                            label: 'Vues par jour',
                            data: this.viewData.data,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category', // Use 'category' scale for the X-axis

                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Views',
                            },
                        },
                    },
                },
            });
        },

    }
};
</script>
  
<style scoped>
.chart {
    height: 500px;
}

/* Style for the outer container */
.container {
    display: flex;
    /* Use Flexbox to create columns */
}

/* Style for the individual columns */
.column {
    flex: 1;
    /* Equal width for both columns */
    padding: 20px;
    /* Add padding for spacing */
    border: 1px solid #ccc;
    /* Add a border for separation (optional) */
}

/* Add any custom CSS styles for your chart container here */</style>
  