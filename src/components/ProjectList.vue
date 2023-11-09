<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'

const projectStore = useProjectStore()
const currentProject = computed(() => projectStore.currentProject)
const showClosedProjects = ref<boolean>(false)

const emit = defineEmits(['projectSelected'])

function toggleShowClosedProjects() {
  showClosedProjects.value = !showClosedProjects.value
}
</script>

<template>
  <div
    v-if="projectStore?.projects"
    class="d-grid gap-2"
  >

    <!-- Project list -->
    <nav
      v-if="true"
      class="list-group list-group-flush"
    >
      <template
        v-for="project in projectStore.projects"
        :key="project.id"
      >
        <router-link
          v-if="showClosedProjects || !project.closed"
          :to="{ name: 'project', params: { project_id: project._id } }"
          class="list-group-item list-group-item-action"
          :class="{
            'active': project._id === currentProject?._id,
            'text-black-50': project.closed,
            'fw-light': project.closed
          }"
          :aria-current="project._id === currentProject?._id"
          @click="emit('projectSelected')"
        ><span>{{ project.title }}</span>
        </router-link>
      </template>
    </nav>

    <div v-else>else...</div>

    <!-- Show closed switch -->
    <div class="form-check form-switch">
      <input
      class="form-check-input"
      type="checkbox"
      id="show-closed-projects"
      @input="toggleShowClosedProjects"
    >
    <label
      class="form-check-label"
      for="show-closed-projects"
    >Inclure les projets terminés</label>
  </div>

</div>
<div v-else>
  🤔 Aucun projet ici...
</div></template>e
