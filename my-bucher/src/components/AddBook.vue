<template>
    <main class="main">
        <form novalidate class="md-layout-row md-gutter">
            <md-card class="md-flex-50 md-flex-small-100">
                <md-card-header>
                    <div class="md-title">Adicionar livro</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout-row md-layout-wrap md-gutter">
                        <div class="md-flex md-flex-small-100">
                            <md-field>
                                <label for="title">Título</label>
                                <md-input name="title" id="title" required></md-input>
                                <span class="md-error">Título é obrigatório</span>
                            </md-field>
                        </div>

                        <div class="md-flex md-flex-small-100">
                            <md-field>
                                <label for="author">Autor</label>
                                <md-input name="author" id="author" required></md-input>
                                <span class="md-error">Autor é obrigatório</span>
                            </md-field>
                        </div>

                        <div class="md-flex md-flex-small-100">
                            <md-field>
                                <label for="description">Descrição</label>
                                <md-input maxlength="100"></md-input>
                            </md-field>
                        </div>

                        <div class="md-flex md-flex-small-100">
                            <md-field>
                                <label for="category">Categoria</label>
                                <md-select name="category" id="category" required>
                                    <md-option value="administration">Administração</md-option>
                                    <md-option value="art">Arte</md-option>
                                    <md-option value="self-help">Autoajuda</md-option>
                                    <md-option value="computing">Computação</md-option>
                                    <md-option value="novel">Romance</md-option>
                                </md-select>
                            </md-field>
                        </div>

                        <div class="md-flex md-flex-small-100">
                            <md-field>
                                <label for="cover">Capa</label>
                                <md-file accept="image/*"></md-file>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" />

                <md-card-actions>
                    <md-button type="submit" class="md-primary">Adicionar livro</md-button>
                </md-card-actions>

            </md-card>

            <md-snackbar>O livro tal foi salvo com sucesso!</md-snackbar>
        </form>
    </main>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>
