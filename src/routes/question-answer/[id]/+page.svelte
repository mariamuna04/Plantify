<script lang="ts">
    import {onMount} from "svelte";
    import {Session} from "../../Session";
    import Navbar from "$lib/components/Navbar.svelte";
    import Loader from "../../Loader.svelte";
    import ReplyGrid from "./ReplyGrid.svelte";
    import GatewayTimeout from "$lib/components/GatewayTimeout.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let status: number = 401;

    export let data;
    let question = JSON.parse(data.question);
    let fetchedReply = JSON.parse(data.reply);
    let reply: string = "";

    onMount(async () => {
        console.log(fetchedReply)


        if (await fetchedReply) {
            status = 200;
        } else status = 404;
    });


    const onReplyClick = async () => {
        const answerObject: Answer = {
            _id: "",
            name: Session.getName(),
            parentQuestionId: question._id,
            email: Session.getEmail(),
            body: reply,
        }

        if (!answerObject.body) return alert("Please write something");

        await fetch('/api/QuestionAnswer/ReplyQuestion', {
            method: 'POST',
            body: JSON.stringify(answerObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // reload the page
        location.reload();
    }

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 100);
    }


</script>

<main>
    <Navbar/>

    <div class="container mx-auto px-8 md:px-32 pt-12">

        <div class="flex gap-2">
            <img class='w-12 h-12 mr-2 rounded-full'
                 src='https://api.dicebear.com/6.x/avataaars/svg?seed={generateRandomNumber()}%20Hill&backgroundColor=b6e3f4,c0aede,d1d4f9'
                 height='48px' width='48px' alt="">
            <div class="flex flex-col">
                <div class="flex gap-2">
                    <h1 class="font-black">{question.name}</h1>
                    <h1 class="text-zinc-500 font-bold">&bull; Author</h1>
                </div>
                <h1 class="font-light text-zinc-600">{question.email}</h1>
            </div>
        </div>

        <div class="text-4xl font-black mt-6">{question.body}</div>

        <hr class="mt-4  ">

        <div class="grid grid-cols-1 place-items-start gap-x-4">
            <div class="p-2 flex flex-col gap-3 w-full">
                <h1 class="text-3xl font-bold pt-8 text-green-900">Share your thoughts about this question...</h1>
                <textarea bind:value={reply}
                        class="px-4 py-4 shadow-xl rounded-2xl w-full mb-2 mt-4 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent"
                        placeholder="Reply to this question..."></textarea>

                <button class="font-bold text-white bg-green-900 py-2 px-4 w-fit rounded-full items-end"
                on:click={onReplyClick}>
                    <span class="flex gap-2 items-center align-middle justify-center">
                        <span>Reply</span>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18"
                             viewBox="0,0,256,256"
                             style="fill:#fff;">
                            <g fill="#fff" fill-rule="nonzero" stroke="none" stroke-width="1"
                               stroke-linecap="butt" stroke-linejoin="miter"
                               stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                               font-family="none" font-weight="none"
                               font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                            <g transform="scale(8.53333,8.53333)"><path
                                    d="M5,3c-0.55228,0 -1,0.44772 -1,1c0.00021,0.09046 0.01269,0.18047 0.03711,0.26758c0.00065,0.00196 0.0013,0.00391 0.00195,0.00586l0.96094,6.72656l-3,2l21,2l-21,2l3,2l-0.96094,6.72852c-0.02543,0.08827 -0.03857,0.17962 -0.03906,0.27148c0,0.55228 0.44772,1 1,1c0.13295,-0.00072 0.26442,-0.02794 0.38672,-0.08008l0.00195,0.00195l0.04297,-0.02148l0.02148,-0.00977c0.00589,-0.0032 0.01175,-0.00645 0.01758,-0.00977l21.91992,-10.95898l0.00195,-0.00391c0.36782,-0.157 0.60672,-0.51805 0.60742,-0.91797c-0.00025,-0.4011 -0.24014,-0.76324 -0.60937,-0.91992c0,-0.00065 0,-0.0013 0,-0.00195h-0.00195l-21.91016,-10.95508c-0.02918,-0.01647 -0.05916,-0.03146 -0.08984,-0.04492c-0.12305,-0.05172 -0.2552,-0.07828 -0.38867,-0.07812z"></path></g></g></svg>
                    </span>
                </button>
            </div>
        </div>

    </div>

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <ReplyGrid bind:experiences={fetchedReply}/>
    {:else}
        <GatewayTimeout/>
    {/if}


    <Footer/>
</main>