<template>
    <div>
        <md-table v-model="alarms" md-card>
            <md-table-toolbar>
                <h1 class="md-title">Alarmas</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Unidad" md-sort-by="unidad" >{{item.unidad}}</md-table-cell>
                <md-table-cell md-label="Hora" md-sort-by="date">{{item.date}}</md-table-cell>
                <md-table-cell md-label="Geocerca" md-sort-by="pos">{{item.pos}}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
export default {
    name: "tabla",
    data(){
        return {
            alarms:[
                {
                    unidad: "100",
                    date: "2019-12-23 11:25:00",
                    pos: "LAS GLORIAS"
                },
                {
                    unidad: "149",
                    date: "2019-12-23 11:25:00",
                    pos: "LAS GLORIAS"
                },
                {
                    unidad: "155",
                    date: "2019-12-23 11:25:00",
                    pos: "LAS GLORIAS"
                }
            ]
        }
    }
}
</script>

<style>

</style>