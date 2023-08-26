<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import cartIcon from "$lib/assets/icons/cart.svg";

    export let sellList: any;
    export let cartList;

    const dispatch = createEventDispatcher();

    let clicked:boolean = false;


    const onAddToCart = (event:any) => {
        clicked = true;
        // Change text to added to cart
        event.target.innerText = "Added to Cart";
        // disable button
        event.target.disabled = true;
        // Change bg to white and text to teal
        event.target.classList.remove('bg-teal-500');
        event.target.classList.add('bg-white');
        event.target.classList.remove('hover:bg-teal-600');
        event.target.classList.add('hover:bg-white');
        event.target.classList.remove('text-white');
        event.target.classList.add('text-teal-500');
        // wait for 1 sec then revert
        setTimeout(() => {
            event.target.innerText = "Add to Cart";
            event.target.classList.remove('bg-white');
            event.target.classList.add('bg-teal-500');
            event.target.classList.remove('hover:bg-white');
            event.target.classList.add('hover:bg-teal-600');
            event.target.classList.remove('text-teal-500');
            event.target.classList.add('text-white');
            event.target.disabled = false;
        }, 1000);


        cartList = {name: event.target.id, price: event.target.name, quantity: 1};
        dispatch('incrementCount', cartList);
        setTimeout(() => {
            clicked = false;
        }, 1000);

    };


</script>

<main class="container mx-auto px-8 md:px-32 pb-20 pt-12">
    <div class="flex flex-col md:grid md:grid-cols-2 gap-6 lg:grid-cols-4 mt-4">
        {#if sellList.length === 0}
            <div class="flex flex-col justify-center align-middle items-center col-span-full row-span-full w-full mx-auto h-full">
                <h1 class="text-2xl font-black text-center">No Items found</h1>
            </div>
        {:else}
            {#each sellList as item}
                <div class="rounded-xl border hover:drop-shadow-xl group transition-all duration-300 ease-in-out flex flex-col items-center align-middle justify-between">
                    <img class="rounded-t-xl h-[25rem]" alt="" src="{item.imageURL}"/>
                    <div class="px-4 py-4">
                        <h1 class="custom-transition font-black text-2xl group-hover:text-teal-700">{item.product_name}</h1>
                        <h1 class=" text-sm font-semibold text-zinc-400 transition-all duration-300 group-hover:text-zinc-900">{item.description}</h1>

                        <div class="flex flex-row-reverse gap-4 justify-between items-end">
                            <h1 class="text-xl font-bold px-4 py-2 rounded-full group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300">$ {item.price}</h1>
                            <div>
                                <h1 class="font-thin  text-zinc-400 group-hover:text-zinc-600 text-xs pt-3 ">Brought to you by <br><span
                                        class="font-bold text-xl"> {item.manufacturer}</span></h1>
                                <h1 class="font-thin  group-hover:text-zinc-600">Rated <span
                                        class="font-bold text-green-600">{item.rating}</span> out of 5</h1>
                            </div>
                        </div>

                    </div>

                    <button name={item.price} id={item.product_name} on:click={onAddToCart}
                            class=" flex justify-center align-middle items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-4 rounded-b-xl w-full">
                        <span>
                            <img src="{cartIcon}" class="h-6 w-6" alt=""/>
                        </span>
                        Add to Cart
                    </button>
                </div>
            {/each}
        {/if}
    </div>
</main>



