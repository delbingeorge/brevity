<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @vite('resources/css/app.css')
</head>

<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="container mx-auto p-6">
        <div class="bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl mx-auto">
            <div class="md:flex">
                <div class="md:flex-shrink-0">
                    <img class="h-48 w-full object-cover md:w-48" src="{{ asset('images/Slide 16_9 - 1.png') }}" alt="Woman smiling">
                </div>
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Verona Josephs</div>
                    <p class="block mt-1 text-lg leading-tight font-medium text-black">Before it was a chaos, now it's brevity!</p>
                    <form class="mt-4">
                        <div>
                            <label class="block text-gray-700">Email Address</label>
                            <input type="email" class="w-full mt-2 p-2 border rounded-lg" placeholder="Enter your email">
                        </div>
                        <div class="mt-4">
                            <label class="block text-gray-700">Password</label>
                            <input type="password" class="w-full mt-2 p-2 border rounded-lg" placeholder="Enter your password">
                        </div>
                        <button type="submit" class="w-full mt-6 bg-black text-white p-2 rounded-lg">Start Journey</button>
                        <div class="flex items-center justify-between mt-4">
                            <span>OR</span>
                            <div class="flex space-x-4">
                                <a href="#" class="text-black"><i class="fab fa-github"></i></a>
                                <a href="#" class="text-black"><i class="fab fa-gitlab"></i></a>
                                <a href="#" class="text-black"><i class="fab fa-google"></i></a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>


</html>
