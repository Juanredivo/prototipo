function carregarOpcoesRamoRegiao() {
    fetch('/opcoes-ramo-regiao')
        .then(response => response.json())
        .then(data => {
            const opcoesRamo = data.ramo;
            const opcoesRegiao = data.regiao;

            const ramoSelect = document.getElementById('ramo');
            opcoesRamo.forEach(opcao => {
                const option = document.createElement('option');
                option.value = opcao;
                option.textContent = opcao;
                ramoSelect.appendChild(option);
            });

            const regiaoSelect = document.getElementById('regiao');
            opcoesRegiao.forEach(opcao => {
                const option = document.createElement('option');
                option.value = opcao;
                option.textContent = opcao;
                regiaoSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error(error);
        });
}


carregarOpcoesRamoRegiao();

document.addEventListener('DOMContentLoaded', () => {
    carregarOpcoesRamoRegiao();
});