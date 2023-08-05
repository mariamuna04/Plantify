<script>
    import {cartArray} from "../../../stores.ts";
    let localCartArray = [];


    cartArray.subscribe((value) => {
        localCartArray = value;
    });


</script>

<main>
    {#each localCartArray as item}
        <div class="rounded-xl hover:drop-shadow-xl group w-full transition-all duration-300 ease-in-out flex flex-col items-center align-middle justify-between">
            <div class="px-4 py-2">
                <h1 class="custom-transition font-black text-xl text-center group-hover:text-teal-700">{item.name}</h1>
                <h1 class="font-thin text-xs text-zinc-400 group-hover:text-zinc-600">{item.price}</h1>
                <button class="bg-gray-400 p-1 rounded-lg"> Remove </button>
            </div>
        </div>
    {/each}
</main>