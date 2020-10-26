'use strict'
const Buqueuser = use('App/Models/Buqueuser')
const CargoBuque = use('App/Models/Cargobuque')
const Cargo = use('App/Models/Cargo')
class BuqueuserController {
    async añadirusuario({auth, request, response}){
        const data = request.only(['username', 'name', 'apellido', 'email', 'cargo', 'rol', 'doublecheck', 'buques'])
        const user = await new Buqueuser()
        user.username = data.username
        user.name = data.name 
        user.apellido = data.apellido
        user.email = data.email
        user.cargo = data.cargo
        user.rol = data.rol
        user.doublecheck = data.doublecheck
        await user.save()

        if(data.buques.length !== 0){
            for(let i = 0; i < data.buques.length; i++){
                const cargo = await new CargoBuque()
                cargo.buqueuser_id = user.id
                cargo.buque = data.buques[i]
                await cargo.save()
            }
        }

        return response.json({
            data: 'sure'
        })
    }

    async obteneruserbuques ({auth, request, response }){
        const userbuques = await Buqueuser.all()
        const cargos= await Cargo.all()
        return response.json({
            data: userbuques,
            cargos: cargos
        })
    }

    async obtenerunusuario ({params, response}){
        const usuario = await Buqueuser.query()
        .where('id', params.id )
        .with('cargobuques')
        .fetch()

        return response.json({
            data: usuario
        })
    }

    async eliminarusuario ({params, response}){
        const usuario = await Buqueuser.findBy('id',params.id)
        await usuario.delete()
        return response.json({
            data: 'eliminado'
        })
    }

    async editarusuario({auth, request,response, params}){
        const data = request.only(['username', 'name', 'apellido', 'email', 'cargo', 'rol', 'doublecheck', 'buques'])
        const user= await Buqueuser.findBy('id',params.id)
        user.username = data.username
        user.name = data.name 
        user.apellido = data.apellido
        user.email = data.email
        user.cargo = data.cargo
        user.rol = data.rol
        user.doublecheck = data.doublecheck
        await user.save()
        console.log(user)
        if(data.buques.length !== 0){
            const buscarbuque = await CargoBuque.query()
            .where('buqueuser_id', user.id )
            .delete()
            console.log(buscarbuque)
            for(let i = 0; i < data.buques.length; i++){

                const cargo = await new CargoBuque()
                cargo.buqueuser_id = user.id
                cargo.buque = data.buques[i]
                await cargo.save()
            }
        }

        return response.json({
            data: 'sure'
        })

    }
}

module.exports = BuqueuserController
