<template>
    <div class="delete-button">
        <button v-on:click="$emit('deleteRecord', id, index)">DELETE</button>
        <button v-on:click="$emit('UpdateRecord', id, index)">EDIT</button>
    </div>
</template>

<script>

//    export default Vue.extend({
export default ({
  name: 'DeleteBt',
  props: {
    id: Number,
    index: Number
  }
})
</script>
