<template>
  <div class="d-flex justify-center flex-column">
    <v-card-title>Dados Site do fundamentus</v-card-title>
    <Table :data="data" :indice="indice"></Table>

    <v-card-title>Ordenando e genrando EV/EBIT o Ranck EV/EBIT</v-card-title>
    <v-card-text>
      <v-btn @click="next(proximo)">Passo {{ proximo }}</v-btn>
      <v-card-text>
        {{ message }}
      </v-card-text>
    </v-card-text>

    <Table :data="data2" :indice="indice2"></Table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Table from './components/Table.vue';

export default {
  name: "Home",
  comments: { Table },
  data() {
    return {
      data: "",
      data2: [],
      proximo: 1,
      message: `Primeiro vamos compor a tabela apenas com os indices que iportam para
          fromula e adicinar mais três colunas`,
      indice: [
        "Papel",
        "Cotação",
        "P/L",
        "P/VP",
        "PSR",
        "Div. Yield",
        "P/Ativo",
        "P/Cap. Giro",
        "P/EBIT",
        "P/Ativ Circ. Liq",
        "EV/EBIT",
        "EV/EBITDA",
        "Mig Ebit",
        "Mrg. Liq",
        "Liq. Corr.",
        "ROIC",
        "ROE",
        "Liq. 2meses",
        "Patrim. Liq",
        "Div. Brut/Patrim",
        "Cresc. Rec. 5a"
      ],
      indice2: [
        "Papel",
        "EV/EBIT",
        "ROIC %",
        "Liq. 2meses",
        "P/L",
        "Ranck EV/EBIT",
        "Ranck ROIC",
        "Ranck RM",
      ]
    };
  },
  mounted() {
    this.start();
  },
  watch: {
    fundamentus() {
      this.data = this.fundamentus;
    }
  },
  computed: {
    ...mapGetters("fundamentus", ["fundamentus"])
  },
  methods: {
    ...mapActions("fundamentus", ["start"]),

    odernar(array, indice) {
      array.sort((x, y) => {
        return parseFloat(x[indice]) - parseFloat(y[indice])
      })
    },

    desodernar(array, indice) {
      array.sort((x, y) => {
        return parseFloat(y[indice]) - parseFloat(x[indice])
      })
    },
    rankeando(array, rank) {
      array.forEach((e, index) => {
        e[rank] = index + 1
      })
    },
    limparNegativos(array, indice) {
      const element = []
      array.forEach(e => {
        if (parseFloat(e[indice]) > 0.0) {
          element.push(e)
        }
      })
      return element
    },

    next(key) {
      switch (key) {
        case 1:
          this.data.forEach((e) => {
            this.data2.push({
              Papel: e.Papel, 'EV/EBIT': e['EV/EBIT'], ROIC: e['ROIC'], 'Liq. 2meses': e['Liq. 2meses'],"P/L":e['P/L'], 'Ranck EV/EBIT': '', 'Ranck ROIC': '',
              'Ranck RM': ''
            })
          })
          this.message = `Dados Importados. Agora iremos ordenar a coluna  EV/EBIT em ordem crescente`
          this.data2 = this.limparNegativos(this.data2, 'P/L')
          break;
        case 2:
          this.odernar(this.data2, 'EV/EBIT')
          this.message = 'Como a coluna EV/EBIT ordenanada, agora iremos apagar as linhas que contenha indices 0 ou negativos'
          break;
        case 3:
          this.data2 = this.limparNegativos(this.data2, 'EV/EBIT')
          this.message = 'Dados limpos, agora vamos gerar um ranck dos mekores indices da coluna EV/EBIT'
          break
        case 4:
          this.rankeando(this.data2, 'Ranck EV/EBIT')
          this.message = 'Pronto Ranck feito! Vamos então fazer o mesmo para acoluna ROIC só que em ordem decrecente'
          break

        case 5:
          this.desodernar(this.data2, 'ROIC')
          this.message = 'ROIC ordenado em ordem decrecente, agora iremos apagar as linhas que contenha indices 0 ou negativos '
          break

        case 6:
          this.data2 = this.limparNegativos(this.data2, 'ROIC')
          this.message = 'Linhas negativas apagadas, só falta gerar o ranck'
          break
        case 7:
          this.rankeando(this.data2, 'Ranck ROIC')
          this.message = 'Pronto! Para gerar o Ranck RM iremos somar as colunas Ranck EV/EBIT com a coluna Ranck ROIC'
          break
        case 8:
          this.data2.forEach((e) => {
            e['Ranck RM'] = e['Ranck EV/EBIT'] + e['Ranck ROIC']
            this.message = 'Somado, agora é so ordenar Ranck RM'
          })
          break
        case 9:
          this.odernar(this.data2, 'Ranck RM')
          this.message = 'E este é o resultado'
          break

        case 10:
          this. message= `Primeiro vamos compor a tabela apenas com os indices que iportam para
          fromula e adicinar mais três colunas`,
          this.proximo = -1
          this.data = []
          this.data2 = []
          this.start()
          break
      }
      this.proximo++
    }

  },
  components: { Table }
}
</script>
