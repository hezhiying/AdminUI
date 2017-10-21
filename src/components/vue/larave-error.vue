<template>
    <div class="panel  panel-default ">
        <header class="panel-heading text-right">
            <!--<span class="badge bg-info">{{errors.message}} ({{errorNum}})</span>-->
            <ul class="nav nav-tabs">
                <li class="active"><a href="#laravel-error-1" data-toggle="tab">Application frames ({{errorAppNum}})</a>
                </li>
                <li><a href="#laravel-error-2" data-toggle="tab">All frames ({{errorNum}})</a></li>
            </ul>
        </header>
        <div class="panel-body p-n">
            <!-- TAB CONTENT -->
            <div class="tab-content">
                <div class="tab-pane fade active in" id="laravel-error-1">
                    <lar-error-frame :traces="appErrorsTrace" :root-folder="rootFolder"></lar-error-frame>
                </div>
                <div class="tab-pane fade" id="laravel-error-2">
                    <lar-error-frame :traces="errors.trace" :root-folder="rootFolder"></lar-error-frame>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import larErrorFrame from './laravel-error-frame.vue'

  export default {
    components: {larErrorFrame},
    name: 'larError',
    props: {
      errors: {
        required: true,
        default() {
          return {
            exception: '', message: '', file: '', line: '', trace: [{
              "file": "",
              "line": 0,
              "function": "",
              "class": "",
              "type": ""
            }]
          }
        }
      }
    },
    computed: {
      errorNum() {
        return this.errors.trace.length;
      },
      errorAppNum() {
        return this.appErrorsTrace.length;
      }
    },
    data() {
      return {
        rootFolder: '',
        appErrorsTrace: []
      }
    },
    created() {
      //traces新增一条数据
      this.errors.file && this.errors.trace.unshift({
        file: this.errors.file,
        line: this.errors.line,
        'class': this.errors.exception
      });
      let files, traces = this.errors.trace;
      for (let i in traces) {
        //获取文件地址转换为数组
        if (!files && traces[i]['file']) {
          files = traces[i]['file'].split("/");
          if (!files[0]) {
            files.shift()
          }
        }
        //如果没有file,line则用下一个数据
        if (i > 0 && traces[i]['file'] && !traces[i - 1]['file']) {
          traces[i - 1]['file'] = traces[i]['file']
        }
        if (i > 0 && traces[i]['line'] && !traces[i - 1]['line']) {
          traces[i - 1]['line'] = traces[i]['line']
        }
        traces[i]['id'] = traces.length - i -1;

      }

      //提取出application错误记录
      for (let item of traces) {
        if (this.isApplicationFrame(item.file)){
          this.appErrorsTrace.push(item);
          }
      }

      //查找出项目目录
      let findRootPath = function (files, traces) {
        let str = "";
        for (let folder of files) {
          str += "/" + folder;
          let pass = true;
          for (let t of traces) {
            if (t.file && !t.file.startsWith(str)) {
              pass = false;
            }
          }
          if (pass === false) {
            let folder = str.split("/");
            folder.pop();
            return folder.join("/");
          }
        }
      };

      this.rootFolder = (files && findRootPath(files, this.errors.trace)) || '';

    },
    methods: {
      isApplicationFrame(file) {
        return !(typeof file === 'string' && file.indexOf("/vendor/") > 0)
      },
      transformFilePath(file) {
        let paths = (file && file.replace(this.rootFolder, '…').split("/")) || [];
        return paths;
      }

    }

  }
</script>