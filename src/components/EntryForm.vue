<template>
  <form @submit.prevent="onSubmit" class="bg-white p-4 rounded-lg shadow mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block font-semibold mb-1">항목명</label>
        <input
          v-model="title"
          type="text"
          required
          class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block font-semibold mb-1">금액</label>
        <input
          v-model.number="amount"
          type="number"
          required
          class="w-full p-2 border rounded" />
        <p class="text-sm text-gray-500 mt-1">
          수입은 양수, 지출은 음수로 입력
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block font-semibold mb-1">날짜</label>
        <input
          v-model="date"
          type="date"
          required
          class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block font-semibold mb-1">메모</label>
        <input v-model="memo" type="text" class="w-full p-2 border rounded" />
      </div>
    </div>

    <button
      type="submit"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      저장
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLedgerStore } from "../stores/ledgerStore";

const ledgerStore = useLedgerStore();

const title = ref("");
const amount = ref<number | null>(null);
const memo = ref("");
const date = ref("");

// 제출 처리 함수
const onSubmit = () => {
  if (!title.value || amount.value === null || !date.value) return;

  ledgerStore.addEntry({
    title: title.value,
    amount: amount.value,
    memo: memo.value,
    date: date.value,
  });

  // 입력 초기화
  title.value = "";
  amount.value = null;
  memo.value = "";
  date.value = "";
};
</script>
