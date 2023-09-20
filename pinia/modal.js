import {defineStore} from 'pinia';

export const useModal = defineStore('modal', {
    state: () => ({
        isOpen: false,
        component: {},
        attrs: [],
        onClose: undefined,
        visible: false,
    }),
    
    actions: {
        open(component, attrs, onClose) {
            this.isOpen = true;
            this.attrs = attrs;
            this.component = markRaw(component)
            this.onClose = (...args) => onClose(...args)
            
        },
        
        close() {
            this.isOpen = false;
            this.attrs = {};
            this.component = [];
            this.onClose = undefined
        },
        
        testOn() {
            this.visible = true
        },
        
        testOff() {
            this.visible = false
        }
    }
})
