<script lang="ts">

    import heart_svg from "$lib/assets/icons/heart.svg";

    // Variable plantList holds all the plant data
    export let experiences: Array<Experience>;

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 100);
    }

    const onLikeClickAction = async (event: MouseEvent) => {
        const id = (event.target as HTMLButtonElement).id;
        const res = await fetch('/api/LikeExperience', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        });

        location.reload();
    }
</script>

<main class="container mx-auto px-8 md:px-12 pb-20 pt-12">
    <h1 class="font-black text-3xl w-full text-center mb-8 text-zinc-500">Experiences shared by others</h1>
    <div class="flex flex-col md:grid md:grid-cols-2 gap-6 lg:grid-cols-2 mt-4">
        {#if experiences.length === 0}
            <div class="flex flex-col justify-center align-middle items-center col-span-full row-span-full w-full mx-auto h-full">
                No experiences found
            </div>
        {:else}
            {#each experiences as experience}

                <div class="flex flex-col gap-4 rounded-xl bg-zinc-100 p-6 hover:drop-shadow-xl group w-full transition-all duration-300 ease-in-out">

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

                        <button id="{experience._id}" on:click={onLikeClickAction}>
                            <span class="flex flex-row justify-end items-end gap-2  p-2 rounded-full hover:bg-pink-100 transition-all duration-300 ease-in-out ">
                                <img src={heart_svg} class="w-6 h-6" alt="">
                                <span class="text-zinc-500 font-bold">{experience.likes}</span>
                            </span>
                        </button>
                    </div>

                    <div>
                        <h1 class="select-none">{experience.body}</h1>
                    </div>


                </div>
            {/each}
        {/if}
    </div>
</main>
