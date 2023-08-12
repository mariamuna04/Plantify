<script lang="ts">
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import sign_in_card from "$lib/assets/sign_in_card.svg";
    import logo from "$lib/assets/plantify.svg";
    import apple_logo from "$lib/assets/icons/apple_logo.svg";
    import google_logo from "$lib/assets/icons/google_logo.svg";
    import Loader from "./Loader.svelte";
    import {redirect} from "@sveltejs/kit";

    // Credentials Object
    const credentials: Credentials = {
        email: '',
        password: ''
    };

    let validEmail = false;
    let validPassword = false;

    $: validPassword = credentials.password !== '';

    // Handle form submission
    const handleSubmit = async () => {
        try {
            // Send credentials to server and await response
            // Server response : {token: token, name: name, email: email}
            const response = await fetch('/api/SignIn', {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // If response is ok, update UI, extract token, name and email from response
            // and store them in cookies as well as in session store
            if (response.ok) {

                // Update UI
                document.getElementById('email')!.classList.remove('border-red-400');
                document.getElementById('password')!.classList.remove('border-red-400');
                document.getElementById('email')!.classList.add('bg-green-200');
                document.getElementById('email')!.classList.add('border-green-200');
                document.getElementById('password')!.classList.add('bg-green-200');
                document.getElementById('password')!.classList.add('border-green-200');

                // Extract token, name and email from response
                const {token, name, email} = await response.json();

                const session:UserSession = {
                    name: name,
                    email: email,
                    token: token
                };

                // Store session in session store
                sessionStorage.setItem('session', JSON.stringify(session));
                // console.log(sessionStorage.getItem('session'));

                // Redirect to dashboard
                await goto('/dashboard');

            }
            // If response is not ok, update UI with error UI
            else {
                // Update UI
                document.getElementById('email')!.classList.add('border-red-400');
                document.getElementById('password')!.classList.add('border-red-400');
                document.getElementById('password')!.nextElementSibling!.classList.remove('invisible');
                document.getElementById('submit')!.innerHTML = 'Log in';
                document.getElementById('submit')!.classList.add('text-white');
                document.getElementById('submit')!.classList.remove(
                    'bg-transparent',
                    'border',
                    'text-teal-800',
                    'hover:bg-transparent',
                    'hover:shadow-none'
                );
                document.getElementById('loader_icon')!.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    onMount(() => {
        document.title = "Login | Plantify";

        // Check if user is already logged in
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            redirect(301, '/')
        }
    });

    const validateEmail = (event:any) => {
        const email = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) && email !== '') {
            event.target.classList.add('border-red-400');
            event.target.nextElementSibling.classList.remove('invisible');
            validEmail = false;
        } else {
            event.target.classList.remove('border-red-400');
            event.target.nextElementSibling.classList.add('invisible');
            validEmail = true;
        }
    };

    const onPasswordInput = (event:any) => {
        event.target.classList.remove('border-red-400');
    }

    const onLoginButtonClick = () => {
        document.getElementById('submit')!.innerHTML = 'Logging in...';
        document.getElementById('submit')!.classList.remove('text-white');
        document.getElementById('submit')!.classList.add(
            'bg-transparent',
            'border',
            'text-teal-800',
            'hover:bg-transparent',
            'hover:shadow-none'
        );
        document.getElementById('loader_icon')!.classList.remove('hidden');
    }
</script>

<main class="flex items-center justify-center h-screen" id="body">
    <div class="mx-auto w-fit grid grid-cols-1 justify-between rounded-2xl xl:grid-cols-2
    bg-opacity-60 backdrop-blur-md shadow-2xl overflow-y-auto">
        <div class="flex-col w-full p-12 gap-4 hidden xl:flex">
            <a href="/" class="w-fit"><img src="{logo}" alt="" class="w-32"></a>
            <p class=" select-none text-base font-bold bg-gradient-to-l from-0% from-teal-600 to-green-600 bg-clip-text text-transparent">
                Sow the Future, Plantify Today: Growing a Green Legacy
            </p>
            <img src={sign_in_card} alt="logo" class="w-[80%] place-self-center">
            <p class="text-xs font-light text-teal-800 text-end">
                2023 &copy; Plantify. All rights reserved.
            </p>
        </div>
        <div class="p-12 bg-white flex flex-col align-middle justify-center bg-opacity-70 place-self-center w-full h-full">

            <a href="/" class="w-fit mb-5 place-self-center xl:hidden"><img src="{logo}" alt="" class="w-32"></a>
            <h1 class="text-3xl font-bold text-teal-800 text-center">Sign in to your account</h1>

            <div id="loginWithAPIs" class="flex gap-4 my-8 justify-center">
                <form method="post" action="?/OAuth2">
                    <button type="submit" class="bg-white text-zinc-900 font-black hover:bg-gray-300 hover:shadow-md outline-none
                        rounded-full w-fit text-sm px-10 py-3 text-center transition-all duration-300 antialiased">
                    <span class="flex justify-center align-middle items-center gap-4">
                        <img src={google_logo} alt="apple_logo" class="w-4 ">
                        Sign in with Google
                    </span>
                    </button>
                </form>

                <form method="post" action="?/appleAuth">
                    <button class="bg-zinc-800 text-white font-black hover:bg-zinc-900 hover:shadow-md outline-none
                        rounded-full w-fit text-sm px-10 py-3  transition-all duration-300 antialiased">
                    <span class="flex justify-center align-middle items-center gap-4">
                        <img src={apple_logo} alt="apple_logo" class="w-4 ">
                        Sign in with Apple
                    </span>
                    </button>
                </form>
            </div>
            <h1 class="text-xs text-zinc-400 text-center">OR</h1>
            <form on:submit|preventDefault="{handleSubmit}" class="mt-3 align-middle flex flex-col">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your Email</label>
                <input required bind:value={credentials['email']} on:input={validateEmail}
                       type="text" id="email" placeholder="your_email@example.com"
                       class="bg-gray-50 border font-mono border-gray-300 text-gray-900 text-sm rounded-full text-center outline-none
                       focus:shadow-md block w-full p-2.5 transition-all duration-300 antialiased px-4">
                <h1 class="mt-2 invisible w-full text-xs text-center font-semibold text-red-400">
                    Invalid Email Address
                </h1>


                <label for="password" class=" block mb-2 text-sm font-medium text-gray-900">
                    Your password
                </label>
                <input required bind:value={credentials['password']} on:input={onPasswordInput}
                       type="password" id="password"
                       class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full text-center outline-none
                       focus:shadow-md block w-full p-2.5 transition-all duration-300 antialiased">
                <h1 class="mt-2 invisible w-full text-center text-xs font-semibold text-red-400 px-4">
                    Invalid Credentials
                </h1>

                <div class="flex justify-between align-middle items-center">
                    <a href="/forgot-password" class=" w-fit text-sm font-bold text-teal-800 text-end outline-none">
                        Forgot your password?
                    </a>

                    {#if (validEmail && validPassword)}
                        <div class="flex justify-end items-center align-middle gap-2">
                            <div class="hidden w-fit h-fit" id="loader_icon">
                                <Loader/>
                            </div>
                            <button type="submit" id="submit"
                                    on:click={onLoginButtonClick}
                                    class="place-self-center bg-emerald-600 text-white font-black hover:bg-emerald-800 hover:shadow-md
                                outline-none rounded-full w-fit text-sm px-10 py-3 text-center transition-all duration-300 antialiased">
                                Sign In
                            </button>
                        </div>
                    {:else}
                        <button disabled
                                class="place-self-center  bg-gray-300 text-white font-black outline-none
                                rounded-full w-fit text-sm px-10 py-3 text-center transition-all duration-300 antialiased">
                            Sign In
                        </button>
                    {/if}
                </div>

                <div class="pt-8 flex flex-col gap-1 justify-center align-middle">
                    <h1 class="">Don't have an account?</h1>
                    <a href="/sign-up" class="w-fit text-base font-semibold text-teal-800 hover:underline outline-none">
                        Register here
                    </a>
                </div>
            </form>
        </div>
    </div>
</main>

<style>
    main {
        background-image: url('/src/lib/assets/sign_in_background.jpg');
        background-size: cover;
        background-position: center;
    }
</style>
