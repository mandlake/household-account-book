import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface LedgerEntry {
  title: string;
  amount: number;
  memo: string;
  date: string; // YYYY-MM-DD (ISO 포맷)
}

export const useLedgerStore = defineStore("ledger", () => {
  // 전체 내역
  const entries = ref<LedgerEntry[]>([]);

  // 항목 추가
  const addEntry = (entry: LedgerEntry) => {
    entries.value.push(entry);
  };

  // 총 수입 (양수)
  const totalIncome = computed(() =>
    entries.value
      .filter((e) => e.amount > 0)
      .reduce((sum, e) => sum + e.amount, 0)
  );

  // 총 지출 (음수)
  const totalExpense = computed(() =>
    entries.value
      .filter((e) => e.amount < 0)
      .reduce((sum, e) => sum + e.amount, 0)
  );

  // 잔액 (수입 + 지출)
  const balance = computed(() => totalIncome.value + totalExpense.value);

  return {
    entries,
    addEntry,
    totalIncome,
    totalExpense,
    balance,
  };
});
