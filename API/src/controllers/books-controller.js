const repository = require('../repositories/books-repository')
const ValidationContract = require('../validators/validator')

exports.post = async (req, res, next) => {
  let contract = new ValidationContract()

  contract.hasMinLength(req.body.title, 4, 'O título deve conter no mínimo 4 caracteres.')
  contract.hasMinLength(req.body.author, 4, 'O nome do autor deve conter no mínimo 4 caracteres.')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

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

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body)
    res.status(200).send({
      message: 'Livro atualizado com sucesso.'
    })
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar sua requisição: ${error}`
    })
  }
}

exports.putLoan = async (req, res, next) => {
  try {
    await repository.loan(req.params.id, req.body)
    res.status(200).send({
      message: 'Livro emprestado com sucesso.'
    })
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar sua requisição: ${error}`
    })
  }
}

exports.putRead = async (req, res, next) => {
  try {
    await repository.read(req.params.id, req.body.status)
    res.status(200).send({
      message: 'Status do livro alterado com sucesso.'
    })
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar sua requisição: ${error}`
    })
  }
}
