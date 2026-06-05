<template>
    <section>
        <TituloPagina title="Profesores" btnLabel="Agregar Profesores" @accion="abrirModal()" />
    </section>
    <section>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="table-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Matrícula</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="profesor in state.profesores" :key="profesor.id">
                        <td>{{ profesor.nombre }}</td>
                        <td>{{ profesor.matricula }}</td>
                        <td>{{ profesor.correo }}</td>
                        <td>{{ profesor.telefono }}</td>
                        <td>
                            <div class="justify-content-between d-flex gap-2">
                                <button class="btn btn-primary" @click="abrirModal(profesor)">Editar</button>
                                <button class="btn btn-danger" @click="eliminar(profesor.id)">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <FormularioModal :title="editando ? 'Editar Docente' : 'Nuevo Docente'" :show="modalVisible" @close="cerrarModal">
        <form @submit.prevent="guardar">
            <div class="fg mb-3">
                <label class="form-label">Nombre completo</label>
                <input v-model="form.nombre" class="form-control" required placeholder="Ej. Ing. Carlos Ramírez" />
            </div>
            <div class="fg mb-3">
                <label class="form-label">Matrícula</label>
                <input v-model="form.matricula" class="form-control" required placeholder="Ej. 123456" />
            </div>
            <div class="fg mb-3">
                <label class="form-label">Correo institucional</label>
                <input v-model="form.correo" type="correo" class="form-control" required
                    placeholder="docente@itsch.edu.mx" />
            </div>
            <div class="fg mb-3">
                <label class="form-label">Teléfono</label>
                <input v-model="form.telefono" class="form-control" required placeholder="Ej. 9981234567" />
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    {{ editando ? 'Guardar cambios' : 'Registrar docente' }}
                </button>
            </div>
        </form>
    </FormularioModal>


</template>

<script setup>
    
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import TituloPagina from '@/components/TituloPagina.vue';
import FormularioModal from '@/components/FormularioModal.vue';

const state = reactive({
    profesores: []
})

const fetchProfesores = async () => {
    try {
        const response = await axios.get('http://localhost:3001/profesores')
        state.profesores = response.data
        //console.log(state.profesores)
    } catch (error) {
        console.error(error)
    }
}

// variables reactivas
const editando = ref(null)
const modalVisible = ref(false) 
const form = ref(formVacio())


function formVacio() {
    return { nombre: '', matricula: '', correo: '', telefono: '', }
}

function abrirModal(profesor = null) {
    editando.value = profesor
    form.value = profesor ? { ...profesor } : formVacio()
    modalVisible.value = true
}
function cerrarModal() {
    modalVisible.value = false
    editando.value = null
}


const guardar = async () => {
    try {
        if (editando.value) {
            await axios.put(`http://localhost:3001/profesores/${editando.value.id}`, form.value)
        } else {
            await axios.post('http://localhost:3001/profesores', form.value)
        }
        await fetchProfesores() 
        cerrarModal()           
    } catch (error) {
        console.error('Error al guardar el docente:', error)
    }
}

const eliminar = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar a este profesor?')) {
        try {
            await axios.delete(`http://localhost:3001/profesores/${id}`)
            await fetchProfesores()
        } catch (error) {
            console.error('Error al eliminar el docente:', error)
        }
    }
}
onMounted(() => {
    fetchProfesores()
})

</script>

<style lang="scss" scoped></style>