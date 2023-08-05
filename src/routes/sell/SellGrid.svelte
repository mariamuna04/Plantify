<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let sellList;
    export let cartList;

    const dispatch = createEventDispatcher();

    const onAddToCart = (event) => {
        cartList = {name: event.target.id, price: event.target.name};

        dispatch('incrementCount',cartList);
    };
    // import plant_not_found from '$lib/assets/plant_not_found.svg';
</script>

<main class="container mx-auto px-8 md:px-12 pb-20 pt-12">
    <div class="flex flex-col md:grid md:grid-cols-2 gap-6 lg:grid-cols-4 mt-4">
        {#if sellList.length === 0}
            <div class="flex flex-col justify-center align-middle items-center col-span-full row-span-full w-full mx-auto h-full">
                <h1 class="text-2xl font-black text-center">No Items found</h1>
            </div>
        {:else}
            {#each sellList as item}
                <div class="rounded-xl hover:drop-shadow-xl group w-full transition-all duration-300 ease-in-out flex flex-col items-center align-middle justify-between">
                    <img class=" rounded-xl h-[23rem] w-64" alt="" src="{item.imageURL}"/>
                    <div class="px-4 py-2">
                        <h1 class="custom-transition font-black text-xl text-center group-hover:text-teal-700">{item.product_name}</h1>
                        <h1 class="font-thin text-xs text-zinc-400 group-hover:text-zinc-600">{item.description}</h1>
                        <h1 class="font-thin text-xs text-zinc-400 group-hover:text-zinc-600">{item.manufacturer}</h1>
                        <h1 class="font-thin text-xs text-zinc-400 group-hover:text-zinc-600">{item.rating}</h1>
                        <h1 class="font-thin text-xs text-zinc-400 group-hover:text-zinc-600">{item.price}</h1>
                        <button name={item.price} id={item.product_name} on:click={onAddToCart} class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full w-full mt-2">
                            Add to Cart
                        </button>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</main>



