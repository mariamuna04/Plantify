import {writable, type Writable} from "svelte/store";
import type {Cookie} from "@sveltejs/kit/src/runtime/server/page/types";

export const toast = writable({
    title: '',
    body: '',
    isOpen: false,
});
export const cartArray = writable([]);

export const googleInitialized = writable(false);