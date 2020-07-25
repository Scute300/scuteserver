'use strict'
const Monedero = use ('App/Models/Monedero')

class MonederoController {
    async obtain({auth, response}){
            const user = auth.current.user
            const monedero = await Monedero.findByOrFail('user_id', user.id)
            console.log(monedero)
            return response.json('Hola mundo')
    }
}

module.exports = MonederoController
