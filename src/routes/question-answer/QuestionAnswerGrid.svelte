<script lang="ts">
    import {Session} from "../Session";

    export let questions: Array<Question>;

    let answer: string = "";

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 100);
    }

    const replyHandler = async (event: any) => {
        const id = event.target.id;
        const answerObj: Answer = {
            _id: "",
            parentQuestionId: id,
            name: Session.getName(),
            email: Session.getEmail(),
            body: answer
        }

        const res = await fetch('/api/QuestionAnswer/ReplyQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answerObj)
        });

        location.reload();
    }

    function clipText(text: string): string {
        const wordsArray = text.split(' ');
        const clippedArray = wordsArray.slice(0, 10);
        const clippedText = clippedArray.join(' ');

        if (wordsArray.length > 10) {
            return clippedText + '...';
        } else {
            return clippedText;
        }
    }

</script>

<main class="container mx-auto px-8 md:px-12 pb-20 ">
    <div class="flex flex-col md:grid md:grid-cols-3 gap-6 lg:grid-cols-3 mt-4">
        {#if questions.length === 0}
            <div class="flex flex-col justify-center align-middle items-center col-span-full row-span-full w-full mx-auto h-full">
                No experiences found
            </div>
        {:else}
            {#each questions as question}

                <a class="flex flex-col gap-4 rounded-xl bg-zinc-100 p-6 hover:drop-shadow-xl group w-96 transition-all duration-300 ease-in-out"
                   href="/question-answer/{question._id}/">
                    <div class="flex flex-col gap-4">
                        <h1 class="font-bold text-2xl">{clipText(question.body)}</h1>

                        <div class="flex flex-col">
                            <h1 class="font-light">Asked by</h1>
                            <div class="flex gap-2  items-center align-middle">
                                <img class='w-4 h-4 rounded-full'
                                     src='https://api.dicebear.com/6.x/avataaars/svg?seed={generateRandomNumber()}%20Hill&backgroundColor=b6e3f4,c0aede,d1d4f9'
                                     height='48px' width='48px' alt="">
                                <h1 class="font-bold">{question.name}</h1>
                            </div>
                            <h1 class="font-light text-zinc-500">{question.email}</h1>
                        </div>
                    </div>

                </a>
            {/each}
        {/if}
    </div>
</main>
