'use strict'
const Buqueuser = use('App/Models/Buqueuser')
const CargoBuque = use('App/Models/Cargobuque')
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

        return response.json({
            data: userbuques
        })
    }
}

module.exports = BuqueuserController
