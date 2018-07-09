<template>
    <div class="jobTable">
        <h2>This is a {{name}} page, RESTful style</h2>
        <job/>
    </div>
</template>

<script>
import Job from '@/components/Job.vue'

export default {
  data: function () {
    return {
      name: 'JOBS'
    }
  },
  components: {
    Job
  }
}
</script>
