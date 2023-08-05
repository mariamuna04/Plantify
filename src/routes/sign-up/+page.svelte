<script lang="ts">
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import logo from '$lib/assets/plantify.svg';
    import sign_up_card from '$lib/assets/sign_up_card.svg';

    let email_error_message = 'Please enter a valid email address';

    const userProperties: UserProperties = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    let isFirstNameValid;
    let isLastNameValid;
    let isEmailValid = false;
    let isPasswordValid = false;

    $: isFirstNameValid = userProperties.firstName !== '';
    $: isLastNameValid = userProperties.lastName !== '';

    let password = '';
    let confirm_password = '';

    const handleSubmit = async () => {
        if (password !== confirm_password) {
            alert('passwords do not match');
            return;
        }
        try {
            userProperties.password = password;
            const response = await fetch('/api/SignUpAPI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userProperties)
            });

            if (response.ok) {
                await goto('/login');
            } else {
                alert('profile creation failed')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    onMount(() => {
        document.title = 'Sign Up | Plantify';
    });

    const validateEmail = async (event) => {
        const email = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) && email !== '') {
            event.target.classList.add('border-red-400');
            event.target.nextElementSibling.classList.remove('invisible');
            isEmailValid = false;
        } else {
            event.target.classList.remove('border-red-400');
            event.target.nextElementSibling.classList.add('invisible');
            isEmailValid = true;
        }
    };

    const handlePasswordMatch = (event) => {
        if (event.target.value !== password && event.target.value !== '') {
            document.getElementById('password').classList.add('border-red-400');
            event.target.classList.add('border-red-400');
            document.getElementById('password_mismatch').classList.remove('invisible');
            isPasswordValid = false;
        } else {
            document.getElementById('password').classList.remove('border-red-400');
            event.target.classList.remove('border-red-400');
            document.getElementById('password_mismatch').classList.add('invisible');
            isPasswordValid = true;
        }
    }

    const checkEmailExists = async (event) => {
        const email = event.target.value;
        console.log('checking email');
        event.target.classList.add('border-amber-600');
        event.target.classList.add('animate-pulse');
        event.target.nextElementSibling.classList.add('text-amber-600');
        event.target.nextElementSibling.classList.add('animate-pulse');
        event.target.nextElementSibling.classList.remove('invisible');
        email_error_message = 'Checking Email...';
        document.getElementById('email').setAttribute('disabled', 'true');
        await fetch('/api/AccountExists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        }).then((response) => {
            event.target.classList.remove('border-amber-600');
            if (response.ok) {
                event.target.nextElementSibling.classList.remove('text-amber-600');
                event.target.classList.remove('animate-pulse');
                event.target.nextElementSibling.classList.remove('animate-pulse');

                event.target.classList.add('border-red-400');
                event.target.nextElementSibling.classList.remove('invisible');
                email_error_message = 'This email is already in use';
                isEmailValid = false;
            } else {
                event.target.nextElementSibling.classList.remove('text-amber-600');
                event.target.classList.remove('animate-pulse');
                event.target.nextElementSibling.classList.remove('animate-pulse');

                email_error_message = 'Please enter a valid email address';
                event.target.classList.remove('border-red-400');
                event.target.nextElementSibling.classList.add('invisible');
                isEmailValid = true;
            }
            document.getElementById('email').removeAttribute('disabled');
        }).catch(() => {
            event.target.nextElementSibling.classList.remove('text-amber-600');
            event.target.classList.remove('animate-pulse');
            event.target.classList.remove('amber-red-600');
            console.log('error');
            event.target.nextElementSibling.classList.remove('animate-pulse');

            document.getElementById('email').removeAttribute('disabled');
        });

    }

</script>

