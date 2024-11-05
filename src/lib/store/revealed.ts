import { get, writable, type Writable } from "svelte/store";

class RevealedCount {
    store: Writable<number>;

    constructor() {
        this.store = writable(0);
    }

    inc() {
        this.store.update(store => store + 1);
    }

    dec() {
        if (this.count > 0) {
            this.store.update(store => store - 1);
        }
    }

    restore() {
        this.store.set(0);
    }

    get count(): number {
        return get(this.store);
    }

    get full() {
        return this.count === 2;
    }
}

export const revealedCount = new RevealedCount();