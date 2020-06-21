<template>
  <div class="content">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page pageList">
      <section>
        <section class="table">
          <h1>Lista</h1>
          <!-- TODO: Get real data -->
          <section class="tableActions">
            <nuxt-link to="/config/create" class="btnAdd">
              Criar
            </nuxt-link>
          </section>
          <table>
            <thead>
              <th>
                Cidade
              </th>
              <th>
                Latitude
              </th>
              <th>
                Longitude
              </th>
              <th>
                Criado em
              </th>
              <th>
                Atualizado em
              </th>
              <th>
                Ações
              </th>
            </thead>
            <tbody>
              <tr class="group">
                <td colspan="5">
                  Brasil
                </td>
                <td>
                  <span>
                    Edit
                  </span>
                  <span>
                    Delete
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Rio de Janeiro
                </td>
                <td>
                  -
                </td>
                <td>
                  -
                </td>
                <td>
                  2020-06-20
                </td>
                <td>
                  -
                </td>
                <td>
                  <span>
                    Edit
                  </span>
                  <span>
                    Delete
                  </span>
                </td>
              </tr>
              <tr class="group">
                <td colspan="5">
                  Estados Unidos
                </td>
                <td>
                  <span>
                    Edit
                  </span>
                  <span>
                    Delete
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Atlanta
                </td>
                <td>
                  -
                </td>
                <td>
                  -
                </td>
                <td>
                  2020-06-20
                </td>
                <td>
                  -
                </td>
                <td>
                  <span>
                    Edit
                  </span>
                  <span>
                    Delete
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </div>

    <!-- Not logged in -->
    <div v-else>
      <p>Você não tem permissão para acessar esta página.</p>
      <NuxtLink to="/login">
        Clique aqui para fazer login
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
// TODO: Move to Table component
table {
  width: 100%;
  border: 1px solid #ccc;

  thead th {
    border-bottom: 1px solid #ccc;
  }

  tbody {
    .group {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  }
}
</style>
