const repository = require('../repositories/books-repository')

exports.post = async (req, res, next) => {
  try {
    await repository.create(req.body)
    res.status(201).send({
      message: 'Produto cadadastro com sucesso.'
    })
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar sua requisição: ${error}`
    })
  }
}

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get()
    res.status(201).send(data)
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar sua requisição: ${error}`
    })
  }
}
