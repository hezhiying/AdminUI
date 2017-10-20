<template>
        <div>
            <template v-for="(item, key) in folders" >
                <div class="delimiter">{{item}}</div><template v-if="folders.length -1 > key">/</template>
            </template>
        </div>
</template>

<script>
    export default {
      name:'larErrorFolder',
      props:['folders']
    }
</script>