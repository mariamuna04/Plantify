<script lang="ts">
    import {Session} from "../../Session";
    import {onMount} from "svelte";
    import Navbar from "$lib/components/Navbar.svelte";

    const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp', 'heic'];

    export let images: any[] = [];


    const onSubmitClick = (event: Event) => {
        // Fetch the file input
        const fileInput = document.getElementById('file') as HTMLInputElement;

        // Get the file extension
        const fileExtension = fileInput.value.substring(fileInput.value.lastIndexOf('.'));

        // Check if the file extension is authorized
        if (!authorizedExtensions.includes(fileExtension)) {
            event.preventDefault();
            alert('File extension not authorized');
        }

        // Convert the file to base64
        // @ts-ignore
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let base64: string | ArrayBuffer | null = null;
        reader.onload = async () => {
            base64 = reader.result;
            const data = {
                email: Session.getEmail(),
                image: base64,
                description: 'profile picture'
            }

            const response = await fetch('/api/competitions/UploadImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                alert('Image uploaded successfully');
            } else {
                alert('Error uploading image');
            }
        };
    }

    onMount(async () => {
        const response = await fetch('/api/competitions/GetAllImages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: Session.getEmail()})
        });
        images = await response.json();
    });

</script>

<Navbar/>
<main class="container mx-auto px-8 md:px-32 pt-12">
<form on:submit={onSubmitClick}>
    <div class="group">
        <label for="file">Upload your profile picture</label>
        <input accept={authorizedExtensions.join(',')} id="file" name="fileToUpload" required type="file"/>
    </div>
    <button type="submit">Upload</button>
</form>


<div class="mt-12 grid grid-cols-3 gap-6">
    {#each images as image}
        <div class="drop-shadow border border-zinc-100 rounded-2xl">
            <img class="h-full w-full rounded-2xl" src={image.data} alt="demo"/>
            <h1 class="text-sm">{image.description}</h1>
        </div>
    {/each}
</div>
</main>