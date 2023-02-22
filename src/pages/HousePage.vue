<template>
    <div class="HousePage" v-if="house">
    <div class="container">
        <div class="row my-3">
        <div class="col-md-8 m-auto">
            <HouseCard :house="house" :showSeller="false" />
            <div class="card my-2">
            <div class="card-body elevation-5 rounded-bottom">
                <p>
                {{ house.description }}
                </p>

                <div>
                <ul>
                    <li>Year: {{ house.year }}</li>
                    <li>Price: ${{ house.price }}</li>
                </ul>
                </div>

            </div>

            <div class="card-footer d-flex align-items-center justify-content-between pt-5 elevation-1 rounded-top">
                <div>
                <button @click="removeListing" v-if="account.id == house.creatorId" class="btn btn-danger">remove
                    listing</button>
                </div>
                <div>
                <span class="me-2">{{ house.seller.name }}</span>
                <img height="64" width="64" :src="house.seller.picture" :alt="house.seller.name">
                </div>
            </div>

            </div>
        </div>
        </div>
    </div>

    </div>
    <div v-else>
    <h1>loading....<i class="mdi mdi-pinwheel mdi-spin"></i></h1>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
    const route = useRoute()
    const houseId = route.params.houseId

    async function getHouseById() {
        try {
        await housesService.getHouseById(houseId)
        } catch (error) {
        Pop.error(error, '[Getting House By Id]')
        }
    }

    onMounted(() => {
        getHouseById()
    })



    return {
        houseId,
        account: computed(() => AppState.account),
        house: computed(() => AppState.house),
        async removeListing() {
        try {
            await housesService.removeHouse(houseId)
            router.push({ name: 'House' })
        } catch (error) {
            Pop.error(error, '[Removing House]')
        }
        }
    }
    }
}
</script>


<style lang="scss" scoped></style>
