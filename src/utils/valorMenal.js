const calculoMensal = (modalidade, plano )=>{
    let valor = 0

    if (plano=="Semestral") {
        switch (modalidade) {
            case "Musculação":
                valor = 90 * 0.85;               
                break;
            case "Funcional":
                valor = 120 * 0.85;
                break;
            case "Dança":
                valor = 100 * 0.85;
                break;
            default:
                console.log("Serviço inválido!");
                break;
        }
    }
    if (plano=="Trimestral"){
        switch (modalidade) {
            case "Musculação":
                valor = 90  *0.90;               
                break;
            case "Funcional":
                valor = 120 * 0.90;
                break;
            case "Dança":
                valor = 100 * 0.90;
                break;
            default:
                console.log("Serviço inválido!");
                break;
          
        }
    }
    if (plano=="Mensal"){
        switch (modalidade) {
            case "Musculação":
                valor = 90;               
                break;
            case "Funcional":
                valor = 120;
                break;
            case "Dança":
                valor = 100;
                break;
            default:
                console.log("Serviço inválido!");
                break;
        }}

   

    return valor
}
export default calculoMensal