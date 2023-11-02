<script setup lang="ts">
  const props = defineProps<{
    
  }>()
</script>

<template>
  <fieldset>
    <legend>Criticité</legend>
    <div class="form-check form-check-inline">
      <input
        value="critical"
        v-model="currentImpactLevel"
        class="form-check-input"
        type="radio"
        name="currentImpactLevel"
        id="flexRadioDefault1">
      <label class="form-check-label" for="flexRadioDefault1">
        <span class="impact impact-critical">Impact critique</span>
      </label>
    </div>
    <div class="form-check">
      <input
        value="important"
        v-model="currentImpactLevel"
        class="form-check-input"
        type="radio"
        name="currentImpactLevel"
        id="flexRadioDefault2">
      <label class="form-check-label" for="flexRadioDefault2">
        <span class="impact impact-important">Impact important</span>
      </label>
    </div>
    <div class="form-check">
      <input
        value="moderate"
        v-model="currentImpactLevel"
        class="form-check-input"
        type="radio"
        name="currentImpactLevel"
        id="flexRadioDefault3">
      <label class="form-check-label" for="flexRadioDefault3">
        <span class="impact impact-moderate">Impact modéré</span>
      </label>
    </div>
    <div class="form-check">
      <input
        value="minor"
        v-model="currentImpactLevel"
        class="form-check-input"
        type="radio"
        name="currentImpactLevel"
        id="flexRadioDefault4">
      <label class="form-check-label" for="flexRadioDefault4">
        <span class="impact impact-minor">Impact mineur</span>
      </label>
    </div>
  </fieldset>
</template>
