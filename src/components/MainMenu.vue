<script setup lang="ts">

import ProjectList from './ProjectList.vue'
import { ref, onMounted } from 'vue'
import { Offcanvas } from 'bootstrap'
import ProjectModal from '@/components/ProjectModal.vue'

const menuPanel = ref<Offcanvas | null>(null)
const modalVisible = ref<boolean>(false)

onMounted(() => {
  const offcanvas_el = document.getElementById('offcanvasMenu')
  if (offcanvas_el)
    menuPanel.value = new Offcanvas(offcanvas_el)
})

/* -------------------------------------------------------------------------- */
/*                                   METHODS                                  */
/* -------------------------------------------------------------------------- */
function hideMenu() {
  menuPanel.value?.hide()
}

function showCreateProjectModal() {
  modalVisible.value = true
}

</script>

<template>
  <!-- Bouton toggle du menu -->
  <button
    class="btn btn-lg btn-primary rounded-0"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasMenu"
    aria-controls="offcanvasMenu"
    aria-label="Menu"
  ><i class="bi-list"></i>
  </button>

  <!-- Menu principal offcanvas -->
  <div
    id="offcanvasMenu"
    class="offcanvas offcanvas-start"
    tabindex="-1"
    aria-labelledby="offcanvasMenuLabel"
  >

    <div class="d-flex flex-column h-100">
      <div class="offcanvas-header">
        <h2
          class="offcanvas-title fs-5"
          id="offcanvasMenuLabel"
        >
          <router-link :to="{ name: 'home' }"><i class="bi bi-house-fill text-primary"></i></router-link>
          <i class="bi bi-chevron-right"></i>
          Projets
        </h2>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Fermer"
        >
        </button>
      </div>
      <div class="offcanvas-body">

        <!-- Liste des projets -->
        <ProjectList @projectSelected="hideMenu" />
        <hr aria-hidden="true">
        <!-- Bouton nouveau projet -->
        <div class="d-grid gap-2">
          <button
            type="button"
            class="btn btn-secondary"
            @click="showCreateProjectModal"
          >
            Créer un projet
          </button>
        </div>

        <!-- <div class="flex-grow-1">
          <button
            class="btn btn-light"
            disabled
          >Configuration</button>
        </div> -->
      </div>
    </div>
  </div>

  <ProjectModal
    v-model="modalVisible"
    mode="create"
  />
</template>