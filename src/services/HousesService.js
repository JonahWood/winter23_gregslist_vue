import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class HousesService{
    async getHouses(){
        const res = await api.get('auth/api/houses')
        logger.log('[getted]', res.data)
        AppState.houses = res.data
        logger.log(AppState.houses)
    }

    async createHouse(houseData){
        const res = await api.post('auth/api/houses/', houseData)
        AppState.houses.push(res.data)
        return res.data
    }

    async editHouse(houseData){
        const res = await api.put('auth/api/houses/' + houseData.id, houseData)
        let i = AppState.houses.findIndex(h => h.id == houseData.id)
        if (i == -1) {
            throw new Error('wrongo')
        }
        AppState.houses.splice(i, 1, res.data)
    }

    async getHouseById(houseId){
        AppState.house = null
        const res = await api.delete('auth/api/houses/' + houseId)
        AppState.house = res.data
    }

    async removeHouse(houseId){
        const res = await api.delete('auth/api/houses/' + houseId)
        let i = AppState.houses.findIndex(h => h.id == houseId)
        if (i != -1) {
            AppState.houses.splice(i, 1)
        }
    }
}

export const housesService = new HousesService()