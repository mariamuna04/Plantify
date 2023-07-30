<script lang="ts">
    export let plantList;
    import plant_not_found from '$lib/assets/plant_not_found.svg';
</script>

<main class="container mx-auto px-8 md:px-12 pb-20 pt-12">
    <div class="flex flex-col md:grid md:grid-cols-2 gap-6 lg:grid-cols-4 mt-4">
        {#if plantList.length === 0}
            <div class="flex flex-col justify-center align-middle items-center col-span-full row-span-full w-full mx-auto h-full">
                <img class=" h-[28rem] object-contain" src="{plant_not_found}" alt=""/>
            </div>
        {:else}
            {#each plantList as flower}
                <a class="rounded-xl hover:drop-shadow-xl group w-full transition-all duration-300 ease-in-out"
                   href="/plants/{flower.name}">
                    <img class="rounded-xl h-44 object-cover w-full" src="{flower.imageURL}" alt=""/>
                    <div class="px-4 py-2">
                        <h1 class="custom-transition font-black text-xl text-center group-hover:text-teal-700">{flower.name}</h1>
                        <h1 class="font-thin text-xs text-zinc-400 group-hover:text-zinc-600">{flower.description}</h1>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
</main>



