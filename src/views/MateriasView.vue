<template>
    <section>
        <TituloPagina title="Materias" btnLabel="Agregar materias" @accion="abrirModal()" />
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
                    <tr v-for="materia in state.materias" :key="materia.id">
                        <td>{{ materia.nombre }}</td>
                        <td>{{ materia.clave }}</td>
                        <td>{{ materia.creditos }}</td>
                        <td>{{ materia.horasSemana }}</td>
                        <td>
                            <div class="justify-content-between d-flex gap-2">
                                <button class="btn btn-primary" @click="abrirModal(materia)">Editar</button>
                                <button class="btn btn-danger" @click="eliminar(materia.id)">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <FormularioModal :title="editando ? 'Editar Materia' : 'Nueva Materia'" :show="modalVisible" @close="cerrarModal">
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
                    {{ editando ? 'Guardar cambios' : 'Registrar materia' }}
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
    materias: []
})

const fetchmaterias = async () => {
    try {
        const response = await axios.get('http://localhost:3001/materias')
        state.materias = response.data
        console.log(state.materias)
    } catch (error) {
        console.error(error)
    }
}

const editando = ref(null)
const modalVisible = ref(false)
const form = ref(formVacio())
function formVacio() {
    return { nombre: '', clave: '', creditos: '', horasSemana: '' }
}

function abrirModal(materia = null) {
    editando.value = materia
    form.value = materia ? { ...materia } : formVacio()
    modalVisible.value = true
}
function cerrarModal() {
    modalVisible.value = false
    editando.value = null
}


const guardar = async () => {
    try {
        if (editando.value) {
            await axios.put(`http://localhost:3001/materias/${editando.value.id}`, form.value)
        } else {
            await axios.post('http://localhost:3001/materias', form.value)
        }
        await fetchmaterias() 
        cerrarModal()           
    } catch (error) {
        console.error('Error al guardar el materia:', error)
    }
}

const eliminar = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar a este materia?')) {
        try {
            await axios.delete(`http://localhost:3001/materias/${id}`)
            await fetchmaterias()
        } catch (error) {
            console.error('Error al eliminar el materia:', error)
        }
    }
}

onMounted(() => {
    fetchmaterias()
})

</script>

<style lang="scss" scoped></style>