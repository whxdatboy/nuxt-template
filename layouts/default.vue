<template>
    <div :class="$style.page">
        <main :class="$style.main">
            <NuxtPage />
        </main>

        <TheModal :class="$style.modal" />
    </div>
</template>

<script setup>
    // Utils
    import { calcVhInit, calcVhDestroy } from '@/assets/js/utils/common-utils';

    // Components
    import TheModal from '@/components/layout/TheModal.vue';

    onMounted(() => {
        nextTick(() => {
            calcVhInit();

            const touchSupported =
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0;
        });
    });
</script>

<style module lang="scss">
    .page {
        max-width: calc(100% - var(--lock-offset, 0));
    }

    .main {
        position: relative;
        /* stylelint-disable */
        min-height: -webkit-fill-available;
        /* stylelint-enable */
    }

    .page {
        display: block;
    }

    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
    }
</style>
