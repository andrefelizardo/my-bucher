<template>
  <div>
      <main class="main">
            <div class="md-row">
                <md-field md-inline>
                    <label>nome ou autor</label>
                    <md-input @keyup="searchBooks" v-model.lazy="textSearch"></md-input>
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
            ],

            textSearch: '',

            allBooks: [
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
    },

    methods: {
        searchBooks: function() {
            const text = this.textSearch.toLowerCase();
            const books = this.books;
            const allBooks = this.allBooks;

            const newBooks = allBooks.filter((book) => book.title.toLowerCase().includes(text) || book.author.toLowerCase().includes(text))

            this.books = newBooks;
        }
    }

}
</script>

<style scoped>
.md-card-media img {
  min-height: 400px;
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
