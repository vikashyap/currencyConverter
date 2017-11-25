class app extends RatesService {
    constructor() {
        super()
        this.form = {}
    }

    loadDomSelectors() {
        this.form.dropSelect1 = document.getElementById("selectDropBox1");
        this.form.dropSelect2 = document.getElementById("selectDropBox2");
        this.form.inputSelect1 = document.getElementById("textbox1");
        this.form.inputSelect2 = document.getElementById("textbox2");
        this.form.imageContainer = document.getElementById("imageContainer");
        this.form.currencySign1 = document.getElementById("currencySign1");
        this.form.currencySign2 = document.getElementById("currencySign2");
        this.form.imageContainer.addEventListener('click', this.switchSrsDestination.bind(this), false);
        this.form.inputSelect1.addEventListener('keyup', this.checkNumber.bind(this), false);
        this.form.dropSelect1.addEventListener('change', this.convertCurrency.bind(this), false);
        this.form.dropSelect2.addEventListener('change', this.convertCurrency.bind(this), false);
    }


    addOptions() {
        this.ratesData.requiredRates.map(item => {
            let myOption1 = document.createElement("option");
            let myOption2 = document.createElement("option");
            myOption1.text = item.id;
            myOption1.value = item.id;
            myOption2.text = item.id;
            myOption2.value = item.id;
            this.form.dropSelect1.add(myOption1);
            this.form.dropSelect2.add(myOption2);
        })
        this.form.dropSelect1.value = "USD";
        this.form.dropSelect2.value = "EUR";
    }

    convertCurrency() {
        const form = this.form;
        if (form.inputSelect1.value) {
            const val = fx(parseFloat(form.inputSelect1.value))
                .from(form.dropSelect1.value).to(form.dropSelect2.value)
                .toFixed(2);
            form.inputSelect2.value = val;
        }
        this.changeSymbol();
    }
    switchSrsDestination() {
        let dropSwap = this.form.dropSelect1.value;
        this.form.dropSelect1.value = this.form.dropSelect2.value;
        this.form.dropSelect2.value = dropSwap;
        this.convertCurrency();
    }
    changeSymbol() {
        this.ratesData.requiredRates.map(item => {
            item.id === this.form.dropSelect1.value ?
                this.form.currencySign1.innerText = item.symbol : '';
            item.id === this.form.dropSelect2.value ?
                this.form.currencySign2.innerText = item.symbol : '';
        });
    }
    checkNumber() {
        this.form.inputSelect1.value = this.form.inputSelect1.value.replace(/\D/g, '');
        if (!this.form.inputSelect1.value) {
            this.form.inputSelect2.value = '';
            return;
        } else {
            this.convertCurrency();
        }
    }
}

let data = new app();
data.loadRates().then(() => {
    data.loadDomSelectors();
    fx.rates = data.ratesData;
    data.addOptions();
    data.convertCurrency();
});