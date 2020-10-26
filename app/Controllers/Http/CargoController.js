'use strict'
const Cargo = use('App/Models/Cargo')
class CargoController {
    async ponercargo({rquest, response}){
        const data= request.only(['cargo'])
        const cargo = new Cargo()
        await cargo.save()
    } 

}

module.exports = CargoController
