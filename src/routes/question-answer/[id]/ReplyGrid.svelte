<script lang="ts">
    // Variable plantList holds all the plant data
    import {Session} from "../../Session";

    export let experiences: Array<Experience>;

    let answer: string = "";

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 100);
    }

</script>

<main class="container mx-auto px-8 md:px-12 pb-20 pt-12">
    <h1 class="font-black text-3xl w-full text-center mb-8 text-zinc-500">Experiences shared by others</h1>
    <div class="flex flex-col md:grid md:grid-cols-1 gap-6 lg:grid-cols-1 mt-4">
        {#if experiences.length === 0}
            <div class="flex flex-col justify-center align-middle items-center col-span-full row-span-full w-full mx-auto h-full">
                No experiences found
            </div>
        {:else}
            {#each experiences as experience}

                <div class="flex flex-col gap-4 rounded-xl bg-zinc-100 p-6 hover:drop-shadow-xl group w-96 transition-all duration-300 ease-in-out">
                    <div class="flex flex-row gap-4 align-middle items-center justify-between">
                        <div class="flex flex-row gap-4 align-middle items-center">
                            <img class='w-12 h-12 mr-2 rounded-full'
                                 src='https://api.dicebear.com/6.x/avataaars/svg?seed={generateRandomNumber()}%20Hill&backgroundColor=b6e3f4,c0aede,d1d4f9'
                                 height='48px' width='48px' alt="">
                            <div class="flex flex-col gap-1">
                                <h1 class="font-bold text-xl">{experience.name}</h1>
                                <h1 class="text-zinc-500 font-bold">{experience.email}</h1>
                            </div>
                        </div>

                    </div>

                    <div>
                        <h1 class="select-none">{experience.body}</h1>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</main>
