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
        class="p-4 border rounded-lg bg-white flex justify-between items-center">
        <!-- 왼쪽: 항목 정보 -->
        <div class="flex-2 flex-col justify-items-start">
          <div class="text-lg font-semibold">{{ entry.title }}</div>
          <div class="text-sm text-gray-500">
            {{ formatDate(entry.date) }} • {{ entry.memo }}
          </div>
        </div>

        <!-- 오른쪽: 금액 및 삭제 -->
        <div class="flex-col justify-items-start">
          <div
            :class="{
              'text-green-600': entry.amount > 0,
              'text-red-600': entry.amount < 0,
            }"
            class="text-lg font-bold">
            {{ formatAmount(entry.amount) }}
          </div>
          <button
            @click="deleteEntry(index)"
            class="text-s text-red-500 hover:underline mt-1 pl-4">
            삭제
          </button>
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

// 삭제 처리 함수
const deleteEntry = (indexInSorted: number) => {
  // 정렬된 배열이기 때문에 원래 index를 찾아야 함
  const entryToDelete = sortedEntries.value[indexInSorted];
  const originalIndex = entries.value.findIndex(
    (e) =>
      e.title === entryToDelete.title &&
      e.amount === entryToDelete.amount &&
      e.date === entryToDelete.date &&
      e.memo === entryToDelete.memo
  );
  if (originalIndex !== -1) {
    ledgerStore.removeEntry(originalIndex);
  }
};

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
