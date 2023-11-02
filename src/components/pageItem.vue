<script setup lang="ts">
import type { IPage } from '@/shared/interfaces';

const props = defineProps<{
  page: IPage,
  mode?: 'create' | 'edit'
}>()

function getCoverImage(filename: string | undefined): string {
  if (filename) return `/img/${filename}`
  else return `/img/dummy.png`
}
</script>

<template>

  <!-- GRID (default mode)-->
  <div role="listitem" v-if="mode === 'griditem' || mode === 'default' || !mode">
    <a href="#" class="card shadow-sm text-decoration-none" tabindex="0">
      <img
        :src="getCoverImage(props.issue.images ? props.issue.images[0] : undefined)"
        class="img-fluid object-fit-cover card-image"
        alt="">
      <div class="card-body border-top">
        <h3 class="card-title">{{ props.issue.title }}</h3>
        <div class="d-flex flex-column w-100">
          <p class="card-subtitle" :class="getImpactClass(props.issue.severity)">
            Problème {{ impactLabels[props?.issue.severity || 'moderate'] }}
          </p>
          <p class="card-text text-wrap text-truncate">{{ props.issue.description }}</p>
        </div>
      </div>
    </a>
  </div>

  <!-- LIST -->
  <div role="listitem" v-if="mode === 'listitem'">
    <a href="#" class="text-decoration-none text-black">
      <div class="d-flex flex-column w-100">
        <h3 class="card-title">{{ props.issue.title }}</h3>
        <div class="card-subtitle" :class="getImpactClass(props.issue.severity)">Problème {{ impactLabels[props?.issue.severity || 'moderate'] }}</div>
        <p class="float-right">{{ props.issue.description }}</p>
      </div>
    </a>
  </div>

  <!-- PAGE -->
  <div v-if="mode === 'page'">

  </div>

  <!-- EDIT -->
  <div v-if="mode === 'edit'">

  </div>

</template>

<style>
.card {
  cursor: pointer;
  min-height: 20rem;
  height: 100%;
}

a.card:hover {
  outline: 2px yellowgreen groove;
}

.card-image {
  height: 8rem;
  max-height: 8rem;
  min-height: 8rem;
  filter: opacity(50%) saturate(5%);
  transition: filter 0.3s;
}

.card:hover .card-image {
  filter: opacity(100%) saturate(100%);
}
</style>