# Pipeline Vetrina

Stato di ogni contatto/lead, aggiornato da Matteo (direttore operativo) e dal team.

| Attività | Canale | Contattato il | Ultimo follow-up | Stato | Pacchetto proposto | Note |
|---|---|---|---|---|---|---|
| Hair Club (Trezzo sull'Adda) | Email (test) | - | - | test interno, non un vero lead | Base/Standard/Premium | Usato per validare email ed email-tier prima del lancio reale |

## Legenda stato
- `da contattare` — lead trovato da Marco, non ancora scritto
- `contattato` — prima email/DM inviato
- `follow-up 1` / `follow-up 2` — promemoria inviati (giorno 4-5 / giorno 10-12)
- `in trattativa` — il cliente ha risposto con interesse
- `chiuso positivo` — cliente ha pagato, sito consegnato
- `chiuso negativo` — non interessato o nessuna risposta dopo 3 tentativi

## Disposizioni operative assegnate (Matteo, 20/09/2026)

Stato reale: pipeline ferma a zero (0 lead, 0 contatti, 0 incassi). Nessuna azione produttiva verso un cliente vero è ancora partita, nonostante homepage v2 pubblicata e regole legali di Chiara integrate nei prompt di Marco/Luca. Stefano ha chiesto di sbloccare subito. Ordine di priorità:

| # | Assegnato a | Azione | Scadenza | Stato |
|---|---|---|---|---|
| 1 | Stefano | Confermare per iscritto lo sblocco: anticipare la milestone "Avvio outreach reale" da 05/10/2026 a subito, dato che chiede di partire ora. Senza questa conferma esplicita resta valida la decisione precedente di non contattare nessuno. | oggi 20/09 | da confermare |
| 2 | Marco | Consegnare i primi 10 lead reali (non test): nome attività, comune, email/telefono di contatto. Vanno inseriti nella tabella pipeline in cima a questo file. | domani 21/09 (fine giornata) | assegnato |
| 3 | Andrea | Sistemare i pulsanti "mailto" in homepage: aggiungere fallback visibile (indirizzo email in chiaro, copiabile con un click) per chi non ha un client email predefinito sul dispositivo. | oggi 20/09 | assegnato |
| 4 | Chiara | Dare via libera scritto (go/no-go) sui template email che Giulia userà per il primo invio reale, verificando che rispettino le regole già integrate nei prompt di Marco/Luca. | oggi 20/09 | assegnato |
| 5 | Giulia | Appena Marco consegna i lead (azione #2) e Chiara dà il via libera (azione #4), inviare le prime email/DM reali ai primi contatti e aggiornare questo file con data di invio e stato "contattato". | domani 21/09, subito dopo #2 e #4 | in attesa dei prerequisiti |

## Metriche correnti
- Lead trovati: 0 (reali)
- Contattati: 0 (reali)
- Chiusi positivi: 0
- Capitale incassato: 0€

## Milestone e date target (piano operativo proposto il 20/09/2026, riprogrammato il 20/09/2026 su decisione di Stefano — da confermare)
Nota: sono target di pianificazione, non dati consuntivi. Vanno aggiornati con le date reali quando gli eventi accadono.

Decisione di Stefano (20/09/2026): nessun contatto reale per ora, l'azienda è ancora in fase di sviluppo interno. Outreach non parte finché non siamo operativi. Tutte le milestone sotto sono state spostate di 7 giorni rispetto al piano originale, mantenendo invariati gli intervalli relativi tra loro.

| Milestone | Target | Criterio di completamento |
|---|---|---|
| Avvio outreach reale | entro 05/10/2026 | Marco consegna 30-40 lead reali; Giulia invia i primi contatti |
| Vetrina "operativa" | entro 12/10/2026 | Primi 30+ lead reali contattati (non test) |
| Follow-up 1 completato | entro 15/10/2026 | Follow-up giorno 4-5 inviato su tutti i contatti del primo batch |
| Follow-up 2 completato | entro 21/10/2026 | Follow-up giorno 10-12 inviato su tutti i contatti del primo batch |
| Primo incasso reale | stima 22/10-01/11/2026 | Primo pagamento cliente ricevuto, sito in produzione/consegnato |
| Obiettivo 3 mesi (fine 12/2026) | 8-10 clienti chiusi | ~1.000-1.800€ incassati cumulati (pacchetti una tantum) |
| Obiettivo 6 mesi (fine 03/2027) | 20-25 clienti chiusi cumulati | ~3.000-4.500€ incassati cumulati; primo ciclo di referral attivo |

Ipotesi usate: tasso di risposta cold outreach B2B locale 5-15% su 30-40 contatti → 2-6 risposte, 1-3 trattative, 0-2 chiusure nel primo batch.

## Checklist "pronti per partire" (Matteo, 20/09/2026)

Contesto: Stefano ha bloccato l'outreach dicendo che "la qualità è di bassa leva" e che si parte solo a "livello ottimo". Questo criterio, com'è formulato, non è verificabile né ha una fine. Di seguito la traduzione in voci concrete, verificate una per una sullo stato reale del codice (index.html, i tre tier demo, sitemap.txt/robots.txt). "Ottimo" resta un giudizio finale di Stefano: qui sotto c'è solo l'elenco di cosa risulta fatto e cosa no, con azione e scadenza per ogni voce non a posto.

### A. Sito Vetrina (index.html)
| # | Voce | Stato reale | Azione | Assegnato a | Scadenza |
|---|---|---|---|---|---|
| A1 | Privacy/cookie policy | MANCANTE — index.html non ha alcun link privacy, nessun cookie banner, pur caricando Google Fonts (trasferimento IP a terzi) | Scrivere testo minimo pagina `/privacy` (titolare del trattamento, dati raccolti via mailto, uso Google Fonts) e linkarla in footer | Chiara (testo) + Luca (pubblicazione/link) | 22/09 |
| A2 | Identità legale dichiarata | MANCANTE — nessuna ragione sociale, P.IVA o forma giuridica indicata; non è chiaro se dichiararsi "azienda" sia corretto | Paolo conferma per iscritto lo stato legale reale del progetto (esiste P.IVA sì/no); in base alla risposta, Davide adatta il testo (es. "progetto" invece di "azienda" se non c'è ancora struttura formale) | Paolo → Davide | 22/09 |
| A3 | Cartelle hairclub/, hairclub-standard/, hairclub-premium/ ancora presenti sul repo con dati di un'azienda reale (nome, indirizzo, telefono, Instagram di Hair Club/Trezzo sull'Adda), non linkate dall'homepage ma raggiungibili via URL diretto e ancora elencate in sitemap.xml | Rischio concreto, non teorico | Eliminare le tre cartelle hairclub* dal repository | Luca | 21/09 |
| A4 | sitemap.xml disallineata: contiene solo i vecchi URL hairclub, non gli URL reali attuali (nefasto-parrucchieri e i suoi tier, home) | Da correggere insieme alla rimozione di A3 | Riscrivere sitemap.xml con gli URL correnti (home + pagine indicizzabili secondo la policy noindex già decisa da Valentina) | Luca | 21/09 |

### B. Demo mostrabili (Nefasto Parrucchieri Base/Standard/Premium)
| # | Voce | Stato reale | Azione | Assegnato a | Scadenza |
|---|---|---|---|---|---|
| B1 | Disclaimer "esempio di fantasia" | A POSTO — presente su tutti e 3 i tier e nella pagina /esempi/ | nessuna azione | — | — |
| B2 | noindex sulle pagine demo | A POSTO — tutti i 6 file hanno `meta robots noindex` | nessuna azione | — | — |
| B3 | Cookie banner sulla demo | A POSTO su Nefasto Parrucchieri (banner + toggle informativa) | nessuna azione | — | — |
| B4 | Contenuto blog demo ("piega-che-dura") | Non ancora verificato da un occhio esterno se il testo è pubblicabile a un cliente vero o resta solo dimostrativo interno | Elena verifica il testo dell'articolo e conferma se è mostrabile o va segnato più esplicitamente come placeholder | Elena | 23/09 |

### C. Materiali di outreach (email di Giulia)
| # | Voce | Stato reale | Azione | Assegnato a | Scadenza |
|---|---|---|---|---|---|
| C1 | Template email primo contatto | NON ESISTE ANCORA nessun file/testo di template — Giulia ha solo un piano, zero bozze scritte | Scrivere almeno 1 template di prima email reale, da sottoporre a Chiara per il go/no-go già richiesto in azione #4 sopra | Giulia | 21/09 |
| C2 | Opt-out esplicito nel template | Da verificare quando C1 esiste | Controllare che ogni bozza includa una frase di opt-out chiaro ("non mi interessa, non scrivetemi più") | Giulia (scrittura) + Chiara (verifica) | 22/09 |

### D. Coerenza di brand
| # | Voce | Stato reale | Azione | Assegnato a | Scadenza |
|---|---|---|---|---|---|
| D1 | Palette/font coerenti tra homepage e demo | Homepage usa Fraunces/IBM Plex Sans su blu/ink scuro; le demo Nefasto Parrucchieri usano Bodoni Moda/Manrope su beige/oro — stili volutamente diversi (uno è brand Vetrina, l'altro è il sito del cliente-esempio), non è un errore ma va confermato che sia intenzionale | Sofia conferma per iscritto che la differenza di stile tra "sito Vetrina" e "sito del cliente demo" è voluta e documentata, non un'incoerenza | Sofia | 23/09 |
| D2 | Fallback mailto senza client email (azione #3 già assegnata il 20/09) | ASSEGNATA, non ancora confermata completata | Confermare completamento o segnalare blocco | Andrea | 20/09 (già in scadenza) |

## Stima tempi
Se tutte le voci sopra (A1-D2, 10 azioni) vengono chiuse rispettando le scadenze indicate, il lavoro tecnico concreto richiede realisticamente **3-4 giorni lavorativi** (20-24/09), assumendo nessun nuovo problema scoperto durante l'esecuzione. Questa è una stima sul lavoro necessario per portare il sito e i materiali a uno stato verificabile e senza rischi noti — non è una garanzia che Stefano lo giudicherà "ottimo": quel giudizio resta suo. Il compito di Matteo qui finisce nel rendere la lista concreta e nel verificare, voce per voce, quando ogni azione risulta davvero completata.
