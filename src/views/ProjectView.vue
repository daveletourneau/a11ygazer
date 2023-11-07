<script setup lang="ts">

import { useProjectStore } from '@/stores/ProjectStore'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import ProjectModal from '@/components/ProjectModal.vue'

const store = useProjectStore()
const router = useRouter()
const currentProject = computed(() => store.currentProject)
const currentRouteName = computed(() => router.currentRoute.value.name)

const projectModalVisible = ref<boolean>(false)

const showProjectModal = () => {
  projectModalVisible.value = true
}
</script>

<template>
  <div class="container">

    <div class="d-flex justify-content-center align-items-center">
      <h1
        id="page-title"
        class="flex-grow-1"
      >{{ currentProject?.title }}
        <small
          v-if="currentProject?.closed"
          class="text-muted"
        >(fermé)</small>
      </h1>
      <button
        v-if="currentProject"
        type="button"
        class="btn btn-light my-3"
        @click="showProjectModal"
        aria-label="Modifier le projet actuel"
      >
        <i
          class="bi bi-gear-fill"
          aria-hidden="true"
        ></i>
      </button>
    </div>

    <div
      v-if="currentProject"
      class="list-group"
    >

      <!-- Tabbed navigation -->
      <nav
        class="nav nav-tabs mb-3"
        aria-labelledby="page-title"
      >

        <!-- SUMMARY tab -->
        <router-link
          :to="{ name: 'projectsummary' }"
          custom
          v-slot="{ navigate }"
        >
          <button
            role="tab"
            class="nav-link"
            :class="{ 'active': currentRouteName === 'projectsummary' }"
            @click="navigate"
            :aria-current="currentRouteName === 'projectsummary' ? 'page' : false"
          >
            <i class="bi bi-ui-checks"></i>
            Sommaire
          </button>
        </router-link>

        <!-- ISSUES tab -->
        <router-link
          :to="{ name: 'projectissues' }"
          custom
          v-slot="{ navigate }"
        >
          <button
            role="tab"
            class="nav-link"
            :class="{ 'active': currentRouteName === 'projectissues' }"
            @click="navigate"
            :aria-current="currentRouteName === 'projectissues' ? 'page' : false"
          >
            <i class="bi bi-crosshair2"></i>
            Problèmes
          </button>
        </router-link>

        <!-- REPORT tab -->
        <router-link
          :to="{ name: 'projectreport' }"
          custom
          v-slot="{ navigate }"
        >
          <button
            role="tab"
            class="nav-link"
            :class="{ 'active': currentRouteName === 'projectreport' }"
            @click="navigate"
            :aria-current="currentRouteName === 'projectreport' ? 'page' : false"
          >
            <i class="bi bi-journal-richtext"></i>
            Rapport
          </button>
        </router-link>

        <!-- REPORT tab -->
        <router-link
          :to="{ name: 'projectreport' }"
          custom
          v-slot="{ navigate }"
        >
          <button
            role="tab"
            class="nav-link"
            :class="{ 'active': currentRouteName === 'checklist' }"
            @click="navigate"
            :aria-current="currentRouteName === 'projectreport' ? 'page' : false"
            disabled
          >
            <i class="bi bi-clipboard-check"></i>
            Checklist
          </button>
        </router-link>
      </nav>

      <div role="tabpanel">
        <router-view />
      </div>

    </div>
    <div v-else class="fs-1">😞</div>
  </div>

  <ProjectModal
    v-if="currentProject"
    v-model="projectModalVisible"
    mode="edit"
  />
</template>

