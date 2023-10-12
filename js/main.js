// **TRACCIA**
// **Milestone 1**
// ● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
// dall’interlocutore (bianco) assegnando due classi CSS diverse ✔
// ● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
// nome e immagine di ogni contatto ✔
// **Milestone 2**
// ● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
// messaggi relativi al contatto attivo all’interno del pannello della conversazione ✔
// ● Click sul contatto mostra la conversazione del contatto cliccato ✔
// **Milestone 3**
// ● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
// “enter” il testo viene aggiunto al thread sopra, come messaggio verde ✔
// ● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
// un “ok” come risposta, che apparirà dopo 1 secondo. ✔
// **Milestone 4**
// ● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
// contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
// “mar” rimangono solo Marco e Martina) ✔
// **Milestone 5 - opzionale**
// ● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
// permette di cancellare il messaggio selezionato
// ● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

// VUE
const { createApp } = Vue;

createApp({
  data() {
    return {
      /* VARIABLES API CHATGPT*/
      API_KEY: "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",
      API_URL: "https://api.openai.com/v1/chat/completions",
      MODEL: "gpt-3.5-turbo",

      // ARRAY OGGETTI
      contacts: [
        {
          name: "Homer",
          avatar: "_homer-simpson",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Hai portato a spasso il piccolo aiutante di babbo natale??",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              text: "Sono da Boe!",
              status: "received",
            },
          ],
        },
        {
          name: "Gandalf",
          avatar: "_gandalf",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              text: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              text: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              text: "Devo studiare per l'esame di magia nera",
              status: "sent",
            },
          ],
        },
        {
          name: "Batman",
          avatar: "_batman",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              text: "Robin come stai??",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              text: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              text: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Barbie",
          avatar: "_barbie",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Hermione",
          avatar: "_hermione-granger",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Ricordati di chiamare Harry",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Va bene, stasera lo sento",
              status: "received",
            },
          ],
        },
        {
          name: "Shrek",
          avatar: "_shrek",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Ciao Shrek, hai novità di ciuchino?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              text: "Fammi sapere appena sai qualcosa",
              status: "sent",
            },
          ],
        },
        {
          name: "Harley",
          avatar: "_harley-quinn",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Fai gli auguri a Joker che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Grazie per avermelo ricordato, gli scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Ash",
          avatar: "_ash-ketchum",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "No, l'ho già mangiata ieri, ordiniamo sushi di magikarp!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              text: "OK!!",
              status: "received",
            },
          ],
        },
      ],

      clickedContact: 0,

      myNewText: {
        date: this.currentDate(),
        text: "",
        status: "sent",
      },

      mySearch: "",
    };
  },

  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${(current.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${current.getFullYear()} ${current
        .getHours()
        .toString()
        .padStart(2, "0")}:${current
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${current.getSeconds().toString().padStart(2, "0")}`;
      return date;
    },

    async getTextFromVip() {
      // Calcola l'indice dell'ultimo messaggio e ottengo il testo
      let lastMessageIndex =
        this.contacts[this.clickedContact].messages.length - 1;
      let lastMessageText =
        this.contacts[this.clickedContact].messages[lastMessageIndex].text;

      const temperature = 0.7;
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          model: this.MODEL,
          messages: [
            {
              role: "user",
              content: `Sei ${
                this.contacts[this.clickedContact].avatar
              } e rispondi al mio messaggio ${lastMessageText} come se fossimo in una chat in un massimo di 15 parole senza mai uscire dal tuo personaggio`,
            },
          ],
          temperature: temperature,
        }),
      });
      const data = await response.json();
      console.log(data);
      const message = data.choices[0].message.content;
      return message;
    },

    filterList() {
      // "Rifaccio" il ciclo sui contatti
      for (const contact of this.contacts) {
        // Comparo le lettere del nome con quello che scrivo io
        if (!contact.name.toLowerCase().includes(this.mySearch.toLowerCase())) {
          // cambio il valore di visible in base alla ricerca(v-show in HTML)
          contact.visible = false;
        } else {
          contact.visible = true;
        }
      }
    },

    activeImage(index) {
      this.clickedContact = index;
    },

    addText() {
      this.contacts[this.clickedContact].messages.push({
        date: this.myNewText.date,
        text: this.myNewText.text,
        status: "sent",
      });

      this.myNewText.text = "";

      setTimeout(() => {
        this.getTextFromVip()
          .then((message) => {
            this.contacts[this.clickedContact].messages.push({
              date: this.currentDate(),
              text: message,
              status: "received",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }, 3000);
    },
  },
}).mount("#root");
// ✔
