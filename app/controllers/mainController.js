const path = require('path');
const dataMapper = require(path.join(__dirname, '..', 'dataMapper'));

const mainController = {
    homePage: (req, res) => {
        dataMapper.getAllPokemon((listPokemon) => {
            res.render('home', {listPokemon: listPokemon});
        });
    },
    detailPage: (req,res) => {
        let numero = req.params.numero;
            dataMapper.getOnePokemon(numero, (detail) => {
                console.log(detail);
            dataMapper.getPokemonType(numero, (type) => {
                console.log(type);
                res.render('detail', {
                    detail: detail,
                    typePokemon: type
                });
            });    
        });
    },
    typesPage : (req, res) => {
        dataMapper.getPokemonTypes((listTypes) => {
            console.log(listTypes);
            res.render('types', {listTypes: listTypes});
        });
    },
    typeFilter : (req, res) => {
        let id = req.params.id;
        dataMapper.getPokemonByType(id, (listPokemon) => {
            console.log(listPokemon);
            res.render('typeFilter', {listPokemon: listPokemon});
        });
    }
}

module.exports = mainController;