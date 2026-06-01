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
                        <th>Creditos</th>
                        <th>Horas por semana</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="periodo in state.Periodos" :key="periodo.id">
                        <td>{{ periodo.nombre }}</td>
                        <td>{{ periodo.clave }}</td>
                        <td>{{ periodo.creditos }}</td>
                        <td>{{ periodo.horasSemana }}</td>
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
                <input v-model="form.nombre" class="form-control" required placeholder="Ej. Matemáticas I" />
            </div>
            <div class="fg mb-3">
                <label class="form-label">Clave</label>
                <input v-model="form.clave" class="form-control" required placeholder="Ej. 1961" />
            </div>
            <div class="fg mb-3">
                <label class="form-label">Créditos</label>
                <input v-model="form.creditos" type="number" class="form-control" required placeholder="Ej. 8" />
            </div>
            <div class="fg mb-3">
                <label class="form-label">Horas por semana</label>
                <input v-model="form.horasSemana" type="number" class="form-control" required placeholder="Ej. 6" />
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
        const response = await axios.get('http://localhost:3001/Periodos')
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
    return { nombre: '', matricula: '', correo: '', telefono: '', }
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
            // Petición para actualizar (PUT)
            await axios.put(`http://localhost:3001/Periodos/${editando.value.id}`, form.value)
        } else {
            // Petición para registrar nuevo (POST)
            await axios.post('http://localhost:3001/Periodos', form.value)
        }
        await fetchPeriodos() // Refrescar la tabla automáticamente
        cerrarModal()           // Cerrar el modal limpio
    } catch (error) {
        console.error('Error al guardar el periodo:', error)
    }
}

const eliminar = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar a este periodo?')) {
        try {
            await axios.delete(`http://localhost:3001/Periodos/${id}`)
            await fetchPeriodos() // Refrescar la tabla
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