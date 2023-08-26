<script>
    import {Session} from "../Session";
    import dashboard_welcome from "$lib/assets/dashboard-welcome.svg";
    import down_arrow from "$lib/assets/icons/down-arrow.svg";
</script>

<main class="bg-gradient-to-b from-green-100 via-green-50 to-white">
    <div class="container mx-auto px-12 md:px-36 pt-12">
        <div class="flex justify-center mt-4 w-full">
            <div class="flex flex-col w-full justify-end">
                <h1 class="text-6xl font-black text-[#453c30]">
                    Hi there!
                </h1>
                <svg class="w-full h-fit">
                    <text x="0%" y="60%" class="w-full">
                        {Session.getName()}
                    </text>
                </svg>
            </div>
            <img class="w-[450px]" src="{dashboard_welcome}" alt="">
        </div>

        <h1 class="animate-fadeIn transition-all duration-700 text-center
        text-6xl bg-clip-text text-transparent mt-20 font-black
        bg-gradient-to-l from-emerald-700 to-emerald-500">
            Welcome to the world of plants
        </h1>

        <div class="flex flex-col gap-4 justify-center">
            <h1 class="animate-fadeIn transition-all duration-700 text-center
                text-3xl bg-clip-text mt-16 font-black
                text-green-600/60">
                Swipe or Scroll down to get started
            </h1>
            <img class="h-8 animate-pulse mt-4" src="{down_arrow}" alt="">
        </div>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');

    main {
        min-height: 100vh;
    }

    svg text {
        position: absolute;
        font-family: 'Gochi Hand', cursive;
        animation: stroke 3s forwards;
        stroke-width: 2;
        stroke: #54A262;
        font-size: 3.5rem;
        font-weight: bold;
    }

    @keyframes stroke {
        0% {
            fill: rgba(84, 162, 98, 0);
            stroke: rgba(84, 162, 98, 1);
            stroke-dashoffset: 25%;
            stroke-dasharray: 0 50%;
            stroke-width: 2;
        }
        70% {
            fill: rgba(84, 162, 98, 0);
            stroke: rgba(84, 162, 98, 1);
        }
        80% {
            fill: rgba(84, 162, 98, 0);
            stroke: rgba(84, 162, 98, 1);
            stroke-width: 3;
        }
        100% {
            fill: rgba(84, 162, 98, 1);
            stroke: rgba(84, 162, 98, 1);
            stroke-dashoffset: -25%;
            stroke-dasharray: 50% 0;
            stroke-width: 0;
        }
    }

</style>