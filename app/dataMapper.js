const { Client } = require('pg');
const connectionString = process.env.PG_URL;
const pg = new Client({
    connectionString: connectionString
});
pg.connect();

const dataMapper = {
    getAllPokemon: (callback) => {
        let query = 'SELECT * FROM pokemon';
        pg.query(query, (error, result) => {
            if (error) {
                console.error(error.stack);
            } else {
                callback(result.rows);
            }
        })
    },
    getOnePokemon: (numero, callback) => {
        let query = {
            text: `SELECT
            pokemon.*,
            pokemon_type.*,
            list_type.id AS type_pokemon,
            list_type.name,
            list_type.color
            FROM pokemon
            JOIN pokemon_type
            ON pokemon.numero = pokemon_type.pokemon_numero
            JOIN list_type
            ON pokemon_type.type_id = list_type.id
            WHERE pokemon.numero = $1`,
            values: [numero]
        }
        pg.query(query, (error, result) => {
            if (error) {
                console.error(error.stack);
            } else {
                callback(result.rows[0]);
            }
        })
    },
    getPokemonType: (numero, callback) => {
        let query = {
            text: `SELECT
            list_type.name,
            list_type.color
            FROM pokemon
            JOIN pokemon_type
            ON pokemon.numero = pokemon_type.pokemon_numero
            JOIN list_type
            ON pokemon_type.type_id = list_type.id
            WHERE pokemon.numero = $1;`,
            values: [numero]
        }
        pg.query(query, (error, result) => {
            if (error) {
                console.error(error.stack);
            } else {
                callback(result.rows);
            }
        })
    },
    getPokemonTypes: (callback) => {
        let query = {
            text: `SELECT * FROM list_type`
        }
        pg.query(query, (error, result) => {
            if (error) {
                console.error(error.stack);
            } else {
                callback(result.rows);
            }
        })
    },
    getPokemonByType: (id, callback) => {
        let query = {
            text: `SELECT
            pokemon.id AS pokemon_id,
            pokemon.*
            FROM pokemon
            JOIN pokemon_type
            ON pokemon.numero = pokemon_type.pokemon_numero
            JOIN list_type
            ON pokemon_type.type_id = list_type.id
            WHERE pokemon_type.type_id = $1`,
            values: [id]
        }
        pg.query(query, (error, result) => {
            if (error) {
                console.error(error.stack);
            } else {
                callback(result.rows);
            }
        })
    }
};

module.exports = dataMapper;

