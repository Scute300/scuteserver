'use strict'
import Buque from 'App/Models/Buque'
class BuqueController {
    async añadirbuque({auth, request, response}){
        const data = request.only(['nombrebuque', 'empresa', 'eslora', 'potencia', 'manga', 'DWT', 'puntal'])
        const buque = new Buque()
        buque.usert_id = auth.current.user.id
        buque.empresa = data.empresa
        buque.eslora = data.eslora
        buque.potencia = data.potencia
        buque.manga= data.manga
        buque.DWT = data.DWT
        buque.puntal = data.puntal
        await buque.save()

        return response.status(400).json({
            status: 'sure'
        })

    }
}

module.exports = BuqueController
