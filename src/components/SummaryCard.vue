<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div class="bg-white p-4 rounded-lg shadow text-center">
      <h3 class="text-gray-500 text-sm">총 수입</h3>
      <p class="text-green-600 text-xl font-bold">
        {{ formatAmount(totalIncome) }}
      </p>
    </div>

    <div class="bg-white p-4 rounded-lg shadow text-center">
      <h3 class="text-gray-500 text-sm">총 지출</h3>
      <p class="text-red-600 text-xl font-bold">
        {{ formatAmount(totalExpense) }}
      </p>
    </div>

    <div class="bg-white p-4 rounded-lg shadow text-center">
      <h3 class="text-gray-500 text-sm">잔액</h3>
      <p
        :class="{
          'text-green-600': balance >= 0,
          'text-red-600': balance < 0,
        }"
        class="text-xl font-bold">
        {{ formatAmount(balance) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLedgerStore } from "../stores/ledgerStore";
import { storeToRefs } from "pinia";

const ledgerStore = useLedgerStore();
const { totalIncome, totalExpense, balance } = storeToRefs(ledgerStore);

const formatAmount = (value: number) => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString()}원`;
};
</script>
