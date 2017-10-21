<template>
    <div >
        <div class="frame" v-for="(t, index) in traces" :class="{'frame-application':isApplicationFrame(t.file)}">
            <span class="frame-index">{{t.id}}</span>
            <div class="frame-method-info">
                <span class="frame-class">
                    <lar-error-folder class="inline" :folders="transformClass(t.class)" ></lar-error-folder>
                </span>
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
    methods: {
      //class转数组
      transformClass(className){
        return (className && className.split("\\")) || [];
      },
      //判断异常是框架位置还是application
      isApplicationFrame(file) {
        return !(typeof file === 'string' && file.indexOf("/vendor/") > 0)
      },
      //file转数组
      transformFilePath(file) {
        return (file && file.replace(this.rootFolder, '…').split("/")) || [];
      }

    }
  }
</script>