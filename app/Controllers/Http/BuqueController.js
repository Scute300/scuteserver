'use strict'
const Buque = use('App/Models/Buque')
const Cargo = use('App/Models/Cargo')
class BuqueController {
    async añadirbuque({auth, request, response}){
        try{
            const data = request.only(['tipo','nombrebuque', 'eslora', 'calado', 'manga', 'dwt', 'puntal', 'year', 'IMO', 'banderas', 'clases'])
            const buque = new Buque()
            buque.tipo = data.tipo
            buque.user_id = auth.current.user.id
            buque.nombrebuque = data.nombrebuque
            buque.eslora = data.eslora
            buque.calado = data.calado
            buque.manga= data.manga
            buque.dwt = data.dwt
            buque.puntal = data.puntal
            buque.year = data.year
            buque.IMO= data.IMO
            buque.banderas = data.banderas
            buque.clases = data.clases
            await buque.save()
    
            return response.json({
                status: 'sure'
            })
        } catch(error){
            return response.status(400).json({
                message:error
            })
        }

    }

    async obtenerbuques({auth,request,response}){
        const buques = await Buque.all() 
        const cargos= await Cargo.all()
    
        return response.json({
            status: 'sure',
            data: buques,
            cargos: cargos
        })
    }

    async eliminarbuque({auth, params, response}){
        const buque = await Buque.findBy('id',params.id)
        await buque.delete()
    
        return response.json({
            status: 'sure',
            data: 'Buque eliminado'
        })
    }

    async verunbuque({auth, params, response}){
        const buque = await Buque.findBy('id',params.id)
        
        return response.json({
            status: 'sure',
            data: buque
        })

    }

    async editarbuque({auth, params, response, request}){
        const data= request.only(['tipo','nombrebuque', 'empresa', 'eslora', 'calado', 'manga', 'dwt', 'puntal'])
        const buque = await Buque.findBy('id',params.id)
        buque.tipo = data.tipo
        buque.nombrebuque = data.nombrebuque
        buque.empresa = data.empresa
        buque.eslora = data.eslora
        buque.calado = data.potencia
        buque.manga= data.manga
        buque.dwt = data.dwt
        buque.puntal = data.puntal
        await buque.save()
    
        return response.json({
            status: 'sure',
            data: buque
        })

    }
}

module.exports = BuqueController
