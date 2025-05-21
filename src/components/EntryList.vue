<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">📋 내역 목록</h2>

    <div v-if="entries.length === 0" class="text-gray-500 text-center py-4">
      등록된 내역이 없습니다.
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="(entry, index) in sortedEntries"
        :key="index"
        class="p-3 border rounded flex justify-between items-start">
        <div>
          <div class="font-semibold">{{ entry.title }}</div>
          <div class="text-sm text-gray-500">
            {{ formatDate(entry.date) }} • {{ entry.memo }}
          </div>
        </div>
        <div
          :class="{
            'text-green-600': entry.amount > 0,
            'text-red-600': entry.amount < 0,
          }"
          class="font-bold">
          {{ formatAmount(entry.amount) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useLedgerStore } from "../stores/ledgerStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

// Pinia 스토어 사용
const ledgerStore = useLedgerStore();
const { entries } = storeToRefs(ledgerStore);

// 날짜 내림차순 정렬
const sortedEntries = computed(() => {
  return [...ledgerStore.entries].sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
});

// 금액 표시 포맷: +12,000원 / -8,000원
const formatAmount = (value: number) => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString()}원`;
};

// 날짜 표시 포맷: 2025-05-21 → 2025.05.21
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
};
</script>
