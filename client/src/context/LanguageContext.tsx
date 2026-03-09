import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "lv" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  lv: {
    // Navigation
    "nav.home": "Sākums",
    "nav.teachers": "Skolotājiem",
    "nav.women": "Sievietēm",
    "nav.couples": "Pāriem",
    "nav.wedding": "Kāzu deja",
    "nav.blog": "Blogs",
    "nav.contact": "Kontakti",
    "nav.admin": "Administrācija",
    
    // Home page
    "home.hero.title": "Kustība. Savienojums. Izpausme.",
    "home.hero.subtitle": "Atklājiet prieku savā ķermenī caur apzinātu dejas praksi",
    "home.hero.cta": "Sākt Ceļojumu",
    
    "home.about.title": "Par Happy Dance Studio",
    "home.about.text1": "Mēs ticam, ka deja ir vairāk nekā soļi — tā ir valoda, kas ļauj mums savienoties ar sevi un citiem.",
    "home.about.text2": "Mūsu studija piedāvā drošu, sirsnīgu telpu, kur katrs var atklāt savu ķermeni, izpausties un atrast prieku kustībā.",
    
    "home.paths.title": "Atrodiet Savu Ceļu",
    "home.paths.subtitle": "Mēs piedāvājam nodarbības un resursus, kas pielāgoti jūsu vajadzībām",
    "home.paths.teachers.title": "Skolotājiem",
    "home.paths.teachers.label": "RESURSI UN RĪKI",
    "home.paths.teachers.desc": "Digitālie resursi pārdomātai, iedvesmojošai un radošai mācīšanai.",
    "home.paths.women.title": "Sievietēm",
    "home.paths.women.desc": "Sviniet savu ķermeni un atklājiet sievišķo izpausmi",
    "home.paths.couples.title": "Pāriem",
    "home.paths.couples.desc": "Savienojieties caur deju un stipriniet attiecības",
    "home.paths.explore": "Izpētīt",
    
    "home.testimonials.title": "Ko Saka Mūsu Dalībnieki",
    
    "home.contact.title": "Sazināties",
    "home.contact.subtitle": "Mums būtu prieks dzirdēt no jums",
    "home.contact.name": "Vārds",
    "home.contact.email": "E-pasts",
    "home.contact.subject": "Temats",
    "home.contact.message": "Ziņojums",
    "home.contact.send": "Nosūtīt Ziņojumu",
    "home.contact.sending": "Sūta...",
    "home.contact.success": "Ziņojums nosūtīts!",
    "home.contact.successDesc": "Mēs sazināsimies ar jums drīzumā.",
    "home.contact.error": "Kļūda nosūtot",
    "home.contact.errorDesc": "Lūdzu, mēģiniet vēlreiz vēlāk.",
    
    // Teachers page
    "teachers.hero.title": "Mācīt ar izpratni. Vadīt ar rūpību.",
    "teachers.hero.subtitle": "Psiholoģijā balstīti rīki deju pedagogiem, kuri vēlas skolot pārliecinātus, stiprus un iedvesmotus audzēkņus.",
    "teachers.hero.quote": "\"Your teaching holds quiet power. Let's make it intentional.\"",
    
    "teachers.intro.text1": "Šie rīki ir radīti skolotājam, kurš… deju redz un izjūt kā daudz dziļāku procesu nekā mākslinieciska un sportiska kustība.",
    "teachers.intro.text2": "…saprot, ka katra nodarbība ir iespēja veicināt kopējo skolēna izaugsmi - veidot pārliecību, atjaunot klātbūtnes izjūtu, padziļināt degsmi, stiprināt raksturu savos audzēkņos.",
    "teachers.intro.for": "…vēlas:",
    "teachers.intro.item1": "izmantot deju kā ceļu uz veselumu un prieku",
    "teachers.intro.item2": "plānot nodarbības ar dziļāku un tālejošāku nodomu",
    "teachers.intro.item3": "veicināt veselīgu pārliecību savos skolniekos ikdienas gaitās",
    "teachers.intro.item4": "izmantot psiholoģisko izpratni praktiskajā darbā",
    "teachers.intro.item5": "ieviest nodarbībās pētniecībā balstītus vingrinājumus",
    
    "teachers.book.title": "The Mindful Dance Teacher - grāmata",
    "teachers.book.text": "The Mindful Dance Teacher piedāvā psiholoģijā balstītus rīkus, kas palīdz audzināt pārliecinātus, fokusētus un emocionāli izturīgus dejotājus. Balstīta pētniecībā un reālās pieredzē, tā palīdz pedagogiem attīstīt audzēkņu potenciālu ar skaidrību, rūpību un ilgtermiņa pieeju.",
    "teachers.book.feature1": "Psiholoģijā balstītas nodaļas par fokusu, pārliecību, domāšanas veidu un motivāciju",
    "teachers.book.feature2": "Skolotāju refleksijas un praktiski piemēri",
    "teachers.book.feature3": "Rīki, kurus var izmantot jau nākamajā nodarbībā",
    "teachers.book.feature4": "Cheat sheeti, plānotāji, darba lapas un praktiski vingrinājumi",
    "teachers.book.feature5": "Pieejama drukātā un PDF formātā",
    "teachers.book.cta": "Vairāk par grāmatu",
    "teachers.book.explore": "Apskatīt citus resursus",
    
    "teachers.tools.title": "Praktiskie mācību rīki",
    "teachers.tools.text": "Šeit atradīsi psiholoģijā balstītu materiālu klāsts, kas palīdz radīt skaidras, strukturētas un jēgpilnas deju nodarbības:",
    "teachers.tools.item1": "nodarbību plānotāji",
    "teachers.tools.item2": "refleksijas uzdevumi",
    "teachers.tools.item3": "skolēnu novērošanas un progresa lapas",
    "teachers.tools.item4": "interaktīvi plakāti, ko aizpildīt kopā ar skolēniem - pārliecībai, fokusam un grupas saliedētībai",
    "teachers.tools.item5": "īsi, pētniecībā balstīti vingrinājumi emocionālajai un mentālajai labbūtībai",
    "teachers.tools.subtext": "Rīki, kas palīdz veidot nodarbībās apzinātāk, skaidrāk un efektīgāk.",
    "teachers.tools.cta": "Resursi",
    
    "teachers.journal.title": "Blogs",
    "teachers.journal.text": "Īsas, pārdomātas refleksijas par dejas mācīšanas psiholoģisko pusi - rakstītas skolotājiem, kuri novērtē dziļumu un jēgpilnu darbu studijā, un kuriem ir svarīgi, ka šīs tēmas tiek pārspriestas un izprastas.",
    "teachers.journal.topics": "Tēmas par fokusu, pārliecību, motivāciju, emocionālo harmoniju, grupas enerģiju un dejotāju iekšējo pasauli.",
    "teachers.journal.style": "Skaidri. Praktiski. Cilvēcīgi.",
    "teachers.journal.cta": "Blogs",
    
    "teachers.why.title": "Kāpēc radīju šos rīkus",
    "teachers.why.text1": "Gadu gaitā esmu redzējusi, kā deja veicina pārliecību, fokusu, harmoniju un iekšējo spēku - un cik daudz tiek zaudēts, ja mācīšanā pietrūkst rūpības un izpratnes.",
    "teachers.why.text2": "Kļuva skaidrs: deja ir daudz spēcīgāka, nekā viegli skatoties var pamanīt. Tā savieno ķermeni, prātu un kaut ko dziļāku: identitāti, jēgu un saikni.",
    "teachers.why.text3": "Šī grāmata un rīki veidojās no jautājuma, kas man ilgstoši nodarbināja: Kas palīdz dejotājam kļūt veselākam, priecīgākam un dzīvākam?",
    "teachers.why.text4": "Un tikpat svarīgi: Kas palīdz skolotājam šo procesu vadīt ar lielāku skaidrību un rūpību?",
    "teachers.why.text5": "The Mindful Dance Teacher ir mana atbilde - refleksiju un praktisku vingrinājumu kopums, kas veicina izaugsmi, klātbūtni un jēgpilnu darbu ar dejotājiem.",
    "teachers.why.quote": "\"Insightful teaching turns motion into magic.\"",
    "teachers.why.bookCta": "Vairāk par grāmatu",
    "teachers.why.resourcesCta": "Resursi skolotājiem",
    "teachers.why.blogCta": "Blogs",
    "teachers.why.freeCta": "Lejupielādēt bezmaksas materiālu ar idejām deju nodarbību ievadam",
    
    "teachers.resources.title": "Mācību Resursi",
    "teachers.resources.subtitle": "Pārdomāti izstrādāti rīki apzinātai, pārveidojošai mācīšanai.",
    "teachers.addToCart": "Pievienot Grozam",
    "teachers.getFree": "Saņemt Bez Maksas",
    
    // Women page  
    "women.hero.title": "Ieelpo dzīvi caur deju.",
    "women.hero.subtitle": "Deju nodarbības sievietēm",
    "women.hero.tagline": "Tehnika, izpausme, identitāte. Iespēja izdejot savu stāstu spēkā un gaismā.",
    "women.hero.quote": "Deja ir ķermeņa dziesma.",
    
    "women.intro.text1": "Šajās nodarbībās savijas džeza, laikmetīgās dejas, baleta pamatu un latīņu deju elementi - kustību vingrinājumi, kombinācijas un horeogrāfijas, kas palīdz sievietēm attīstīt grāciju un emocionālo dziļumu, kas izteikts caur skaidru un izjustu kustību.",
    "women.intro.text2": "Katra nodarbība ietver fizisku un tehnisku treniņu, kas stiprina stāju, dejas muskuļus, attīsta muzikalitāti un veido stabilas dejas prasmes. Tad dodamies horeogrāfijā - dejas stāstos, kas aicina izpaust emocijas, piedzīvojumus un pašas būtību.",
    "women.intro.text3": "Šad tad nodarbībās ietverti arī nelieli vingrinājumi no deju psiholoģijas - lai palīdzētu atbrīvoties, ieelpot plašāk un kustēties brīvāk un patiesāk. Tie neaizstāj dejošanu, bet padara to dziļāku, godīgāku un sazemētāku.",
    "women.intro.text4": "Nodarbību atmosfēra ir silta, fokusēta un radoša - tā kļūst par vietu, kur sievietes var augt gan tehniski, gan iekšēji, atrodot sevī vairāk gaismas, prieka, klātbūtnes trausluma un spēka.",
    
    "women.experience.title": "Ko Tu piedzīvosi",
    "women.experience.item1": "Kustību valodu, kurā savijas džeza un laikmetīgās dejas, baleta pamati, kā arī ekspresīvs latino piesitiens",
    "women.experience.item2": "Tehnisko pamatu stiprināšanu - stāja, koordinācija, muzikalitāte",
    "women.experience.item3": "Horeogrāfijas, kas ļauj izdejot savu stāstu un emocijas",
    "women.experience.item4": "Atbalstošus vingrinājumus, kas mazina saspringumu un padara kustību ērtāku, vieglāku un dabiskāku",
    "women.experience.item5": "Atbalstošu, neformālu un radošu vidi",
    "women.experience.item6": "Kustības, kas stiprina pašpārliecinātību un sievišķību",
    
    "women.forWhom.title": "Kam šī programma ir domāta",
    "women.forWhom.intro": "Sievietēm, kuras vēlas dejā gan skaistumu, gan saturu.",
    "women.forWhom.text1": "Tām, kuras vēlas strādāt ar tehniku, kustību kvalitāti un grāciju, bet vienlaikus meklē vietu, kur izteikt emocijas, izdejot savus stāstus un justies radoši.",
    "women.forWhom.text2": "Šī ir telpa sievietēm, kurām deja nozīmē vairāk nekā vienkāršu fitnesu - tā ir iespēja attīstīt sevi fiziski, emocionāli un mākslinieciski.",
    "women.forWhom.ageTitle": "Vecums nav ierobežojums.",
    "women.forWhom.text3": "Grupā kopā piedalās gan jaunietes, gan mammas, gan vecmammas - sievietes, kuras novērtē kustības dziļumu un ir gatavas aktīvi piedalīties. Katras pieredze nodarbībām piešķir īpašu vērtību.",
    
    "women.cta.title": "Ienāc studijā. Izdejo savu stāstu. Sajūti, kā atdzīvojies.",
    "women.cta.text": "Stāsti, ko izdejojušas mūsu sievietes - horeogrāfiju video un nelielas ieskates nodarbībās.",
    "women.quote": "\"Kungs, mans Dievs, Tu manu vaimanas pārvērti dejā, Tu noņēmi manas sēru drēbes un apjozi mani ar prieku.\" (Ps. 30:11)",
    "women.quote.text": "\"Kungs, mans Dievs, Tu pārvērti manu raudāšanu dejā; Tu noņēmi manu sēru tērpu un apjozi mani ar prieku.\"",
    "women.quote.source": "Psalms 30:11",
    
    "women.join.title": "Pievienojies grupai",
    "women.join.intro": "Nākamā grupa veidojas un gaida īsto brīdi, lai sāktu nodarbības.",
    "women.join.text": "Ja Tev ir vēlme kustēties, izpausties un atgūt spēku sevī caur deju, vari jau tagad pieteikties gaidīšanas sarakstā.",
    "women.join.location": "Vieta: Ģertrūdes iela 8",
    "women.join.duration": "Nodarbības ilgums: 60 min",
    "women.join.price": "Cena: €50 / mēnesī (4 nodarbības) • €15 par vienreizēju nodarbību",
    "women.join.language": "Valoda: pārsvarā latviski, angļu valoda pieejama pēc vajadzības",
    "women.join.limited": "Vietu skaits ir ierobežots. Piesakies gaidīšanas sarakstā, un, atverot reģistrāciju, vispirms ziņošu tieši Tev.",
    "women.join.cta": "Pieteikties gaidīšanas sarakstā",
    "women.join.noPayment": "(maksājums vēl nav nepieciešams)",
    
    "women.private.title": "Privātstundas",
    "women.private.text": "Ja vēlies individuālu uzmanību - tehnikā, radošajā kustībā vai horeogrāfijā — vari pieteikt privāto nodarbību.",
    "women.private.price": "Privātstunda: €40 / 60 min",
    "women.private.format": "Formāts: klātienē vai tiešsaistē",
    "women.private.cta": "Pieteikt privāto stundu",
    
    "women.friends.title": "Dejas kopā ar draudzenēm",
    "women.friends.text": "Piemērota svētkiem, sieviešu vakaram, vai vienkārši iknedēļas vēlmei izdejoties kopā sev piemērotā laikā.",
    "women.friends.group": "Grupa: 4–10 sievietes",
    "women.friends.price": "Cena: €60–100 par nodarbību (no grupas)",
    "women.friends.format": "Formāts: klātienē vai tiešsaistē",
    "women.friends.duration": "Garums: 60 min",
    "women.friends.cta": "Pieteikt draudzeņu grupu",
    
    "women.videos.title": "Stāsti, ko izdejojušas mūsu sievietes.",
    
    // Couples page
    "couples.hero.title": "Ritmā mēs satiekamies.",
    "couples.hero.subtitle": "Dejas pāriem",
    "couples.hero.tagline": "Kur uzplaukst kopība, uzticība un saskaņa.",
    
    "couples.intro.text1": "Pāru dejas ir vairāk nekā deju soļu izpildīšana. Tā ir kopīga prakse - klausīšanās, vadīšana, sekošana un ritma atrašana kopā. Tieši šīs prasmes stiprina attiecības arī ikdienā.",
    "couples.intro.text2": "Happy Dance Studio pāru nodarbībās mēs strādājam ar skaistākajiem pāru deju stiliem — valša graciozo plūdumu, rumbas tuvību un maigumu, ča-ča-čā rotaļīgo precizitāti, sambas pulsējošo enerģiju, džaiva dzīvo ritmu, Lindy Hop rotaļīgumu un brīvību, kā arī džeza dejas ekspresiju.",
    "couples.intro.text3": "Katrs pāris var izvēlēties savu virzienu - klasisku balles deju, košu latīņamerikas ritmu, džeza dinamiku vai vienkārši praktiskus deju soļus un partneru vingrinājumus, kas noderēs ballītēs un ikdienas situācijās. Jūs mācīsieties kustēties kā komanda, elpot kopā un izbaudīt procesu.",
    "couples.intro.text4": "Neatkarīgi no deju pieredzes - atmosfēra ir silta, atbalstoša un pielāgota komandas darbam: no vienkāršiem kustību uzdevumiem līdz pārdomātām, pārliecinošām horeogrāfijām.",
    
    "couples.learn.title": "Ko jūs apgūsiet",
    "couples.learn.item1": "Vadīšanu un sekošanu tā, lai veidotos sapratne un sadarbība",
    "couples.learn.item2": "Kopīgu ritmu un koordinētu kustību",
    "couples.learn.item3": "Emocionālu saskaņotību, izmantojot vienkāršus pāru deju vingrinājumus",
    "couples.learn.item4": "Kā \"klausīties\" partnerī caur kustību",
    "couples.learn.item5": "Kustību, kas veicina uzticību, vieglumu un tuvību",
    "couples.learn.item6": "Elegantas horeogrāfijas, iedvesmotas no balles dejām, sociālajām dejām, džeza un improvizācijas",
    
    "couples.forWhom.title": "Kam šis ir domāts",
    "couples.forWhom.text": "Pāriem, kuri vēlas dejot kopā - uzlabot prasmes, veidot labāku saskaņu un apgūt skaistas, pārim piemērotas horeogrāfijas.",
    
    "couples.styles.title": "Kurš deju stils mums der vislabāk?",
    "couples.styles.intro": "Nav viena pareizā ceļa.",
    "couples.styles.rumba": "Dažus pārus pievelk rumbas maigais, romantiskais plūdums,",
    "couples.styles.waltz": "citiem patīk valša griezieni un lidojums,",
    "couples.styles.lindy": "vēl citi izvēlas rotaļīgo un jautro lindihopu.",
    "couples.styles.text1": "Daudzi sāk ar vispārīgiem vingrinājumiem un soļiem, kas attīsta deju kontaktu, un ko var parocīgi lietot, vienkārši dejojot vienam ar otru.",
    "couples.styles.text2": "Galvenais mērķis ir izbaudīt deju kopā un caur šīm dejām un treniņu stiprināt savstarpējo kontaktu un saskaņu.",
    
    "couples.booking.title": "Pievienojies nodarbībām",
    "couples.booking.subtitle": "Formāts: klātienē vai tiešsaistē",
    "couples.booking.location": "Vieta: Ģertrūdes iela 8",
    "couples.booking.language": "Valoda: latviešu vai angļu",
    "couples.booking.arrange": "Vienojamies par laiku, kas der jums abiem.",
    "couples.booking.privatePrice": "Privātstunda pārim: €50 / 60 min",
    "couples.booking.packages": "Nodarbību komplekti (apmaksa veicama sākumā):",
    "couples.booking.package4": "4 privātstundas: €180",
    "couples.booking.package8": "8 privātstundas: €320",
    "couples.booking.packageNote": "(Lieliski piemērots pāriem, kuri vēlas stabilu progresu vai sagatavot horeogrāfētu deju.)",
    "couples.booking.noSlots": "Šobrīd nav pieejamu nodarbību.",
    "couples.booking.checkBack": "Lūdzu, pārbaudiet vēlāk vai sazinieties ar mums, lai organizētu privātu nodarbību.",
    "couples.booking.noTimes": "Nav pieejamu laiku šajā datumā",
    "couples.booking.selectDate": "Izvēlieties datumu, lai redzētu pieejamos laikus",
    "couples.booking.complete": "Pabeigt Rezervāciju",
    "couples.booking.yourName": "Jūsu Vārds",
    "couples.booking.email": "E-pasts",
    "couples.booking.proceed": "Turpināt uz Maksājumu",
    "couples.booking.processing": "Apstrādā...",
    "couples.booking.redirect": "Jūs tiksiet novirzīts uz mūsu drošo maksājumu lapu",
    "couples.booking.min": "min",
    "couples.booking.failed": "Rezervācija neizdevās",
    "couples.booking.tryAgain": "Lūdzu, mēģiniet vēlreiz",
    "couples.booking.cta": "Pieteikt privāto nodarbību",
    
    "couples.blog.title": "Kāpēc dejas stiprina attiecības",
    "couples.blog.intro": "Vēlies izprast dziļāk?",
    "couples.blog.text": "Te ir viens no maniem rakstiem par to, kā kustība veicina saikni, uzticību un emocionālo saskaņotību starp partneriem:",
    "couples.blog.cta": "Lasīt rakstu: \"In the rhythm we meet\"",
    
    "couples.video.title": "Video galerija iedvesmai",
    "couples.video.rumba": "Rumba pārim — lēna, plūstoša, cieša saikne",
    "couples.video.waltz": "Valsis — rotācija, siltums, komandas darbs",
    "couples.video.exercises": "Vadīti partneru uzdevumi — vienkārši vingrinājumi komunikācijas uzlabošanai",
    
    "couples.wedding.title": "Kāzu deja",
    "couples.wedding.subtitle": "Jūsu pirmā deja",
    "couples.wedding.tagline": "Pārliecināta deja. Dabiska saskaņa.",
    "couples.wedding.text1": "Jūsu pirmā deja kā vīram un sievai nav tikai tradīcija. Tā ir daļa no kāzu stāsta - tieši tik klusa, rotaļīga, izsmalcināta vai iespaidīga, cik vēlaties.",
    "couples.wedding.text2": "Tā ir jūsu izvēle. Jūsu ritms. Jūsu brīdis. Un Jūsu stāsts. Un tas būs brīnišķīgi un neaizmirstami.",
    "couples.wedding.text3": "Taču īstā maģija sākas tieši sagatavošanās laikā. Katrs treniņš kļūst par mazu kopīgu piedzīvojumu: soļi, kas sākumā šķiet jauni, pamazām iedzīvojas; kustība kļūst vieglāka; partnera roka - drošāka.",
    "couples.wedding.text4": "Daudzi pāri atzīst: \"Mēs negaidījām, ka šis būs tik īpašs laiks divatā.\"",
    
    "couples.wedding.create.title": "Ko mēs veidojam kopā",
    "couples.wedding.create.item1": "Deju, kas izskatās skaista un dabiska tieši jums",
    "couples.wedding.create.item2": "Horeogrāfiju, kas ir eleganta, paveicama un brīvi plūstoša",
    "couples.wedding.create.item3": "Saskaņu un komandas sajūtu, kas parādās arī ikdienā",
    "couples.wedding.create.item4": "Pārliecību uz deju grīdas, pat ja iepriekš neesat dejojuši",
    "couples.wedding.create.item5": "Brīdi, ko ar prieku atcerēsieties vēl ilgi pēc kāzu dienas",
    
    "couples.wedding.why.title": "Ko pāri visvairāk novērtē nodarbībās",
    "couples.wedding.why.text1": "Daudzi pāri sāk ar nelielu satraukumu - īpaši vīrieši, kas raizējas par \"nepareizu soli\" vai neveiklību. Tas ir pilnīgi normāli. Nodarbības ir veidotas tā, lai ar katru reiz Jūs justos arvien drošāk, dabiskāk un pārliecinošāk.",
    "couples.wedding.why.text2": "Jūs apgūstat vienkāršus principus, kas padara kustēšanos kopā dabisku un patīkamu. Soli pa solim izveidojas vieglums un pārliecība, kas bieži pārsteidz: \"Mēs tiešām to varam. Un tas ir tik patīkami!\"",
    "couples.wedding.why.text3": "Treniņi kļūst par vairāk nekā deju soļu apgūšanu - tas kļūst par procesu, kas stiprina saikni, uzticību un klātbūtni vienam ar otru.",
    
    "couples.wedding.how.title": "Kā tas notiek",
    "couples.wedding.how.text1": "Kāzu deja top privātās deju nodarbībās. Kopā izvēlamies dziesmu, stilu, atmosfēru un sarežģītības līmeni.",
    "couples.wedding.how.location": "Vieta: Ģertrūdes iela 8",
    "couples.wedding.how.price": "Privātstunda pārim: €50 / 60 min",
    "couples.wedding.how.packages": "Nodarbību komplekti (apmaksa veicama sākumā):",
    "couples.wedding.how.package4": "4 privātstundas: €180",
    "couples.wedding.how.package8": "8 privātstundas: €320",
    "couples.wedding.how.packageNote": "(Lieliski piemērots pāriem, kuri vēlas stabilu progresu vai sagatavot horeogrāfētu deju.)",
    "couples.wedding.how.sessions": "Lielākā daļa pāru savu deju sagatavo 4–8 nodarbībās, atkarībā no dziesmas, iepriekšējās deju pieredzes un vēlamās horeogrāfijas.",
    "couples.wedding.how.continue": "Daudzi turpina arī ilgāk — jo izjūt prieku un redz progresu.",
    "couples.wedding.how.language": "Nodarbības pieejamas latviski vai angliski, klātienē vai daļēji tiešsaistē.",
    
    "couples.wedding.start.title": "Sākam veidot Jūsu deju",
    "couples.wedding.start.cta": "Pieteikt privāto kāzu dejas nodarbību",
    "couples.wedding.start.email": "Uzdot jautājumu e-pastā",
    
    "couples.wedding.article.title": "Kāpēc dejas stiprina attiecības",
    "couples.wedding.article.subtitle": "Vēlies izprast dziļāk?",
    "couples.wedding.article.text": "Te ir viens no maniem rakstiem par to, kā kustība veicina saikni, uzticību un emocionālo saskaņu starp partneriem:",
    "couples.wedding.article.link": "Lasīt rakstu: \"Ritmā mēs satiekamies\"",
    
    "couples.wedding.video.title": "Video galerija iedvesmai",
    "couples.wedding.video.rumba": "Rumba pārim — lēna, plūstoša, cieša saikne",
    "couples.wedding.video.waltz": "Valsis — rotācija, siltums, komandas darbs",
    "couples.wedding.video.exercises": "Vadīti partneru uzdevumi — vienkārši vingrinājumi komunikācijas uzlabošanai",
    
    // Booking success
    "bookingSuccess.title": "Rezervācija Apstiprināta!",
    "bookingSuccess.subtitle": "Paldies par jūsu rezervāciju. Mēs ar nepacietību gaidām tikšanos ar jums.",
    "bookingSuccess.details": "Detaļas nosūtītas uz jūsu e-pastu.",
    "bookingSuccess.home": "Atgriezties Sākumā",
    
    // Shop success
    "shopSuccess.title": "Pirkums Veiksmīgs!",
    "shopSuccess.subtitle": "Paldies par jūsu pirkumu. Jūsu produkti tiks nosūtīti uz jūsu e-pastu.",
    "shopSuccess.home": "Atgriezties Sākumā",
    
    // Cart
    "cart.title": "Grozs",
    "cart.empty": "Jūsu grozs ir tukšs",
    "cart.total": "Kopā",
    "cart.checkout": "Noformēt Pasūtījumu",
    "cart.remove": "Noņemt",
    "cart.enterEmail": "Ievadiet e-pastu, lai turpinātu",
    "cart.emailPlaceholder": "jusu@epasts.lv",
    "cart.proceedPayment": "Turpināt uz Maksājumu",
    
    // Admin
    "admin.title": "Laika Slotu Pārvaldība",
    "admin.addSlot": "Pievienot Laika Slotu",
    "admin.date": "Datums",
    "admin.time": "Laiks",
    "admin.duration": "Ilgums (minūtes)",
    "admin.price": "Cena (EUR)",
    "admin.capacity": "Vietu Skaits",
    "admin.add": "Pievienot",
    "admin.currentSlots": "Pašreizējie Laika Sloti",
    "admin.noSlots": "Vēl nav pievienoti laika sloti.",
    "admin.booked": "rezervēts",
    "admin.delete": "Dzēst",
    
    // Footer
    "footer.rights": "Visas tiesības aizsargātas",
    "footer.quickLinks": "Ātrās Saites",
    "footer.followUs": "Sekojiet Mums",
    
    // Common
    "common.loading": "Ielādē...",
    "common.free": "Bezmaksas",
    
    // Inquiry Form
    "form.title": "Sazinies",
    "form.subtitle": "Nosūtiet mums ziņu un mēs ar Jums sazināsimies drīzumā.",
    "form.name": "Vārds",
    "form.namePlaceholder": "Jūsu vārds",
    "form.email": "E-pasts",
    "form.message": "Ziņa",
    "form.messagePlaceholder": "Kā mēs varam Jums palīdzēt?",
    "form.sending": "Sūta...",
    "form.send": "Sūtīt ziņu",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.teachers": "Teachers",
    "nav.women": "Women",
    "nav.couples": "Couples",
    "nav.wedding": "Wedding Dance",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    
    // Home page
    "home.hero.title": "Movement. Connection. Expression.",
    "home.hero.subtitle": "Discover the joy in your body through mindful dance practice",
    "home.hero.cta": "Start Your Journey",
    
    "home.about.title": "About Happy Dance Studio",
    "home.about.text1": "We believe that dance is more than steps — it's a language that allows us to connect with ourselves and others.",
    "home.about.text2": "Our studio offers a safe, welcoming space where everyone can discover their body, express themselves, and find joy in movement.",
    
    "home.paths.title": "Find Your Path",
    "home.paths.subtitle": "We offer classes and resources tailored to your needs",
    "home.paths.teachers.title": "For Teachers",
    "home.paths.teachers.label": "RESOURCES & TOOLS",
    "home.paths.teachers.desc": "Digital resources for thoughtful, inspiring, and creative teaching.",
    "home.paths.women.title": "For Women",
    "home.paths.women.desc": "Celebrate your body and discover feminine expression",
    "home.paths.couples.title": "For Couples",
    "home.paths.couples.desc": "Connect through dance and strengthen your relationship",
    "home.paths.explore": "Explore",
    
    "home.testimonials.title": "What Our Students Say",
    
    "home.contact.title": "Get In Touch",
    "home.contact.subtitle": "We'd love to hear from you",
    "home.contact.name": "Name",
    "home.contact.email": "Email",
    "home.contact.subject": "Subject",
    "home.contact.message": "Message",
    "home.contact.send": "Send Message",
    "home.contact.sending": "Sending...",
    "home.contact.success": "Message sent!",
    "home.contact.successDesc": "We'll be in touch soon.",
    "home.contact.error": "Error sending",
    "home.contact.errorDesc": "Please try again later.",
    
    // Teachers page
    "teachers.hero.title": "Teach with Insight.\nLead with Care.",
    "teachers.hero.subtitle": "Psychology-based tools for dance educators who want confident, connected, and resilient students.",
    "teachers.hero.quote": "\"Your teaching holds quiet power. Let's make it intentional.\"",
    
    "teachers.intro.text1": "These resources are designed for the teacher who …sees dance as more than motion and performance.",
    "teachers.intro.text2": "You understand that each class is a chance to guide growth - to awaken confidence, restore presence, and stir something deeper in your students.",
    "teachers.intro.for": "These tools are for the teacher who wants to:",
    "teachers.intro.item1": "Use movement as a path toward wholeness and joy",
    "teachers.intro.item2": "Plan with calm intention, not pressure",
    "teachers.intro.item3": "Encourage self-trust through everyday practice",
    "teachers.intro.item4": "Weave psychological insight into technical work",
    "teachers.intro.item5": "Bring research-based support into real studio life",
    
    "teachers.book.title": "The Mindful Dance Teacher - Book",
    "teachers.book.text": "The Mindful Dance Teacher offers psychology-based tools to help you grow confident, focused, and emotionally resilient dancers. Grounded in research and real classroom practice, this guide supports educators in unlocking student potential with clarity, care, and lasting influence.",
    "teachers.book.feature1": "Psychology-backed chapters on focus, confidence, mindset, and motivation",
    "teachers.book.feature2": "Teacher reflections and real-world examples",
    "teachers.book.feature3": "Practical tools you can apply in your next class immediately",
    "teachers.book.feature4": "Includes planning templates, cheat sheets, and mindful activity ideas",
    "teachers.book.feature5": "Available in print and PDF formats",
    "teachers.book.cta": "Learn more about the book",
    "teachers.book.explore": "Explore other resources",
    
    "teachers.tools.title": "Practical Teaching Tools",
    "teachers.tools.text": "A growing collection of psychology-based resources to support clear, structured, meaningful teaching:",
    "teachers.tools.item1": "class planners and structured lesson templates",
    "teachers.tools.item2": "reflection prompts",
    "teachers.tools.item3": "student observation and progress pages",
    "teachers.tools.item4": "interactive posters for confidence, focus, and group cohesion",
    "teachers.tools.item5": "short research-backed exercises for emotional and mental well-being",
    "teachers.tools.subtext": "Tools created to actively help you bring intention, emotional understanding, and steady clarity into your classes.",
    "teachers.tools.cta": "Explore the tools",
    
    "teachers.journal.title": "The Journal",
    "teachers.journal.text": "Short, thoughtful reflections on the psychological side of teaching dance - written for dance teachers who value depth, awareness, and meaningful work in the studio, and who appreciate having a place where these themes are shared and explored.",
    "teachers.journal.topics": "Insights on focus, confidence, motivation, emotional attunement, group energy, and the inner world of dancers.",
    "teachers.journal.style": "Grounded. Practical. Human.",
    "teachers.journal.cta": "Visit the Journal",
    
    "teachers.why.title": "Why I Created These Tools",
    "teachers.why.text1": "Over the years, I've seen how dance quietly shapes confidence, focus, and inner strength - and how much is lost when teaching lacks care or awareness.",
    "teachers.why.text2": "That's when I realized: Dance is more powerful than we often recognize. It connects body, mind, and something deeper - identity, meaning, and connection.",
    "teachers.why.text3": "This book and resources began with a question I couldn't ignore: What helps a dancer become more whole, resilient, and alive?",
    "teachers.why.text4": "And just as importantly: What helps me, as a teacher, guide that process with more intention and care?",
    "teachers.why.text5": "The Mindful Dance Teacher is my response - a toolkit of reflections and practices to support growth, awareness, and purpose in the classroom.",
    "teachers.why.quote": "\"Insightful teaching turns motion into magic.\"",
    "teachers.why.bookCta": "Learn more about the book",
    "teachers.why.resourcesCta": "Explore the Resources",
    "teachers.why.blogCta": "Visit the journal",
    "teachers.why.freeCta": "Download the free teaching guide",
    
    "teachers.resources.title": "Teaching Resources",
    "teachers.resources.subtitle": "Thoughtfully designed tools to nurture mindful, transformative teaching.",
    "teachers.addToCart": "Add to Cart",
    "teachers.getFree": "Get Free",
    
    // Women page
    "women.hero.title": "Dance Me Alive.",
    "women.hero.subtitle": "Movement for Women",
    "women.hero.tagline": "Technique, expression, identity. A space to dance your story into strength and light.",
    "women.hero.quote": "Dance is the song of the body.",
    
    "women.intro.text1": "These classes bring together the best of Jazz, Contemporary, Ballet foundations, and soft Latin flow — a mix that helps women move with clarity, grace, and emotional depth.",
    "women.intro.text2": "Every session begins with a focused physical warm-up to strengthen posture, awaken technique, and build real dance skills. From there, we shape choreography that tells a story — often your story. Through movement, we explore identity, emotions, and the quiet strength women carry.",
    "women.intro.text3": "At times, you'll meet simple tools from dance psychology that support release, grounding, and emotional balance. They appear gently and naturally within the class, always serving one purpose: to help your movement become more honest, free, and connected.",
    "women.intro.text4": "The atmosphere is warm, focused, and expressive — a place where women can grow artistically, breathe deeper, and return to themselves through movement.",
    
    "women.experience.title": "What You'll Experience",
    "women.experience.item1": "A blend of Jazz, Contemporary, Ballet technique and gentle Latin influence",
    "women.experience.item2": "Technical training that improves posture, musicality, and coordination",
    "women.experience.item3": "Choreography that allows you to express your own story and emotions",
    "women.experience.item4": "Supportive tools from dance psychology for balance and release",
    "women.experience.item5": "A warm environment that values authenticity over perfection",
    "women.experience.item6": "Strength, grace, and a renewed sense of feminine identity through movement",
    
    "women.forWhom.title": "Who This Program Is For",
    "women.forWhom.intro": "For women who want both beauty and substance in dance.",
    "women.forWhom.text1": "For those who enjoy working on technique, movement quality, and grace — and who also seek a space to express emotion, tell stories through choreography, and explore their creativity.",
    "women.forWhom.text2": "This class is for women who see dance as more than a workout — it is a way to grow physically, emotionally, and artistically.",
    "women.forWhom.ageTitle": "Age is no limitation.",
    "women.forWhom.text3": "The group welcomes young women, mothers, and grandmothers alike — anyone who values depth in movement and is ready to participate with presence. Each woman brings her own experience, and that diversity adds richness to the class.",
    
    "women.cta.title": "Step into the studio. Dance your story. Feel yourself come back to life.",
    "women.cta.text": "Stories danced by our women - choreography videos & small glimpses from class.",
    "women.quote": "\"Lord my God, you turned my wailing into dancing; you removed my sackcloth and clothed me with joy.\" (Ps. 30:11)",
    "women.quote.text": "\"Lord my God, you turned my wailing into dancing; you removed my sackcloth and clothed me with joy.\"",
    "women.quote.source": "Psalm 30:11",
    
    "women.join.title": "Join the Class",
    "women.join.intro": "The next group opens soon.",
    "women.join.text": "If you feel drawn to dance, to move with intention, and to rediscover the strength of your own story, you can already save your spot.",
    "women.join.location": "Location: Ģertrūdes street 8",
    "women.join.duration": "Class length: 60 minutes",
    "women.join.price": "Price: €50 / month (4 classes) or €15 for a single class",
    "women.join.language": "Language: Primarily Latvian, with English used whenever helpful",
    "women.join.limited": "Spaces are limited so the group can stay personal and focused. Add your name to the early list, and you'll receive the first invitation as soon as registration opens.",
    "women.join.cta": "Join the waiting list",
    "women.join.noPayment": "(no payment needed yet)",
    
    "women.private.title": "Private Lessons",
    "women.private.text": "If you prefer individual attention in technique, expression, or choreography, you can book a private session.",
    "women.private.subtext": "A focused, personal space to explore your movement and grow at your pace.",
    "women.private.price": "Private class: €40 / 60 min",
    "women.private.format": "Format: In-person or online",
    "women.private.cta": "Book a private session",
    
    "women.friends.title": "Dance with Your Friends",
    "women.friends.text": "You can also invite your own small group of women — a birthday, a gathering, or simply a shared wish to move together weekly.",
    "women.friends.subtext": "Together we create a session that fits your atmosphere and goals — expressive, grounded, joyful, or technically focused.",
    "women.friends.group": "Group size: 4–10 women",
    "women.friends.price": "Price: €60–100 per class (per group)",
    "women.friends.format": "Format: In-person or online",
    "women.friends.duration": "Length: 60 minutes",
    "women.friends.cta": "Request a group class",
    
    "women.videos.title": "Videos",
    
    // Couples page
    "couples.hero.title": "In the rhythm we meet.",
    "couples.hero.subtitle": "Dance for Couples",
    "couples.hero.tagline": "Where partnerships blossom.",
    
    "couples.intro.text1": "Couple dancing is more than learning steps. It is a shared practice of listening, leading, following, and finding rhythm together - the same skills that strengthen relationships in everyday life.",
    "couples.intro.text2": "At Happy Dance Studio, we work with some of the most beautiful partner dance styles - the graceful flow of Waltz, the passion and softness of Rumba, the playful precision of Cha-Cha-Cha, the pulsing energy of Samba, the lively rhythm of Jive, the freedom and light-heartedness of Lindy Hop, and the expressive quality of Jazz dance.",
    "couples.intro.text3": "Each couple can choose the style that fits them best - a classic ballroom dance, vibrant Latin rhythms, the dynamic feel of jazz, or simple practical steps and partner exercises that help you move comfortably at celebrations and in everyday moments. You'll learn to move as a team, breathe together, and enjoy the process.",
    "couples.intro.text4": "Whether you're beginners or experienced dancers, the atmosphere is warm, encouraging, and built for teamwork - from simple shared movement to more polished, performance-ready pieces.",
    
    "couples.learn.title": "What You'll Learn Together",
    "couples.learn.item1": "Leading & following in a way that increases understanding",
    "couples.learn.item2": "Shared rhythm and coordinated movement",
    "couples.learn.item3": "Emotional attunement through simple partner exercises",
    "couples.learn.item4": "How to listen to your partner through movement",
    "couples.learn.item5": "Movement that builds trust, lightness, and closeness",
    "couples.learn.item6": "Elegant choreography inspired by ballroom, social dance, jazz, and simple improvisation",
    
    "couples.forWhom.title": "Who This Is For",
    "couples.forWhom.text": "Couples who want to dance together - to strengthen connection, refine their dancing, and learn choreography that feels natural and confident.",
    
    "couples.styles.title": "Which dance style suits us?",
    "couples.styles.intro": "There is no single path.",
    "couples.styles.rumba": "Some couples feel drawn to the quiet and romantic flow of Rumba,",
    "couples.styles.waltz": "others to the graceful rotation of Waltz,",
    "couples.styles.lindy": "others to the playful ease of Lindy Hop.",
    "couples.styles.text1": "Many begin with simple guided movement, letting presence develop naturally before any steps appear.",
    "couples.styles.text2": "The essence is not performance alone. It is attunement - a shared rhythm that gradually strengthens closeness, peace, and partnership.",
    
    "couples.booking.title": "Join the Class",
    "couples.booking.subtitle": "Format: In-person or online",
    "couples.booking.location": "Location: Ģertrūdes iela 8",
    "couples.booking.language": "Language: Latvian or English",
    "couples.booking.arrange": "We agree on a time that suits both of you.",
    "couples.booking.privatePrice": "Private Couple Lesson: €50 / 60 min",
    "couples.booking.packages": "Class Packages (paid in advance):",
    "couples.booking.package4": "4 private classes: €180",
    "couples.booking.package8": "8 private classes: €320",
    "couples.booking.packageNote": "(Ideal for couples who want steady progress or choreographed dance preparation.)",
    "couples.booking.noSlots": "No available sessions at this time.",
    "couples.booking.checkBack": "Please check back later or contact us to arrange a private session.",
    "couples.booking.noTimes": "No available times on this date",
    "couples.booking.selectDate": "Select a date to see available times",
    "couples.booking.complete": "Complete Your Booking",
    "couples.booking.yourName": "Your Name",
    "couples.booking.email": "Email",
    "couples.booking.proceed": "Proceed to Payment",
    "couples.booking.processing": "Processing...",
    "couples.booking.redirect": "You will be redirected to our secure payment page",
    "couples.booking.min": "min",
    "couples.booking.failed": "Booking failed",
    "couples.booking.tryAgain": "Please try again",
    "couples.booking.cta": "Book a private session",
    
    "couples.blog.title": "Why Dance Strengthens Relationships",
    "couples.blog.intro": "Curious to go deeper?",
    "couples.blog.text": "Here is one of my articles on how movement supports connection, trust, and emotional attunement between partners:",
    "couples.blog.cta": "Read the blog post: \"In the rhythm we find each other\"",
    
    "couples.video.title": "Video Gallery for Inspiration",
    "couples.video.rumba": "Couple Rumba — slow, flowing, close connection",
    "couples.video.waltz": "Waltz — rotation, warmth, teamwork",
    "couples.video.exercises": "Simple guided movement for communication",
    
    "couples.wedding.title": "Wedding Dance",
    "couples.wedding.subtitle": "Your First Dance",
    "couples.wedding.tagline": "Dance with confidence, connect with ease.",
    "couples.wedding.text1": "Your first dance as husband and wife is more than a tradition - it is a moment you shape together.",
    "couples.wedding.text2": "It can be calm and intimate, expressive and joyful, or beautifully impressive for your guests. What matters most is that it reflects you.",
    "couples.wedding.text3": "And often, the real beauty lies in the preparation. During the lessons, you learn to move as a team, understand each other through movement, and build a choreography that feels natural, confident, and meaningful.",
    "couples.wedding.text4": "Many couples say that this time together - the laughter, the learning, the small breakthroughs - becomes one of the most memorable parts of their wedding journey.",
    
    "couples.wedding.create.title": "What We Create Together",
    "couples.wedding.create.item1": "A first dance that suits your style, comfort level, and personality",
    "couples.wedding.create.item2": "Choreography that feels elegant and achievable",
    "couples.wedding.create.item3": "Movement that builds connection, flow, and teamwork",
    "couples.wedding.create.item4": "Confidence on the dance floor, even for complete beginners",
    "couples.wedding.create.item5": "A dance you'll remember with joy long after the wedding day",
    
    "couples.wedding.why.title": "Why Couples Love This Process",
    "couples.wedding.why.text1": "Couples often begin with some nervousness - especially men who worry they will \"step wrong\" or feel awkward. This is completely normal, and the lessons are designed to feel safe, clear, and encouraging right from the start.",
    "couples.wedding.why.text2": "You learn simple principles that make dancing together feel natural, not stressful. Step by step, you discover an ease that surprises many couples - \"Oh, we can actually do this. And it feels good.\"",
    "couples.wedding.why.text3": "The preparation becomes more than just practicing a routine - it becomes a shared ritual that grows connection, trust, and confidence long before the big day.",
    
    "couples.wedding.how.title": "How It Works",
    "couples.wedding.how.text1": "Wedding dances are created during private couple lessons. We choose your music, style, atmosphere, and complexity level together.",
    "couples.wedding.how.location": "Location: Ģertrūdes iela 8",
    "couples.wedding.how.price": "Private Couple Lesson: €50 / 60 min",
    "couples.wedding.how.packages": "Class Packages (paid in advance):",
    "couples.wedding.how.package4": "4 private lessons: €180",
    "couples.wedding.how.package8": "8 private lessons: €320",
    "couples.wedding.how.packageNote": "(Great for couples who want steady progress or a choreographed dance.)",
    "couples.wedding.how.sessions": "Most couples prepare their dance in 4 to 8 sessions, depending on the song and choreography.",
    "couples.wedding.how.continue": "Many continue even longer simply because they enjoy dancing together and feel the progress.",
    "couples.wedding.how.language": "Lessons are available in Latvian or English, in person or partly online.",
    
    "couples.wedding.start.title": "Begin Your Dance Together",
    "couples.wedding.start.cta": "Book your private wedding dance lesson",
    "couples.wedding.start.email": "Ask your question by email",
    
    "couples.wedding.article.title": "Why Dance Strengthens Relationships",
    "couples.wedding.article.subtitle": "Want to understand more deeply?",
    "couples.wedding.article.text": "Here is one of my articles about how movement fosters connection, trust, and emotional attunement between partners:",
    "couples.wedding.article.link": "Read the article: \"In Rhythm We Meet\"",
    
    "couples.wedding.video.title": "Video Gallery for Inspiration",
    "couples.wedding.video.rumba": "Rumba for couples — slow, flowing, close connection",
    "couples.wedding.video.waltz": "Waltz — rotation, warmth, teamwork",
    "couples.wedding.video.exercises": "Guided partner exercises — simple drills to improve communication",
    
    // Booking success
    "bookingSuccess.title": "Booking Confirmed!",
    "bookingSuccess.subtitle": "Thank you for your booking. We look forward to seeing you.",
    "bookingSuccess.details": "Details have been sent to your email.",
    "bookingSuccess.home": "Return Home",
    
    // Shop success
    "shopSuccess.title": "Purchase Successful!",
    "shopSuccess.subtitle": "Thank you for your purchase. Your products will be sent to your email.",
    "shopSuccess.home": "Return Home",
    
    // Cart
    "cart.title": "Cart",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.remove": "Remove",
    "cart.enterEmail": "Enter email to continue",
    "cart.emailPlaceholder": "you@example.com",
    "cart.proceedPayment": "Proceed to Payment",
    
    // Admin
    "admin.title": "Time Slot Management",
    "admin.addSlot": "Add Time Slot",
    "admin.date": "Date",
    "admin.time": "Time",
    "admin.duration": "Duration (minutes)",
    "admin.price": "Price (EUR)",
    "admin.capacity": "Capacity",
    "admin.add": "Add",
    "admin.currentSlots": "Current Time Slots",
    "admin.noSlots": "No time slots added yet.",
    "admin.booked": "booked",
    "admin.delete": "Delete",
    
    // Footer
    "footer.rights": "All rights reserved",
    "footer.quickLinks": "Quick Links",
    "footer.followUs": "Follow Us",
    
    // Common
    "common.loading": "Loading...",
    "common.free": "Free",
    
    // Inquiry Form
    "form.title": "Get in Touch",
    "form.subtitle": "Send us a message and we'll get back to you shortly.",
    "form.name": "Name",
    "form.namePlaceholder": "Your name",
    "form.email": "Email",
    "form.message": "Message",
    "form.messagePlaceholder": "How can we help you?",
    "form.sending": "Sending...",
    "form.send": "Send Message",
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      return (saved as Language) || "lv";
    }
    return "lv";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
