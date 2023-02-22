<template>
    <form @submit.prevent="handleSubmit">
<div class="mb-3">
    <label for="make" class="form-label">bedrooms</label>
    <input required type="number" v-model="editable.bedrooms" class="form-control" id="make" placeholder="bedrooms..."
        name="make">
</div>

<div class="mb-3">
    <label for="make" class="form-label">bathrooms</label>
    <input required type="number" v-model="editable.bathrooms" class="form-control" id="make" placeholder="bathrooms..."
        name="make">
</div>

<div class="mb-3">
    <label for="make" class="form-label">levels</label>
    <input required type="number" v-model="editable.levels" class="form-control" id="make" placeholder="levels..."
        name="make">
</div>

<div class="mb-3">
    <label for="make" class="form-label">imgUrl</label>
    <input required type="text" v-model="editable.imgUrl" class="form-control" id="make" placeholder="imgUrl..."
        name="make">
</div>

<div class="mb-3">
    <label for="make" class="form-label">year</label>
    <input required type="number" v-model="editable.year" class="form-control" id="make" placeholder="year..."
        name="make">
</div>

<div class="mb-3">
    <label for="make" class="form-label">price</label>
    <input required type="number" v-model="editable.price" class="form-control" id="make" placeholder="price..."
        name="make">
</div>

<div class="mb-3">
    <label for="make" class="form-label">description</label>
    <input type="text" v-model="editable.description" class="form-control" id="make" placeholder="description..."
        name="make">
</div>


    <div>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
        {{ editable.id ? 'Save Changes' : 'Create House' }}
        </button>
    </div>
    </form>
</template>


<script>
import { ref } from 'vue';
import { router } from '../router.js';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {

const editable = ref({})

      // TODO make form work with edits

return {
        editable,
        async handleSubmit() {
        try {
            const house = editable.value.id
            ? await housesService.editHouse(editable.value)
            : await housesService.createHouse(editable.value)


            editable.value = {}
            if (house?.id) {
            router.push({ name: 'House', params: { houseId: house.id } })
            }
            // if (editable.value.id) {
            //   await carsService.editCar(editable.value)
            // }else{
            //   await carsService.createCar(editable.value)
            // }
        } catch (error) {
            Pop.error(error, '[Submitting House]')
        }
        }

    }
    }
}
</script>

<style lang="scss" scoped></style>
