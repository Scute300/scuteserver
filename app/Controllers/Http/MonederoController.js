'use strict'
const Monedero = use ('App/Models/Monedero')

class MonederoController {
    async obtain({auth, response}){
        try{
            const user = auth.current.user
            const monedero = await Monedero.findByOrFail('user_id', user.id)
            console.log(monedero)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = MonederoController
