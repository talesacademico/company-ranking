<template>
    <v-simple-table class="overflow-x-auto overflow-y-auto table" style="max-width: 1000px; max-height: 200px;">
        <template v-slot:default>
            <thead>
                <tr class="cabecalho">
                    <th class="text-left" v-for="item in indice" :key="item">
                        {{ item }}
                    </th>
                </tr>
                    <td colspan="21">
                            <v-progress-linear
                              indeterminate
                              :active="loading"
                              color="cyan"
                            ></v-progress-linear>
                      
                    </td>
            </thead>
            <tbody>
                <tr v-for="(item, i) in data" :key="i">
                    <td v-for="(el, index) in item" :key="index" :class="i % 2 == 0 ? 'line1' : 'line2'">{{ el }}</td>

                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>


<script>

export default {
    props: {
        data: Array, Object,
        indice: Array,
        loading: Boolean
    },
    watch:{
        loading(){
            setTimeout(()=>{
                this.loading
            })
        }
    }
}
</script>

<style scoped>
.line1 {
    background-color: #64B5F6;
}

.line2 {
    background-color: #BBDEFB;
}

.cabecalho {
    background-color: #1E88E5;
}
.table{
    margin: 1px 30px 30px 30px;
}
</style>