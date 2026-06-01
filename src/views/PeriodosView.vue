<template>
    <section>
        <TituloPagina title="Periodos" btnLabel="Agregar Periodos" @accion="abrirModal()" />
    </section>
    <section>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="table-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Clave</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="periodo in state.Periodos" :key="periodo.id">
                        <td>{{ periodo.nombre }}</td>
                        <td>{{ periodo.clave }}</td>
                        <td>{{ periodo.activo ? 'Activo' : 'Inactivo' }}</td>                        
                        <td>
                            <div class="justify-content-between d-flex gap-2">
                                <button class="btn btn-primary" @click="abrirModal(periodo)">Editar</button>
                                <button class="btn btn-danger" @click="eliminar(periodo.id)">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <ModalForm :title="editando ? 'Editar periodo' : 'Nueva periodo'" :show="modalVisible" @close="cerrarModal">
        <form @submit.prevent="guardar">
            <div class="fg mb-3">
                <label class="form-label">Nombre</label>
                <input v-model="form.nombre" class="form-control" required placeholder="Ej. Agosto – Diciembre 2025" />
            </div>
            <div class="fg mb-3">
                <label class="form-label">Clave</label>
                <input v-model="form.clave" class="form-control" required placeholder="Ej. 2025-1" />
            </div>
            <div class="fg mb-3">
                <label class="form-label">Estado</label>
                <select v-model="form.activo" class="form-control" required>
                    <option :value="true">Activo</option>
                    <option :value="false">Inactivo</option>
                </select>
            </div>
            
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    {{ editando ? 'Guardar cambios' : 'Registrar periodo' }}
                </button>
            </div>
        </form>
    </ModalForm>


</template>

<script setup>
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import TituloPagina from '@/components/TituloPagina.vue';
import ModalForm from '@/components/FormularioModal.vue';

const state = reactive({
    Periodos: []
})

const fetchPeriodos = async () => {
    try {
        const response = await axios.get('http://localhost:3001/periodos')
        state.Periodos = response.data
        console.log(state.Periodos)
    } catch (error) {
        console.error(error)
    }
}

const editando = ref(null)
const modalVisible = ref(false)
const form = ref(formVacio())
function formVacio() {
    return { nombre: '', clave: '', activo: false}
}

function abrirModal(periodo = null) {
    editando.value = periodo
    form.value = periodo ? { ...periodo } : formVacio()
    modalVisible.value = true
}
function cerrarModal() {
    modalVisible.value = false
    editando.value = null
}


const guardar = async () => {
    try {
        if (editando.value) {
            await axios.put(`http://localhost:3001/periodos/${editando.value.id}`, form.value)
        } else {
            await axios.post('http://localhost:3001/periodos', form.value)
        }
        await fetchPeriodos() 
        cerrarModal()           
    } catch (error) {
        console.error('Error al guardar el periodo:', error)
    }
}

const eliminar = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar a este periodo?')) {
        try {
            await axios.delete(`http://localhost:3001/periodos/${id}`)
            await fetchPeriodos() 
        } catch (error) {
            console.error('Error al eliminar el periodo:', error)
        }
    }
}

onMounted(() => {
    fetchPeriodos()
})

</script>

<style lang="scss" scoped></style>