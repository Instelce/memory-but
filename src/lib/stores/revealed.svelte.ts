import { get, writable, type Writable } from "svelte/store";

class RevealedCount {
    count = $state(0);

    inc() {
        this.count++;
    }

    dec() {
        this.count--;
    }

    restore() {
        this.count = 0;
    }

    get full() {
        return this.count === 2;
    }
}

export const revealedCount = new RevealedCount();