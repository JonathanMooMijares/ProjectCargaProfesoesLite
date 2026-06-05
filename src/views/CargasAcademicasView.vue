<template>
    <section>
        <TituloPagina title="Cargas Académicas" btnLabel="Crear Carga Academica" @accion="abrirModal()" />
    </section>
    <section>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="table-primary">
                    <tr>
                        <th>Profesor</th>
                        <th>Materia</th>
                        <th>Periodo</th>
                        <th>Grupo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="carga in state.cargas" :key="carga.id">
                        <td>{{ obtenerNombreProfesor(carga.profesorId) }}</td>
                        <td>{{ obtenerNombreMateria(carga.materiaId) }}</td>
                        <td>{{ obtenerNombrePeriodo(carga.periodoId) }}</td>
                        <td>{{ carga.grupo }}</td>
                        <td>
                            <div class="justify-content-between d-flex gap-2">
                                <button class="btn btn-primary" @click="abrirModal(carga)">Editar</button>
                                <button class="btn btn-danger" @click="eliminar(carga.id)">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <FormularioModal :title="editando ? 'Editar Carga' : 'Nueva Carga'" :show="modalVisible" @close="cerrarModal">
        <form @submit.prevent="guardar">

            <div class="mb-3">
                <label class="form-label">Profesor</label>
                <select v-model="form.profesorId" class="form-select" required>
                    <option value="">Seleccionar profesor</option>
                    <option v-for="profesor in state.profesores" :value="profesor.id" :key="profesor.id">
                        {{ profesor.nombre }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Materia</label>
                <select v-model="form.materiaId" class="form-select" required>
                    <option value="">Seleccionar materia</option>
                    <option v-for="materia in state.materias" :value="materia.id" :key="materia.id">
                        {{ materia.nombre }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Periodo</label>
                <select v-model="form.periodoId" class="form-select" required>
                    <option value="">Seleccionar periodo</option>
                    <option v-for="periodo in state.periodos" :value="periodo.id" :key="periodo.id">
                        {{ periodo.nombre }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Grupo</label>
                <input v-model="form.grupo" class="form-control" required placeholder="Ej. 401-A" />
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    {{ editando ? 'Guardar cambios' : 'Registrar carga' }}
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
    cargas: [],
    profesores: [],
    materias: [],
    periodos: []
})

const cargarInformacion = async () => {
    try {
        const cargasRes = await axios.get('http://localhost:3001/cargas')

        const profesoresRes = await axios.get('http://localhost:3001/profesores')
        const materiasRes = await axios.get('http://localhost:3001/materias')
        const periodosRes = await axios.get('http://localhost:3001/periodos')

        state.cargas = cargasRes.data
        state.profesores = profesoresRes.data
        state.materias = materiasRes.data
        state.periodos = periodosRes.data
    } catch (error) {
        console.error(error)
    }
}

const obtenerNombreProfesor = (idProfesor) => {
    const profesor = state.profesores.find(profesor => String(profesor.id) === String(idProfesor))
    return profesor ? profesor.nombre : 'No asignado'
}
const obtenerNombreMateria = (idMateria) => {
    const materia = state.materias.find(materia => String(materia.id) === String(idMateria))
    return materia ? materia.nombre : 'Desconocida'
}
const obtenerNombrePeriodo = (idPeriodo) => {
    const periodo = state.periodos.find(periodo => String(periodo.id) === String(idPeriodo))
    return periodo ? periodo.nombre : 'N/A'
}


const editando = ref(null)
const modalVisible = ref(false)
const form = ref(formVacio())
function formVacio() {
    return { profesorId: '', materiaId: '', periodoId: '', grupo: '' }
}

function abrirModal(carga = null) {
    editando.value = carga
    form.value = carga ? { ...carga } : formVacio()
    modalVisible.value = true
}
function cerrarModal() {
    modalVisible.value = false
    editando.value = null
}


const guardar = async () => {
    try {
        if (editando.value) {
            await axios.put(`http://localhost:3001/cargas/${editando.value.id}`, form.value)
        } else {
            await axios.post('http://localhost:3001/cargas', form.value)
        }
        await cargarInformacion()
        cerrarModal()
    } catch (error) {
        console.error('Error al guardar el carga:', error)
    }
}

const eliminar = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar a este carga?')) {
        try {
            await axios.delete(`http://localhost:3001/cargas/${id}`)
            await cargarInformacion()
        } catch (error) {
            console.error('Error al eliminar el carga:', error)
        }
    }
}

onMounted(() => {
    cargarInformacion()
})

</script>

<style lang="scss" scoped></style>