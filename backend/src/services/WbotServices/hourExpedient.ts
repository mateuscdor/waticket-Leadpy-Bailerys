import ListWhatsAppsService from "../WhatsappService/ListWhatsAppsService";

const hourExpedient = async () => {
  const data = new Date();
  const weekDay = new Date().toLocaleDateString("pt-BR", {
    weekday: "long"
  });
  const hora = data.getHours();
  const min = data.toLocaleString("pt-BR", { minute: "2-digit" });
  const horaAtual = `${(hora < 10 ? "0" : "") + hora}:${min}`;
  const workHour = await ListWhatsAppsService();
  
  const weekDays: string[] = [];
  let resulta = "";

  workHour.map(value => {
    {
      value.monday ? weekDays.push("segunda-feira") : "";
    }
    {
      value.tuesday ? weekDays.push("terça-feira") : "";
    }
    {
      value.wednesday ? weekDays.push("quarta-feira") : "";
    }
    {
      value.thursday ? weekDays.push("quinta-feira") : "";
    }
    {
      value.friday ? weekDays.push("sexta-feira") : "";
    }
    {
      value.saturday ? weekDays.push("sabado") : "";
    }
    {
      value.sunday ? weekDays.push("domingo") : "";
    }

    const verifyDay = weekDays.includes(weekDay);
    console.log(weekDays)
    console.log(weekDay)

    // const verifyWorkHour =;
    const verifyWorkHour =
    value.startWorkHour <= horaAtual && value.endWorkHour >= horaAtual;
    const verifyWorkHour1 =
    value.startWorkHour1 <= horaAtual && value.endWorkHour1 >= horaAtual;
    console.log(horaAtual)
    console.log(verifyWorkHour)
    console.log(verifyWorkHour1)

    const verifyWeekendWorkHour =
      value.startWorkHourWeekend <= horaAtual &&
      value.endWorkHourWeekend >= horaAtual;
    // Verifica se é a conexão padrão , se esta definido um expediente e se é o dia na semana definido para usar expediente
    if (value.isDefault === true && value.defineWorkHours) {
      if (verifyDay) {
        // verifica se é fim de semana e esta dentro do expediente definido
        if (
          (weekDay === "Saturday" || weekDay === "Sunday") &&
          verifyWeekendWorkHour
        ) {
          // se for dia de semana e esta dentro do expediente definido
          // console.log("dentro do fim de semana e expediente definidos")
          resulta = "true";
        } else if (
          weekDay !== "Saturday" &&
          weekDay !== "Sunday" && (
          verifyWorkHour ||
          verifyWorkHour1
          )
        ) {
         // console.log("dentro do dia da semana e expediente definidos");
          resulta = "true";
        } else {
        //  console.log("fora do expediente da semana e do fim de semana");
          resulta = "false";
        }
      } else {
        // console.log("Dia sem expediente 1");
        resulta = "false";
      }
    } else {  
      // Não definiu expediente, deixa o sistema 24h funcionando completo com direcionamentos a atendentes
      // console.log("Horario Expediente Desativado");
      resulta = "true";
    }
  });
  if (resulta === "true") {
    return true;
  }
  return false;
};

export default hourExpedient;
