<template>
  <div>
      <md-toolbar>
          <h3 class="md-title"><md-icon class="menu-icon">menu</md-icon> myBücher - Seus livros em um só lugar</h3>
      </md-toolbar>
      <main class="main">
            <div class="md-row">
                <md-field md-inline>
                    <label>Digite o nome de um livro</label>
                    <md-input></md-input>
                </md-field>
            </div>
            <div class="md-row">
                <div class="md-layout md-gutter md-alignment-top-center">
                    <div class="md-layout-item md-size-25" v-for="book in books">
                        <md-card>
                            <md-card-media-cover md-solid>
                                <md-card-media>
                                    <img :src="`/static/images/${book.cover}`" :alt="book.title">
                                </md-card-media>

                                <md-card-area>
                                <md-card-header>
                                    <span class="md-title">{{ book.title }}</span>
                                    <span class="md-subtitle">{{ book.author }}</span>
                                </md-card-header>

                                <md-card-content>{{ book.description }}</md-card-content>

                                <md-card-actions>
                                    <md-button v-if="!book.loan">Emprestar</md-button>
                                </md-card-actions>
                                </md-card-area>
                            </md-card-media-cover>
                        </md-card>
                    </div>
                </div>
            </div>
      </main>
  </div>
</template>

<script>
export default {
  name: 'ListBooks',

    data () {
        return {
            books: [
                {
                    title: 'A lei do triunfo',
                    author: 'Napoleon Hill',
                    description: 'Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent.',
                    cover: 'lei-do-triunfo.jpg',
                    loan: false,
                    read: false 
                },
                {
                    title: 'A Startup enxuta',
                    author: 'Eric Ries',
                    description: 'Como os empreendedores atuais utilizam a inovação contínua para criar empresas extremamente bem-sucedidas.',
                    cover: 'startup-enxuta.jpg',
                    loan: false,
                    read: false 
                }
            ]
        }
    }
}
</script>

<style scoped>
    .md-card-media img {
        min-height: 400px
    }
    .md-card-content {
        max-height: 80px;
    }
</style>


<style>
.menu-icon {
  margin-right: 25px;
}

.main {
  margin: 50px 80px 0;
}
</style>
