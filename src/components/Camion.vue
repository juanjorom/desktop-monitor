<template>
    <g>
        <!--Recuerda que el x del primer cuadro vale 100 y y vale 200 -->
        <rect :x="xInterno" :y="yInterno" rx=3 ry=3 width=25 height=22 stroke="none" fill="black"></rect>
        <rect :x="xInterno+2" :y="yInterno+2" rx=2 ry=2 width=20 height=7 stroke="none" fill="white"></rect>
        <circle :cx="xInterno+20" :cy="yInterno+10" r=1 fill="black"></circle>
        <circle :cx="xInterno+5" :cy="yInterno+17" r=2 fill="white"></circle>
        <circle :cx="xInterno+20" :cy="yInterno+17" r=2 fill="white"></circle>
        <rect :x="xInterno+9" :y="yInterno+16" rx=1 ry=1 width=7 height=1 stroke="none" fill="white"></rect>
        <rect :x="xInterno+7" :y="yInterno+18" rx=1 ry=1 width=10 height=1 stroke="none" fill="white"></rect>
        <rect :x="xInterno+2" :y="yInterno+20" rx=2 ry=2 width=3 height=5 stroke="none" fill="black"></rect>
        <rect :x="xInterno+19" :y="yInterno+20" rx=2 ry=2 width=3 height=5 stroke="none" fill="black"></rect>
    </g> 
</template>

<script>
export default {
    props: {
        xGeneral: Number,
        yGeneral: Number,
        status: String
    },
    computed: {
        xInterno(){
            return this.xGeneral-10
        },
        yInterno(){
            return this.yGeneral-10
        }
    }
}
</script>

<style>

</style>