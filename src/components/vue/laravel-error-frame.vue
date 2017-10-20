<template>
    <div >
        <div class="frame" v-for="(t, index) in traces"
             :class="{'frame-application':isApplicationFrame(t.file)}">
            <span class="frame-index">{{errorNum - index - 1}}</span>
            <div class="frame-method-info">
                <span class="frame-class">{{t.class}}</span>
                <span class="frame-function"><div class="delimiter">{{t.function}}</div></span>
            </div>

            <div class="frame-file">
                <lar-error-folder class="inline" :folders="transformFilePath(t.file)"></lar-error-folder>
                <span class="frame-line">{{t.line}}</span>
            </div>
        </div>
    </div>
</template>
<script>
  import larErrorFolder from './laravel-error-folder.vue'

  export default {
    components: {larErrorFolder},
    name: 'larErrorFrame',
    props: ['traces', 'rootFolder'],
    computed: {
      errorNum() {
        return (typeof this.traces === 'object' && this.traces.length) || 0;
      }
    },
    methods: {
      isApplicationFrame(file) {
        return !(typeof file === 'string' && file.indexOf("/vendor/") > 0)
      },
      transformFilePath(file) {
        return (file && file.replace(this.rootFolder, '…').split("/")) || [];
      }

    }
  }
</script>