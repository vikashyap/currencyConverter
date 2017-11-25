class RatesService {
    constructor() {
        this.ratesData = {
            base: ' ',
            requiredRates: [
                { id: 'EUR',
                    symbol: '€' },
                { id: 'USD',
                    symbol: '$' },
                { id: 'JPY',
                    symbol: '¥' }
            ]
        }
    }
    loadRates() {
        return axios({
                method: 'get',
                url: "https:api.fixer.io/latest?base=INR"
            })
            .then(response => {
                this.ratesData.base = response.data.base;
                this.ratesData.requiredRates.map(item => {
                this.ratesData[item.id]= response.data.rates[item.id]
                })
            }).catch(function(error) {
                console.log(error);
            });
    }
}