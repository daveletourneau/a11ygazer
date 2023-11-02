import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import ProjectSummaryView from '../views/ProjectSummaryView.vue'
import ProjectIssuesView from '../views/ProjectIssuesView.vue'
import ProjectReportView from '../views/ProjectReportView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/project/:project_id',
      redirect: { name: 'projectsummary' },
      name: 'project',
      meta: { transition: 'slide-left' },
      component: ProjectView,
      children: [
        {
          path: 'summary',
          name: 'projectsummary',
          component: ProjectSummaryView,
        },
        {
          path: 'issues',
          name: 'projectissues',
          component: ProjectIssuesView
        },
        {
          path: 'report',
          name: 'projectreport',
          component: ProjectReportView
        },
      ]
    },
  ]
})

export default router
