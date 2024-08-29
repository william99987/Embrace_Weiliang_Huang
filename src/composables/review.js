import { ref } from 'vue';

const reviews = ref(JSON.parse(localStorage.getItem('ratings')) || []);
export const isReviewed = ref(false);

export {reviews}