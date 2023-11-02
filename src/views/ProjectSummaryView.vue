<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'
import { Marked } from 'marked'
import PageList from '@/components/pageList.vue'
import IssueModal from '@/components/IssueModal.vue'
import PageModal from '@/components/PageModal.vue'

const marked = new Marked()
const projectStore = useProjectStore()
const project = computed(() => projectStore.currentProject)
const issueModalVisible = ref<boolean>(false)
const pageModalVisible = ref<boolean>(false)

const showIssueModal = () => {
  issueModalVisible.value = true
}

const showPageModal = () => {
  pageModalVisible.value = true
}

const openReport = () => {
  window.open('/mcn.html', '', 'width=850,height=1100')
}
</script>

<template>
  <div class="d-flex flex-column flex-lg-row gap-3">

    <!-- Description -->
    <section class="flex-grow-1">
      <div v-html="marked.parse(project?.description || '')"></div>
    </section>

    <!-- Summary -->
    <aside
      aria-label="Sommaire"
      class="d-flex flex-column gap-3"
    >

      <!-- DETAILS -->
      <section aria-label="Projet">
        <h2 id="lbl-pages">Détails</h2>

        <dl v-if="project">
          <div v-if="project.client">
            <dt>Client</dt>
            <dd>{{ project.client }}</dd>
          </div>
          <div v-if="project.conformity">
            <dt>Standard de référence</dt>
            <dd>{{ project.conformity }}</dd>
          </div>
          <div v-if="project.created">
            <dt>Date de création</dt>
            <dd>{{ new Date(project.created).toDateString() }}</dd>
          </div>
        </dl>
      </section>

      <!-- ISSUES OVERVIEW -->
      <section aria-labelledby="lbl-problems">

        <!-- ISSUES OVERVIEW - header -->
        <div class="d-flex justify-content-between mb-2">
          <h2 id="lbl-problems">Problèmes <small
              v-if="project?.issues?.length"
              class="text-body-secondary fs-5 fw-1"
            >({{ project.issues.length }})</small></h2>
          <div>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="showIssueModal"
            >
              <i
                class="bi bi-clipboard2-plus-fill me-2"
                aria-hidden="true"
              ></i>
              <span class="d-none d-md-inline-block">Ajouter <span class="visually-hidden">un problème</span></span>
            </button>
          </div>
        </div>

        <!-- ISSUES OVERVIEW - issues by impact -->
        <dl
          v-if="project?.issues?.length"
          aria-label="Problèmes par niveau de criticité"
        >
          <div class="dl-inline">
            <dt class="impact impact-critical">Critiques :</dt>
            <dd>{{ project?.issuesFilteredBySeverity!('critical').value.length || 'aucun' }}
              <span v-if="project?.issuesFilteredBySeverity('critical').value.length">({{
                Math.floor(project.issuesFilteredBySeverity('critical').value.length / project!.issues!.length * 100.0)
              }}%)
              </span>
            </dd>
          </div>
          <div class="dl-inline">
            <dt class="impact impact-important">Importants :</dt>
            <dd>{{ project && project.issuesFilteredBySeverity &&
              project?.issuesFilteredBySeverity('important').value.length || 'aucun' }}
              <span v-if="project?.issuesFilteredBySeverity('important').value.length">({{
                Math.floor(project.issuesFilteredBySeverity('important').value.length
                  / project!.issues!.length * 100.0) }}%)
              </span>
            </dd>
          </div>
          <div class="dl-inline">
            <dt class="impact impact-moderate">Modérés :</dt>
            <dd>{{ project && project.issuesFilteredBySeverity &&
              project?.issuesFilteredBySeverity('moderate').value.length || 'aucun' }}
              <span v-if="project?.issuesFilteredBySeverity('moderate').value.length">({{
                Math.floor(project.issuesFilteredBySeverity('moderate').value.length
                  / project!.issues!.length * 100.0) }}%)
              </span>
            </dd>
          </div>
          <div class="dl-inline">
            <dt class="impact impact-minor">Mineurs :</dt>
            <dd>{{ project && project.issuesFilteredBySeverity && project?.issuesFilteredBySeverity('minor').value.length
              || 'aucun' }}
              <span v-if="project?.issuesFilteredBySeverity('minor').value.length">({{
                Math.floor(project.issuesFilteredBySeverity('minor').value.length
                  / project!.issues!.length * 100.0) }}%)
              </span>
            </dd>
          </div>
        </dl>
        <p v-else>Aucun problème n'a été saisi pour l'instant.</p>
      </section>

      <!-- Pages -->
      <section aria-labelledby="lbl-pages">
        <div class="d-flex justify-content-between mb-2">
          <h2 id="lbl-pages">
            Pages
            <small
              v-if="project?.pages?.length"
              class="text-body-secondary fs-5 fw-1"
            >({{ project.pages.length }})
            </small>
          </h2>
          <div>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="showPageModal"
            >
              <i
                class="bi bi-file-earmark-plus-fill me-2"
                aria-hidden="true"
              ></i>
              <span class="d-none d-md-inline">Ajouter <span class="visually-hidden">une page</span></span>
            </button>
          </div>
        </div>

        <PageList :pages="projectStore.currentProject?.pages" />
      </section>

      <!-- Report -->
      <section>
        <hr aria-hidden="true">
        <div class="mb-3 d-grid gap-2">
          <button
            @click="openReport"
            class="btn btn-primary"
          >
            <i class="bi bi-printer-fill"></i> Imprimer le rapport
          </button>
        </div>
      </section>

    </aside>

  </div>

  <IssueModal
    v-model="issueModalVisible"
    mode="create"
    size="modal-fullscreen"
  />

  <PageModal
    v-model="pageModalVisible"
    mode="create"
  />
</template>

<style>
aside {
  min-width: 30%;
}
</style>