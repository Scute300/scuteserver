'use strict'
const Buque = use('App/Models/Buque')
class BuqueController {
    async añadirbuque({auth, request, response}){

        try{
            const data = request.only(['nombrebuque', 'empresa', 'eslora', 'potencia', 'manga', 'dwt', 'puntal'])
            const buque = new Buque()
            buque.usert_id = auth.current.user.id
            buque.empresa = data.empresa
            buque.eslora = data.eslora
            buque.potencia = data.potencia
            buque.manga= data.manga
            buque.DWT = data.dwt
            buque.puntal = data.puntal
            await buque.save()
    
            return response.json({
                status: 'sure'
            })
        } catch(error){
            return response.json({})
            console.log(error)
        }

    }

    async obtenerbuques({auth,request,response}){
        const buques = await Buque.all() 
    
        return response.json({
            status: 'sure',
            data: buques
        })
    }
}

module.exports = BuqueController
