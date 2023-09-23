import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalStore', {
    state: () => ({
        isOpen: false,
        component: {},
        attrs: [],
    }),

    actions: {
        open(component, attrs, onClose) {
            this.isOpen = true;
            this.attrs = attrs;
            // eslint-disable-next-line no-undef
            this.component = markRaw(component);
        },

        close() {
            this.isOpen = false;
            this.attrs = {};
            this.component = [];
        },
    },
});
