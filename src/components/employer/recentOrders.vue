<template>
    <div class="row bg-white rounded rounded-1 p-3 m-3 ms-0">
        <table class="table">
            <thead>
                <tr>
                <th>Title</th>
                <th>Cost/Time</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in serviceOrders" :key="order.id">
                <td class="py-3">
                    <div>
                        {{ order.title + "#" + order.id }}
                    </div>
                    <ul class="text-muted" style="font-size: 15px;">  
                        <li>
                            {{ order.title }}

                        </li>
                    </ul>
                    <div class="text-muted" style="font-size: 14px;">
                        <span class="me-5"><i class="bi bi-geo-alt"></i> {{ order.client.location }}</span>
                        <span><i class="bi bi-calendar"></i> {{ order.client.date }}</span>
                    </div>
                    
                </td>
                <td class="py-3">${{ order.cost }}</td>
                <td class="py-3"><span class="p-2 rounded-1" :class="order.status=='Hired'? 'text-primary bg-primary-subtle':'text-success bg-success-subtle'">{{ order.status }}</span></td>
                <td class="py-3">
                    <button class="btn btn-sm btn-outline-primary">View History</button>
                </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>

    const serviceOrders = [
        {
            id: 11055,
            title: "I will design website UI UX in Adobe XD or Figma",
            cost: 29,
            currency: "USD",
            status: "Hired",
            client: {
            location: "Los Angeles",
            date: "February 5, 2025",
            },
            actions: ["View History"],
        },
        {
            id: 10525,
            title: "I will create a mobile app prototype in Figma",
            cost: 45,
            currency: "USD",
            status: "Completed",
            client: {
            location: "New York",
            date: "September 2, 2024",
            },
            actions: ["View History", "Leave Feedback"],
        },
        {
            id: 6072,
            title: "I will develop a WordPress e-commerce site",
            cost: 120,
            currency: "USD",
            status: "Hired",
            client: {
            location: "Remote",
            date: "January 15, 2025",
            },
            actions: ["View History", "Message Client"],
        },
    ];

</script>

<style>

</style>