<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center">💰 간단한 가계부</h1>

      <!-- 요약 카드 -->
      <SummaryCard />

      <!-- 입력 폼 -->
      <EntryForm />

      <!-- 수입/지출 리스트 -->
      <EntryList />
    </div>
  </div>
</template>

<script setup lang="ts">
import EntryForm from "./components/EntryForm.vue";
import EntryList from "./components/EntryList.vue";
</script>
