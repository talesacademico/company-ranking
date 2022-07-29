import axios from 'axios'
const header = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
}
export default {
  namespaced: true,
  state: {
    fundamentus: {}
  },
  getters: {
    fundamentus: state => state.fundamentus,
  },
  mutations: {
    start(state, val) {
      state.fundamentus = val
    }
  },
  actions: {
    async start({ commit }) {
      let res
      let obj = {}
      const array = []
      const indice = {
        'Papel': '', 'Cotação': '', 'P/L': '', 'P/VP': '', 'PSR': '', 'Div. Yield': '', 'P/Ativo': '',
        'P/Cap. Giro': '', 'P/EBIT': '', 'P/Ativ Circ. Liq': '', 'EV/EBIT': '', 'EV/EBITDA': '', 'Mig Ebit': '', 'Mrg. Liq': '',
        'Liq. Corr.': '', 'ROIC': '', 'ROE': '', 'Liq. 2meses': '', 'Patrim. Liq': '', 'Div. Brut/Patrim': '', 'Cresc. Rec. 5a': ''
      }

      await axios.get('http://localhost:8080/resultado.php', { header: header }).then(response => (res = response))

      res = res.data.match(/<([td])\s?[a-z="\s?]*>(\n?.*\n?)<\/td>/g)
      let count=0 
      res.forEach((element, index) => {
        if (index % 21 == 0) {
          element = element.replace(/<\/a><\/span><\/td>/g, '')
          element = element.replace(/<([td])\s?[a-z="\s?]*>(\n?.*\n?)>/g, '')
          Object.assign(obj, indice)
          obj[`${Object.entries(indice)[0][0]}`] = element
          count++

        } else {
          element = element.replace(/<\/?td?>/g, '')
          obj[`${Object.entries(indice)[count][0]}`] = element
          array.push(obj)
          count++
          console.log(element)
        }
        if(count==21){
          count =0
        }
      });

      commit('start', array)
    }
  },
}
