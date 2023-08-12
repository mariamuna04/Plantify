<main>
    <div class="lds-dual-ring"></div>
</main>

<style>
    .lds-dual-ring {
        display: inline-block;
        width: 20px;
        height: 20px;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 20px;
        height: 20px;
        margin-top: 3px;
        border-radius: 50%;
        border: 2px solid darkslategray;
        border-color: darkslategray transparent darkslategray transparent;
        animation: lds-dual-ring 1.2s  infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>