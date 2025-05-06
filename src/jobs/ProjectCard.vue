<template>
  <div class="bg-white shadow-sm border p-4 mb-4 rounded relative">
    <div class="flex justify-between">
      <div class="flex">
        <img src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202210/paying-job-sixteen_nine.jpg?size=948:533" class="mr-4 w-10 h-5 rounded-full" />
        <div>
          <h3 class="font-semibold text-sm">{{ title }}</h3>
          <div class="text-gray-500 text-xs flex items-center gap-2 mt-1">
            <span>📍 {{ location }}</span>
            <span>📅 {{ date }}</span>
            <span>💬 {{ proposals }} Proposals</span>
          </div>
          <p class="text-gray-500 text-sm mt-2">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...
          </p>
          <div class="mt-2 space-x-2 text-xs">
            <span class="bg-gray-100 px-2 py-1 rounded">Artist</span>
            <span class="bg-gray-100 px-2 py-1 rounded">Computer</span>
            <span class="bg-orange-100 text-orange-700 px-2 py-1 rounded">Front end Developer</span>
            <span class="text-green-500">+3</span>
          </div>
        </div>
      </div>
      <div class="text-right">
        <p class="font-semibold text-sm">{{ price }}</p>
        <p class="text-xs text-gray-500">{{ rateType }}</p>
        <button class="mt-4 bg-green-500 text-white px-4 py-2 rounded text-sm">Send Proposal ↗</button>
      </div>
    </div>
    <div class="absolute top-2 right-2 text-gray-300">♡</div>
  </div>
</template>

<script>
export default {
  props: ["title", "location", "date", "proposals", "price", "rateType"],
};
</script>
