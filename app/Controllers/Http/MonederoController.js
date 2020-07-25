'use strict'
const Monedero = use ('App/Models/Monedero')

class MonederoController {
    async obtenermonedero({auth, request, response}){
        const user = auth.current.user
        const monedero = await Monedero.findByOrFail('user_id', user.id)
        console.log(monedero)
    }
}

module.exports = MonederoController
