<template>
    <transition duration="500" mode="out-in" name="modal" @before-enter="beforeEnter" @after-leave="afterLeave">
        <div
            v-if="modal.isOpen"
            :key="key"
            :class="[$style.TheModal, classList]"
        >
            <div :class="$style.wrapper">
                <div
                    v-clickoutside="close"
                    :class="$style.container"
                    data-scroll-lock-scrollable
                >
                    <component
                        :is="component || modal.component"
                        :key="key"
                        v-bind="attrs"
                        @change="onChange"
                        @close="close"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    import {useModal} from '@/pinia/modal';
    import {storeToRefs} from 'pinia';

    const $style = useCssModule();
    const modal = useModal();
    const {component, attrs, onClose} = storeToRefs(modal)
    // const component = ref(null);
    // const attrs = ref(null);
    // const onClose = ref(null);
    const key = ref(null);
    const isPopover = ref(false);

    const classList = computed(() => ({
        [$style[`_${attrs?.position}`]]: modal.attrs.position,
        [$style._popover]: isPopover.value,
    }))

    // onBeforeMount(() => {
        // const {$modal} = useNuxtApp();
        //
        // $modal.on('open', open)
        // $modal.on('update', update)
        // $modal.on('close', close)
    // })

    function beforeEnter() {}
    function afterLeave() {}
    function onChange() {}

    function open(component, attrs, onClose) {
        console.log('open from TheModal');
        modal.component = component;
        modal.attrs = attrs;
        modal.onClose = onClose();
    }

    function update() {

    }
    function close() {
        modal.close()
    }
</script>

<style module lang="scss">
    .TheModal {
        &._popover {
            z-index: calc(#{$header-z-index} - 10);

            &._left .wrapper {
                left: 0;
            }

            &._right .wrapper {
                right: 0;
            }

            .wrapper {
                position: absolute;
                width: 30rem;

                @include respond-to(mobile) {
                    width: 100vw;
                }
            }

            .container {
                position: absolute;
                bottom: 0;
                overflow: hidden;
                width: 100%;
            }
        }

        &._left {
            &:global(.modal-enter),
            &:global(.modal-leave-active) {
                .container {
                    transform: translate3d(-100%, 0, 0);
                }
            }
        }

        &._right {
            &:global(.modal-enter),
            &:global(.modal-leave-active) {
                .container {
                    transform: translate3d(100%, 0, 0);
                }
            }
        }

        &:global(.modal-enter-active),
        &:global(.modal-leave-to) {
            &:after {
                opacity: 1;
                transition: opacity .3s ease;
            }

            .container {
                opacity: 1;
                transform: translate3d(0, 0, 0);
                transition: opacity .2s ease .3s, transform .2s ease .3s;
            }
        }

        &:global(.modal-enter),
        &:global(.modal-leave-active) {
            &:after {
                opacity: 0;
                transition: opacity .3s ease .2s;
            }

            .container {
                opacity: 0;
                transform: translate3d(100%, 0, 0);
                transition: opacity .2s ease, transform .2s ease;

                @include respond-to(tablet) {
                    transform: translate3d(0, 100%, 0);
                }
            }
        }

        &:after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            background-color: rgba($base-400, .4);
        }

        .wrapper {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            width: 100%;
            height: 100%;
        }

        .container {
            overflow-y: auto;
            display: block;
            width: 51.6rem;
            height: 100%;
            background-color: #fff;

            @include respond-to(tablet) {
                width: 44rem;
            }

            @include respond-to(mobile) {
                position: absolute;
                bottom: 0;
                width: 100%;
            }
        }
    }
</style>
