<main class="container mx-auto px-8 md:px-12 pb-20 pt-12 animate-pulse select-none">
    <div class="flex flex-col md:grid md:grid-cols-2 gap-6 lg:grid-cols-2 mt-4 select-none">
        {#each Array(20) as _, i}
            <li class="hidden">{i + 1}</li>
            <div class="rounded-xl select-none w-full">
                <div class="flex items-center justify-center w-full h-48 bg-gray-100 rounded-xl">
                    <div class="px-4 py-2">
                        <div class="mt-3 h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                        <div class="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                        <div class="h-2 bg-gray-200 rounded-full max-w-[410px] mb-2.5"></div>
                        <div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>
