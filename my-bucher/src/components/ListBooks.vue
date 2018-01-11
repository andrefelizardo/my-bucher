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
                    <div class="md-layout-item md-size-25">
                        <md-card>
                            <md-card-media-cover md-solid>
                                <md-card-media md-ratio="1:2">
                                    <img src="../assets/lei-do-triunfo.jpg" alt="Skyscraper">
                                </md-card-media>

                                <md-card-area>
                                <md-card-header>
                                    <span class="md-title">A Lei do Triunfo</span>
                                    <span class="md-subtitle">Napoleon Hill</span>
                                </md-card-header>

                                <md-card-content>
                                    Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent.
                                </md-card-content>

                                <md-card-actions>
                                    <md-button>Emprestar</md-button>
                                </md-card-actions>
                                </md-card-area>
                            </md-card-media-cover>
                        </md-card>
                    </div>
                    <div class="md-layout-item md-size-25">
                        <md-card>
                            <md-card-media-cover md-solid>
                                <md-card-media md-ratio="1:2">
                                    <img src="../assets/lei-do-triunfo.jpg" alt="A Lei do Triunfo">
                                </md-card-media>

                                <md-card-area>
                                <md-card-header>
                                    <span class="md-title">A Lei do Triunfo</span>
                                    <span class="md-subtitle">Napoleon Hill</span>
                                </md-card-header>

                                <md-card-content>
                                    Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent.
                                </md-card-content>

                                <md-card-actions>
                                    <md-button>Emprestar</md-button>
                                </md-card-actions>
                                </md-card-area>
                            </md-card-media-cover>
                        </md-card>
                    </div>
                    <div class="md-layout-item md-size-25">
                        <md-card>
                            <md-card-media-cover md-solid>
                                <md-card-media md-ratio="1:2">
                                    <img src="../assets/lei-do-triunfo.jpg" alt="Skyscraper">
                                </md-card-media>

                                <md-card-area>
                                <md-card-header>
                                    <span class="md-title">A Lei do Triunfo</span>
                                    <span class="md-subtitle">Napoleon Hill</span>
                                </md-card-header>

                                <md-card-content>
                                    Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent.
                                </md-card-content>

                                <md-card-actions>
                                    <md-button>Emprestar</md-button>
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
  name: 'ListBooks'
}
</script>

<style scoped>

</style>

<style>
.menu-icon {
  margin-right: 25px;
}

.main {
  margin: 50px 80px 0;
}
</style>
