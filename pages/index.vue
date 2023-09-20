<template>
    <div :class="$style.MainPage">
        <h1>qq</h1>

        <button @click="handleModal">
            open modal
        </button>

        <div v-if="modal.visible">JOPA!!!</div>
    </div>
</template>

<script setup lang="ts">
    import {useModal} from '@/pinia/modal';
    import TestModal from '@/components/test/TestModal.vue';

    const modal = useModal();

    function handleModal() {
        modal.open(TestModal, {
            title: 'test modal'
        })
    }
</script>

<style
    module
    lang="scss"
>

    .MainPage {
        //
    }

</style>
