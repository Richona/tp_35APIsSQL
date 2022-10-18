const {Op} = require("sequelize");
const db = require('../database/models');
const { createError } = require('../helpers');


const genresController = {
    list: async (req, res) => {
        let { limit, order} = req.query
        let fields = ["name", "ranking"]
        try {
            if (!fields.includes(order)) {
                throw createError(400, "Solo se puede ordenar por 'name' o 'ranking'")
            }

            let total = await db.Genre.count()
            let genres = await db.Genre.findAll({
                attributes:{
                    exclude: ["created_at", "updated_at"]
                },
                limit: limit ? +limit : 5,
                order: [order? order : "id"]
            })
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200
                },
                data: {
                    items: genres.length,
                    total,
                    genres
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message,
            })
        }
    },
    getById: async (req, res) => {
        const {id} = req.params

        try {
            if(isNaN(id)){
                throw createError(400, "El id debe ser un numero")
            }

            let genre = await db.Genre.findByPk(id)

            if (!genre) {
                throw createError(404, "No se encuentra este ID")
            }

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200
                },
                data: {
                    genre,
                    total: 1
                }
            })
            
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message,
            })
        }
    },
    getByName: async (req, res) => {
        const {name} = req.params

        try {
            if (!name) {
                throw createError(400, "El nombre es obligatorio")
            }

            let genre = await db.Genre.findOne({
                where:{
                    name:{
                        [Op.substring]:name
                    }
                }
            })

            if (!genre) {
                throw createError(404, "No se encuentra un genero con ese nombre")
            }

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200
                },
                data: {
                    genre,
                    total: 1
                }
            })

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message,
            })
        }
    }

}

module.exports = genresController;