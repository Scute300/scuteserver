'use strict'
const Monedero = use ('App/Models/Monedero')

class MonederoController {
    async obtain({auth, response}){
        try{
            const user = auth.current.user
            const monedero = await Monedero.query()
            .where('user_id', user.id)
            console.log(monedero)

            return response.json('Hola mundo')
        }catch(error){
            console.log(error)
            return response.status(400).json('hola mundo')
        }
    }
}

module.exports = MonederoController