<main class="flex items-center justify-center h-screen" id="body">
    <div class="mx-auto w-fit grid grid-cols-1 justify-between rounded-2xl xl:grid-cols-2
    bg-opacity-60 backdrop-blur-md shadow-2xl overflow-y-auto">
        <div class="p-12 bg-white flex flex-col align-middle justify-center bg-opacity-70 place-self-center w-full h-full">
            <a href="/" class="w-fit mb-5 place-self-center xl:hidden outline-none"><img src="{logo}" alt=""
                                                                                         class="w-32 outline-none"></a>
            <h1 class="text-3xl font-bold text-teal-800 text-center mb-4">
                Hi there! <br> Welcome to Plantify!
            </h1>


            <h1 class="text-teal-800 text-sm font-thin text-center mb-4">
                Fill in the form below to create your account
            </h1>


            <form on:submit|preventDefault={handleSubmit} class="mt-3 align-middle flex flex-col">
                <div class="grid-cols-2 grid gap-x-4 mb-4">
                    <div id="first_name_container">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                        <input required bind:value={userProperties.firstName}
                               type="text" id="first_name"
                               class="bg-gray-50 border font-mono border-gray-300 text-gray-900 text-sm rounded-full outline-none
                               focus:shadow-md block w-full p-2.5 text-center transition-all duration-300 antialiased">
                    </div>

                    <div id="last_name_container">
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                        <input required bind:value={userProperties.lastName}
                               type="text" id="last_name"
                               class="bg-gray-50 border font-mono border-gray-300 text-center text-gray-900 text-sm rounded-full outline-none
                               focus:shadow-md w-full p-2.5 transition-all duration-300 antialiased">
                    </div>
                </div>

                <label for="email" class="block  mb-2 text-sm font-medium text-gray-900 ">Your Email</label>
                <input required bind:value={userProperties.email} on:input={validateEmail} on:blur={checkEmailExists}
                       type="text" id="email"
                       class="bg-gray-50 border font-mono border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full p-2.5 transition-all duration-300 antialiased px-4"
                       placeholder="your_email@example.com">
                <h1 class="my-2 invisible w-full text-center text-xs font-semibold text-red-400">
                    {email_error_message}
                </h1>
                <div class="grid-cols-2 grid gap-x-4 mb-4">
                    <div class="h-fit">
                        <label for="password" class="flex mb-2 text-sm  font-medium text-gray-900">
                            Create a password
                        </label>
                        <input required bind:value={password}
                               type="password" id="password"
                               class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full p-2.5 transition-all duration-300 antialiased px-4">
                    </div>

                    <div>
                        <label for="confirm_password" class="flex  pb-2 text-sm font-medium text-gray-900">
                            Confirm password
                        </label>
                        <input required bind:value={confirm_password} on:input={handlePasswordMatch}
                               type="password" id="confirm_password"
                               class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full p-2.5 transition-all duration-300 antialiased px-4 ">

                    </div>
                    <h1 id="password_mismatch"
                        class="mt-2 col-span-full invisible w-full text-center text-xs font-semibold text-red-400">
                        Passwords do not match
                    </h1>
                </div>

                <div class="flex justify-between align-middle items-center">
                    <a href="/login" class=" w-fit font-bold text-teal-800 text-end outline-none">
                        Sign in instead
                    </a>
                    {#if (isPasswordValid && isEmailValid && isFirstNameValid && isLastNameValid) }
                        <button type="submit" id="submit"
                                class="place-self-center bg-emerald-600 border-2 text-white font-black hover:bg-emerald-800 hover:shadow-md outline-none
                            rounded-full w-fit text-sm px-10 py-3 transition-all duration-300 antialiased">
                            Create Account
                        </button>
                    {:else }
                        <button disabled type="submit"
                                class="place-self-center disabled:shadow-none font-black outline-none border-2 text-zinc-600
                            rounded-full w-fit text-sm px-10 py-3 transition-all duration-300 antialiased">
                            Fill in the form correctly
                        </button>
                    {/if}
                </div>
            </form>
        </div>

        <div id="right_side_card" class="flex-col w-full p-12 gap-4 hidden xl:flex">
            <a href="/" class="w-fit place-self-end"><img src="{logo}" alt="" class="w-32"></a>
            <p class=" text-end select-none text-base font-bold bg-gradient-to-l from-0% from-teal-600 to-green-600 bg-clip-text text-transparent">
                Create an account and start planting today, for a better tomorrow
            </p>
            <img src={sign_up_card} alt="logo" class="w-[70%] place-self-center">
            <p class="text-xs font-light text-teal-800 text-start">
                2023 &copy; Plantify. All rights reserved.
            </p>
        </div>
    </div>
</main>

<style>
    main {
        background-image: url('/src/lib/assets/sign_up_background.jpg');
        background-size: cover;
        background-position: center;
    }
</style>